import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it } from "vitest";

import { AuthContext, AuthContextProvider } from "@/shared/context/AuthContext";

describe("AuthContext", () => {
  it("initializes from stored token", async () => {
    localStorage.setItem("token", "token-123");

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
    });

    await act(async () => {});

    expect(result.current.isLoggedIn).toBe(true);
    expect(globalThis.axiosApiMock.defaults.headers.common["Authorization"]).toBe("Bearer token-123");
  });

  it("stores token after successful sign in", async () => {
    globalThis.axiosApiMock.post.mockResolvedValueOnce({ data: { access_token: "jwt-token" } });

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
    });

    await act(async () => {
      await result.current.SignIn({ email: "user@test.com", password: "123456" });
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/sessions", {
      email: "user@test.com",
      password: "123456",
    });
    expect(localStorage.getItem("token")).toBe("jwt-token");
    expect(result.current.isLoggedIn).toBe(true);
    expect(globalThis.axiosApiMock.defaults.headers.common["Authorization"]).toBe("Bearer jwt-token");
  });

  it("notifies error when sign in fails", async () => {
    globalThis.axiosApiMock.post.mockRejectedValueOnce({
      response: { data: { message: "Credenciais inválidas" } },
    });

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
    });

    await act(async () => {
      await result.current.SignIn({ email: "user@test.com", password: "123456" });
    });

    expect(globalThis.antdMessageMock.error).toHaveBeenCalledWith("Credenciais inválidas");
    expect(result.current.isLoggedIn).toBe(false);
  });

  it("shows feedback when sign up succeeds", async () => {
    globalThis.axiosApiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
    });

    await act(async () => {
      await result.current.SignUp({ email: "user@test.com", password: "123456", confirmPassword: "123456" });
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/users", {
      email: "user@test.com",
      password: "123456",
      confirmPassword: "123456",
    });
    expect(globalThis.antdMessageMock.success).toHaveBeenCalledWith("Conta criada com sucesso!");
  });

  it("shows error when sign up fails", async () => {
    globalThis.axiosApiMock.post.mockRejectedValueOnce(new Error("fail"));

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
    });

    await act(async () => {
      await result.current.SignUp({ email: "user@test.com", password: "123456", confirmPassword: "123456" });
    });

    expect(globalThis.antdMessageMock.error).toHaveBeenCalledWith("Erro ao criar conta.");
  });

  it("clears token on logout", async () => {
    localStorage.setItem("token", "token-123");
    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: ({ children }) => <AuthContextProvider>{children}</AuthContextProvider>,
    });

    await act(async () => {
      await result.current.LogOut();
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });
});
