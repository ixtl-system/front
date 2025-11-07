import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it } from "vitest";

import { SurgeryContext, SurgeryProvider } from "./SurgeryContext";

describe("SurgeryContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SurgeryProvider>{children}</SurgeryProvider>
  );

  it("fetches surgeries and updates state", async () => {
    globalThis.axiosApiMock.get.mockResolvedValueOnce({
      data: [
        {
          id: "1",
          userId: "user",
          name: "Cirurgia",
          surgeryDate: "2024-01-01",
          createdAt: "",
          updatedAt: "",
        },
      ],
    });

    const { result } = renderHook(() => useContext(SurgeryContext), { wrapper });

    await act(async () => {
      await result.current.fetchUserSurgeries();
    });

    expect(result.current.userSurgeries).toHaveLength(1);
  });

  it("creates surgery entries", async () => {
    globalThis.axiosApiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(SurgeryContext), { wrapper });

    await act(async () => {
      await result.current.createUserSurgery({ name: "Cirurgia", surgeryDate: "2024-01-01" });
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/users/surgeries", {
      name: "Cirurgia",
      surgeryDate: "2024-01-01",
    });
  });
});
