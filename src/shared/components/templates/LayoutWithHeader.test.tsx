import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LayoutWithHeader } from "./LayoutWithHeader";
import { renderWithProviders } from "@/tests/test-utils";

describe("LayoutWithHeader", () => {
  it("renders header and children", () => {
    renderWithProviders(
      <LayoutWithHeader>
        <div>Conteúdo principal</div>
      </LayoutWithHeader>
    );

    expect(screen.getByText("Instituto Xamânico")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument();
  });
});
