import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
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
import { MobileMenu } from "./index";

describe("MobileMenu", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("shows navigation options when visible", () => {
    renderWithProviders(<MobileMenu visible onClose={vi.fn()} />);

    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Indisponível")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("navigates and closes the menu when an option is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithProviders(<MobileMenu visible onClose={handleClose} />);

    await user.click(screen.getByText("Eventos"));

    expect(navigateMock).toHaveBeenCalledWith("/events");
    expect(handleClose).toHaveBeenCalled();
  });

  it("logs out and redirects when selecting Sair", async () => {
    const user = userEvent.setup();
    const logOut = vi.fn();
    const handleClose = vi.fn();

    renderWithProviders(<MobileMenu visible onClose={handleClose} />, {
      providerOverrides: {
        auth: { LogOut: logOut },
      },
    });

    await user.click(screen.getByText("Sair"));

    expect(logOut).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
