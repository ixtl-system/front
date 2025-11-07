import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PrivateLayout } from ".";
import { renderWithProviders } from "@/tests/test-utils";

vi.mock("../../Topbar", () => ({
  Topbar: () => <div data-testid="topbar">Topbar</div>,
}));

vi.mock("../../Sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("PrivateLayout", () => {
  it("renders layout chrome and children", () => {
    renderWithProviders(
      <PrivateLayout>
        <p>Área interna</p>
      </PrivateLayout>
    );

    expect(screen.getByTestId("topbar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Área interna")).toBeInTheDocument();
  });
});
