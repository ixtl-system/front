import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Topbar } from ".";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../MobileMenu", () => ({
  MobileMenu: ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
    <div>
      {visible ? <div data-testid="mobile-menu" onClick={onClose}>menu aberto</div> : null}
    </div>
  ),
}));

describe("Topbar", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("navigates to home when logo is clicked", async () => {
    renderWithProviders(<Topbar />);

    await userEvent.click(screen.getByAltText("logo"));
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("toggles mobile menu visibility", async () => {
    renderWithProviders(<Topbar />);

    const toggle = screen.getByRole("button");

    await userEvent.click(toggle);
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("mobile-menu"));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });
});
