import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { vi } from "vitest";

const jwtDecodeMock = vi.fn(() => ({ sub: "user-id" }));

vi.mock("jwt-decode", () => ({
  jwtDecode: (token: string) => jwtDecodeMock(token),
}));

import { UserContext, UserContextProvider } from "./UserContext";

describe("UserContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserContextProvider>{children}</UserContextProvider>
  );

  beforeEach(() => {
    localStorage.setItem("token", "token-value");
    __apiMock.get.mockReset();
    __apiMock.post.mockReset();
    __apiMock.put.mockReset();
    __messageMock.success.mockReset();
  });

  it("fetches the user profile and updates state", async () => {
    __apiMock.get.mockResolvedValueOnce({
      data: {
        email: "user@example.com",
        profile: {
          name: "Usuário",
          gender: "OTHER",
          rg: "12.345.678-9",
          cpf: "123.456.789-09",
          street: "Rua",
          number: "123",
          neighborhood: "Bairro",
          city: "Cidade",
          state: "SP",
          zipCode: "01001000",
          phone: "1199999999",
          cellPhone: "11999999999",
          passport: "AB1234",
          birth: "1990-01-01",
        },
        role: "USER",
      },
    });

    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserProfile();
    });

    expect(jwtDecodeMock).toHaveBeenCalledWith("token-value");
    expect(__apiMock.get).toHaveBeenCalledWith("users/user-id");
    expect(result.current.userProfile.name).toBe("Usuário");
    expect(result.current.userProfile.role).toBe("USER");
  });

  it("updates an existing profile and normalizes identifiers", async () => {
    __apiMock.get.mockResolvedValueOnce({
      data: {
        email: "user@example.com",
        profile: {
          name: "Usuário",
          gender: "OTHER",
          rg: "12.345.678-9",
          cpf: "123.456.789-09",
          street: "Rua",
          number: "123",
          neighborhood: "Bairro",
          city: "Cidade",
          state: "SP",
          zipCode: "01001000",
          phone: "1199999999",
          cellPhone: "11999999999",
          passport: "AB1234",
          birth: "1990-01-01",
        },
        role: "USER",
      },
    });

    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserProfile();
    });

    __apiMock.put.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.updateUserProfile(result.current.userProfile);
    });

    expect(__apiMock.put).toHaveBeenCalledWith("users/profiles/user-id", expect.objectContaining({
      cpf: "12345678901",
      rg: "123456789",
    }));
    expect(__messageMock.success).toHaveBeenCalledWith("ATUALIZADO!");
  });

  it("creates a profile when the user does not have one yet", async () => {
    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    __apiMock.post.mockResolvedValueOnce({});

    const payload = {
      name: "Novo Usuário",
      email: "new@example.com",
      gender: "OTHER" as const,
      rg: "12.345.678-9",
      cpf: "123.456.789-09",
      street: "Rua",
      number: "123",
      neighborhood: "Bairro",
      city: "Cidade",
      state: "SP",
      zipCode: "01001000",
      phone: "1199999999",
      cellPhone: "11999999999",
      passport: "AB1234",
      birth: "1990-01-01",
      role: "USER" as const,
    };

    await act(async () => {
      await result.current.updateUserProfile(payload);
    });

    expect(__apiMock.post).toHaveBeenCalledWith("users/profiles", expect.objectContaining({
      cpf: "12345678901",
      rg: "123456789",
    }));
  });
});
