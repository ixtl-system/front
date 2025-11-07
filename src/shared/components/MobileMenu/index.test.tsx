import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MobileMenu } from ".";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("MobileMenu", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("navigates to profile and closes modal", async () => {
    const onClose = vi.fn();
    const logOut = vi.fn();

    renderWithProviders(<MobileMenu visible onClose={onClose} />, {
      providers: {
        auth: { LogOut: logOut },
      },
    });

    await userEvent.click(screen.getByText("Perfil"));

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/profile"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls logout and navigates to home", async () => {
    const onClose = vi.fn();
    const logOut = vi.fn();

    renderWithProviders(<MobileMenu visible onClose={onClose} />, {
      providers: { auth: { LogOut: logOut } },
    });

    await userEvent.click(screen.getByText("Sair"));

    expect(logOut).toHaveBeenCalled();
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
