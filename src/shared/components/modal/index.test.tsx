import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from ".";
import { renderWithProviders } from "@/tests/test-utils";

describe("Modal", () => {
  it("does not render when closed", () => {
    const { container } = renderWithProviders(
      <Modal isOpen={false} onClose={vi.fn()} title="Título" message="Mensagem" />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders content and triggers onClose", async () => {
    const onClose = vi.fn();
    renderWithProviders(
      <Modal isOpen onClose={onClose} title="Título" message="Mensagem" />
    );

    expect(screen.getByText("Título")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
