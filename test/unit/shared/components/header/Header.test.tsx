import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Header } from "@/shared/components/header/Header";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Header", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("renders navigation links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: /Eventos/i })).toHaveAttribute("href", "/events");
    expect(screen.getByRole("link", { name: /Perfil/i })).toHaveAttribute("href", "/profile");
  });

  it("calls logout and navigates home", async () => {
    const logOut = vi.fn();

    renderWithProviders(<Header />, {
      providers: { auth: { LogOut: logOut } },
    });

    await userEvent.click(screen.getByRole("button", { name: /Sair/i }));

    expect(logOut).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
