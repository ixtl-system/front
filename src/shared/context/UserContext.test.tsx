import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it, vi } from "vitest";

import { UserContext, UserContextProvider } from "./UserContext";
import { createUserProfile } from "@/tests/test-utils";

vi.mock("jwt-decode", () => ({
  jwtDecode: vi.fn(() => ({ sub: "user-1" })),
}));

describe("UserContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserContextProvider>{children}</UserContextProvider>
  );

  it("fetches user profile and updates state", async () => {
    localStorage.setItem("token", "token-123");
    globalThis.axiosApiMock.get.mockResolvedValueOnce({
      data: {
        email: "user@test.com",
        role: "USER",
        profile: createUserProfile({ name: "Fulano" }),
      },
    });

    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserProfile();
    });

    expect(result.current.userProfile.name).toBe("Fulano");
    expect(globalThis.axiosApiMock.get).toHaveBeenCalledWith("users/user-1");
  });

  it("updates user profile when record exists", async () => {
    localStorage.setItem("token", "token-123");
    globalThis.axiosApiMock.get.mockResolvedValueOnce({
      data: {
        email: "user@test.com",
        role: "USER",
        profile: createUserProfile({ name: "Fulano" }),
      },
    });

    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserProfile();
    });

    const payload = createUserProfile({ cpf: "123.456.789-01", rg: "12.345.678-9" });

    globalThis.axiosApiMock.put.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.updateUserProfile(payload);
    });

    expect(globalThis.axiosApiMock.put).toHaveBeenCalledWith("users/profiles/user-1", {
      ...payload,
      cpf: "12345678901",
      rg: "123456789",
    });
    expect(globalThis.antdMessageMock.success).toHaveBeenCalledWith("ATUALIZADO!");
  });

  it("creates user profile when record is missing", async () => {
    localStorage.setItem("token", "token-123");
    globalThis.axiosApiMock.get.mockResolvedValueOnce({
      data: {
        email: "user@test.com",
        role: "USER",
        profile: { name: "", cpf: "", rg: "" },
      },
    });

    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserProfile();
    });

    globalThis.axiosApiMock.post.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.updateUserProfile(createUserProfile());
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("users/profiles", expect.any(Object));
  });
});
