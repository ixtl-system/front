import { screen } from "@testing-library/react";
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

  it("expands navigation labels when toggled", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    const toggleButton = screen.getByRole("button", { name: /expandir menu/i });
    await user.click(toggleButton);

    expect(screen.getByText("Perfil")).toBeInTheDocument();
  });

  it("logs out and navigates home", async () => {
    const logOut = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<Sidebar />, {
      providers: { auth: { LogOut: logOut } },
    });

    const toggleButton = screen.getByRole("button", { name: /expandir menu/i });
    await user.click(toggleButton);

    await user.click(screen.getByRole("button", { name: "Sair" }));

    expect(logOut).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
