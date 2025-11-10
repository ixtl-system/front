import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Sidebar } from "@/shared/components/Sidebar";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Sidebar", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("expands navigation labels on hover", () => {
    const { container } = renderWithProviders(<Sidebar />);

    const content = container.querySelector("#sidebar section");
    expect(content).toBeTruthy();

    fireEvent.mouseEnter(content as HTMLElement);

    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("logs out and navigates home", async () => {
    const logOut = vi.fn();
    renderWithProviders(<Sidebar />, {
      providers: { auth: { LogOut: logOut } },
    });

    const content = document.querySelector("#sidebar section");
    fireEvent.mouseEnter(content as HTMLElement);

    await userEvent.click(screen.getByText("Sair"));

    expect(logOut).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
