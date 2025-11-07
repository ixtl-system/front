import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "@/test-utils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// eslint-disable-next-line import/first
import { SignIn } from "./index";

describe("SignIn page", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("allows the user to login through the modal flow", async () => {
    const user = userEvent.setup();
    const signInMock = vi.fn().mockResolvedValue(undefined);

    renderWithProviders(<SignIn />, {
      providerOverrides: {
        auth: { SignIn: signInMock },
      },
    });

    await user.click(screen.getByRole("button", { name: /entrar no portal/i }));

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(signInMock).toHaveBeenCalledWith({ email: "user@example.com", password: "123456" });
    expect(navigateMock).toHaveBeenCalledWith("/events");
  });

  it("closes the authentication modal when the user clicks fechar", async () => {
    const user = userEvent.setup();

    renderWithProviders(<SignIn />);

    await user.click(screen.getByRole("button", { name: /entrar no portal/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /fechar/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
