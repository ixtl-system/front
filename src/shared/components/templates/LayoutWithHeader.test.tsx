import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const headerMock = vi.fn(() => <div data-testid="header" />);

vi.mock("../header/Header", () => ({
  Header: () => headerMock(),
}));

// eslint-disable-next-line import/first
import { LayoutWithHeader } from "./LayoutWithHeader";

describe("LayoutWithHeader", () => {
  beforeEach(() => {
    headerMock.mockClear();
  });

  it("renders header component along with children", () => {
    renderWithProviders(
      <LayoutWithHeader>
        <span>Conteúdo</span>
      </LayoutWithHeader>,
    );

    expect(headerMock).toHaveBeenCalled();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });
});
