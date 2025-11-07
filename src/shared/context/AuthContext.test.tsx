import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";

import { AuthContext, AuthContextProvider } from "./AuthContext";

describe("AuthContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthContextProvider>{children}</AuthContextProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  it("signs in and stores the token", async () => {
    const token = "token-123";
    __apiMock.post.mockResolvedValueOnce({ data: { access_token: token } });

    const { result } = renderHook(() => useContext(AuthContext), { wrapper });

    await act(async () => {
      await result.current.SignIn({ email: "user@example.com", password: "secret" });
    });

    expect(__apiMock.post).toHaveBeenCalledWith("/sessions", {
      email: "user@example.com",
      password: "secret",
    });
    expect(localStorage.getItem("token")).toBe(token);
    expect(result.current.isLoggedIn).toBe(true);
    expect(__apiMock.defaults.headers.common["Authorization"]).toBe(`Bearer ${token}`);
  });

  it("handles sign in errors with feedback", async () => {
    __apiMock.post.mockRejectedValueOnce({ response: { data: { message: "Credenciais inválidas" } } });

    const { result } = renderHook(() => useContext(AuthContext), { wrapper });

    await act(async () => {
      await result.current.SignIn({ email: "user@example.com", password: "wrong" });
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(__messageMock.error).toHaveBeenCalledWith(
      "Credenciais inválidas" || "Houve uma falha! Tente novamente ou contate o administrador!",
    );
  });

  it("clears authentication data on logout", async () => {
    __apiMock.post.mockResolvedValueOnce({ data: { access_token: "token" } });

    const { result } = renderHook(() => useContext(AuthContext), { wrapper });

    await act(async () => {
      await result.current.SignIn({ email: "user@example.com", password: "secret" });
    });

    await act(async () => {
      result.current.LogOut();
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it("shows success feedback after sign up", async () => {
    __apiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(AuthContext), { wrapper });

    await act(async () => {
      await result.current.SignUp({ email: "user@example.com", password: "123456", confirmPassword: "123456" });
    });

    expect(__apiMock.post).toHaveBeenCalledWith("/users", {
      email: "user@example.com",
      password: "123456",
      confirmPassword: "123456",
    });
    expect(__messageMock.success).toHaveBeenCalledWith("Conta criada com sucesso!");
  });
});
