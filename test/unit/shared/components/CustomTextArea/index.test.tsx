import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CustomTextArea } from "@/shared/components/CustomTextArea";
import { renderWithProviders } from "@/tests/test-utils";

describe("CustomTextArea", () => {
  it("renders textarea with placeholder", () => {
    renderWithProviders(<CustomTextArea placeholder="Descrição" />);

    expect(screen.getByPlaceholderText("Descrição")).toBeInTheDocument();
  });

  it("integrates with react-hook-form register", async () => {
    const register = vi.fn().mockReturnValue({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name: "description",
      ref: vi.fn(),
    });

    renderWithProviders(
      <CustomTextArea name="description" register={register} placeholder="Descrição" />
    );

    const textarea = screen.getByPlaceholderText("Descrição");
    await userEvent.type(textarea, "Conteúdo");

    expect(register).toHaveBeenCalledWith("description");
    expect((textarea as HTMLTextAreaElement).value).toContain("Conteúdo");
  });
});
