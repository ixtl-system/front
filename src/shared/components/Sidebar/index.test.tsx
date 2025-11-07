import userEvent from "@testing-library/user-event";
import { fireEvent, screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// eslint-disable-next-line import/first
import { Sidebar } from "./index";

describe("Sidebar", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("expands on hover to reveal menu labels", () => {
    const { container } = renderWithProviders(<Sidebar />);

    const sidebarContent = container.querySelector("section");
    expect(sidebarContent).toBeInTheDocument();

    if (!sidebarContent) {
      throw new Error("Sidebar content not found");
    }

    fireEvent.mouseEnter(sidebarContent);

    expect(screen.getByText("Perfil")).toBeVisible();
    expect(screen.getByText("Eventos")).toBeVisible();
  });

  it("logs out and navigates when Sair is clicked", async () => {
    const user = userEvent.setup();
    const logOut = vi.fn();

    renderWithProviders(<Sidebar />, {
      providerOverrides: {
        auth: { LogOut: logOut },
      },
    });

    await user.click(screen.getByText("Sair"));

    expect(logOut).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
