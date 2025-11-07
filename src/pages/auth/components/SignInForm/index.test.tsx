import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SignInForm } from ".";
import { renderWithProviders } from "@/tests/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("SignInForm", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("submits credentials and navigates to events", async () => {
    const signIn = vi.fn().mockResolvedValue(undefined);

    renderWithProviders(<SignInForm onNavigate={vi.fn()} />, {
      providers: { auth: { SignIn: signIn } },
    });

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@test.com");
    await userEvent.type(screen.getByPlaceholderText("Senha"), "123456");

    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => expect(signIn).toHaveBeenCalledWith({ email: "user@test.com", password: "123456" }));
    expect(navigateMock).toHaveBeenCalledWith("/events");
  });

  it("shows validation errors when fields are empty", async () => {
    renderWithProviders(<SignInForm onNavigate={vi.fn()} />);

    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(await screen.findByText("E-mail é obrigatório!")).toBeInTheDocument();
    expect(screen.getByText("Informe a senha para fazer Login!")).toBeInTheDocument();
  });
});
