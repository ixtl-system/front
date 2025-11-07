import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";

import { SurgeryContext, SurgeryProvider } from "./SurgeryContext";

describe("SurgeryContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <SurgeryProvider>{children}</SurgeryProvider>;

  beforeEach(() => {
    __apiMock.get.mockReset();
    __apiMock.post.mockReset();
    __messageMock.error.mockReset();
  });

  it("fetches user surgeries and updates state", async () => {
    const surgeries = [
      {
        id: "s1",
        userId: "user",
        name: "Cirurgia",
        surgeryDate: "2024-01-01",
        medicine: null,
        observation: null,
        createdAt: "",
        updatedAt: "",
      },
    ];
    __apiMock.get.mockResolvedValueOnce({ data: surgeries });

    const { result } = renderHook(() => useContext(SurgeryContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserSurgeries();
    });

    expect(result.current.userSurgeries).toEqual(surgeries);
    expect(__apiMock.get).toHaveBeenCalledWith("/medical-history/surgeries");
  });

  it("creates a user surgery", async () => {
    __apiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(SurgeryContext), { wrapper });

    await act(async () => {
      await result.current.createUserSurgery({ name: "Cirurgia", surgeryDate: "2024-01-01" });
    });

    expect(__apiMock.post).toHaveBeenCalledWith("/users/surgeries", { name: "Cirurgia", surgeryDate: "2024-01-01" });
  });

  it("shows feedback when fetching surgeries fails", async () => {
    __apiMock.get.mockRejectedValueOnce(new Error("erro"));

    const { result } = renderHook(() => useContext(SurgeryContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserSurgeries();
    });

    expect(__messageMock.error).toHaveBeenCalledWith("Erro ao buscar lista de cirurgias");
  });
});
