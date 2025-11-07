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
import { Header } from "./Header";

describe("Header", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("renders navigation links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("logs out the user and redirects to home", async () => {
    const user = userEvent.setup();
    const logOut = vi.fn();

    renderWithProviders(<Header />, {
      providerOverrides: {
        auth: { LogOut: logOut },
      },
    });

    await user.click(screen.getByText("Sair"));

    expect(logOut).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
