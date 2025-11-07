import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CustomInput } from "@/shared/components/CustomInput";
import { renderWithProviders } from "@/tests/test-utils";

describe("CustomInput", () => {
  it("renders an input with provided placeholder", () => {
    renderWithProviders(<CustomInput name="email" placeholder="Email" />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("renders helper label when theme is secondary", () => {
    renderWithProviders(
      <CustomInput name="name" placeholder="Nome" theme="secondary" />
    );

    expect(screen.getByText("Nome")).toBeInTheDocument();
  });

  it("registers field when register prop is provided", async () => {
    const register = vi.fn().mockReturnValue({
      onChange: vi.fn(),
      onBlur: vi.fn(),
      name: "password",
      ref: vi.fn(),
    });

    renderWithProviders(
      <CustomInput
        name="password"
        placeholder="Senha"
        type="password"
        register={register}
      />
    );

    const input = screen.getByPlaceholderText("Senha");
    await userEvent.type(input, "123");

    expect(register).toHaveBeenCalledWith("password");
    expect((input as HTMLInputElement).type).toBe("password");
  });
});
