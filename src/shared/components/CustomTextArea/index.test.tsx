import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { CustomTextArea } from "./index";

describe("CustomTextArea", () => {
  it("renders a textarea when register is not provided", () => {
    render(<CustomTextArea placeholder="Descreva" />);

    expect(screen.getByPlaceholderText("Descreva")).toBeInTheDocument();
  });

  it("registers the textarea when register prop is available", () => {
    const registerMock = vi.fn().mockReturnValue({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
      name: "description",
    });

    render(<CustomTextArea name="description" register={registerMock} placeholder="Descreva" />);

    expect(registerMock).toHaveBeenCalledWith("description");
    expect(screen.getByPlaceholderText("Descreva")).toBeInTheDocument();
  });
});
