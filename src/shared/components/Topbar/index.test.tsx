import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const navigateMock = vi.fn();
const mobileMenuMock = vi.fn(() => null);

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../MobileMenu", () => ({
  MobileMenu: (props: any) => mobileMenuMock(props),
}));

// eslint-disable-next-line import/first
import { Topbar } from "./index";

describe("Topbar", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    mobileMenuMock.mockClear();
  });

  it("toggles the mobile menu visibility when the button is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Topbar />);

    const toggleButton = screen.getByRole("button");
    await user.click(toggleButton);

    expect(mobileMenuMock).toHaveBeenLastCalledWith(expect.objectContaining({ visible: true }));

    // Trigger onClose to ensure the handler toggles back
    const lastCall = mobileMenuMock.mock.calls.at(-1);
    const props = lastCall?.[0];
    expect(typeof props.onClose).toBe("function");

    props.onClose();
    expect(mobileMenuMock).toHaveBeenLastCalledWith(expect.objectContaining({ visible: false }));
  });

  it("navigates to home when the logo is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Topbar />);

    await user.click(screen.getByAltText("logo"));

    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
