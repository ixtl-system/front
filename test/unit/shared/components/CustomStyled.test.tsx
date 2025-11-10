import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CustomSubtitle, CustomTitle, DefaultButton } from "@/shared/components/CustomStyled";
import { renderWithProviders } from "@/tests/test-utils";

describe("CustomStyled", () => {
  it("renders styled heading and subtitle", () => {
    renderWithProviders(
      <div>
        <CustomTitle>Meu título</CustomTitle>
        <CustomSubtitle>Subtítulo</CustomSubtitle>
      </div>
    );

    expect(screen.getByText("Meu título").tagName).toBe("H2");
    expect(screen.getByText("Subtítulo").tagName).toBe("P");
  });

  it("renders default button with children", () => {
    renderWithProviders(<DefaultButton>Salvar</DefaultButton>);

    const button = screen.getByRole("button", { name: "Salvar" });
    expect(button).toBeInTheDocument();
  });
});
