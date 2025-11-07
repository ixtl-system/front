import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { CustomInput } from "./index";

describe("CustomInput", () => {
  it("renders an input with provided props", () => {
    render(<CustomInput placeholder="Email" name="email" />);

    const input = screen.getByPlaceholderText("Email");
    expect(input).toBeInTheDocument();
  });

  it("shows placeholder label when theme is secondary", () => {
    render(<CustomInput placeholder="Senha" name="password" theme="secondary" />);

    expect(screen.getByText("Senha")).toBeInTheDocument();
  });

  it("integrates with react-hook-form register function", () => {
    const registerMock = vi.fn().mockReturnValue({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
      name: "email",
    });

    render(<CustomInput name="email" register={registerMock} placeholder="Email" />);

    expect(registerMock).toHaveBeenCalledWith("email");
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
});
