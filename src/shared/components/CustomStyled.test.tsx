import { render, screen } from "@testing-library/react";

import { CustomSubtitle, CustomTitle, DefaultButton } from "./CustomStyled";

describe("CustomStyled components", () => {
  it("renders title and subtitle elements", () => {
    render(
      <div>
        <CustomTitle>Título</CustomTitle>
        <CustomSubtitle>Subtítulo</CustomSubtitle>
      </div>,
    );

    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo")).toBeInTheDocument();
  });

  it("renders the default button with its children", () => {
    render(<DefaultButton>Salvar</DefaultButton>);

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });
});
