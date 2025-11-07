import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Modal } from "./index";

describe("Modal", () => {
  it("does not render when closed", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={vi.fn()} title="Título" message="Mensagem" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders content when open", () => {
    render(<Modal isOpen onClose={vi.fn()} title="Aviso" message="Tudo certo" />);

    expect(screen.getByText("Aviso")).toBeInTheDocument();
    expect(screen.getByText("Tudo certo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });
});
