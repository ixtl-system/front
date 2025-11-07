import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const TopbarMock = vi.fn(() => <div data-testid="topbar" />);
const SidebarMock = vi.fn(() => <div data-testid="sidebar" />);

vi.mock("../../Topbar", () => ({
  Topbar: () => TopbarMock(),
}));

vi.mock("../../Sidebar", () => ({
  Sidebar: () => SidebarMock(),
}));

// eslint-disable-next-line import/first
import { PrivateLayout } from "./index";

describe("PrivateLayout", () => {
  beforeEach(() => {
    TopbarMock.mockClear();
    SidebarMock.mockClear();
  });

  it("renders its layout shell and children", () => {
    renderWithProviders(
      <PrivateLayout>
        <div>Conteúdo interno</div>
      </PrivateLayout>,
    );

    expect(TopbarMock).toHaveBeenCalled();
    expect(SidebarMock).toHaveBeenCalled();
    expect(screen.getByText("Conteúdo interno")).toBeInTheDocument();
  });
});
