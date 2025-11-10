import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it } from "vitest";

import { ProfileContext, ProfileContextProvider } from "@/shared/context/Profile";

describe("ProfileContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProfileContextProvider>{children}</ProfileContextProvider>
  );

  it("fetches drugs and sorts alphabetically", async () => {
    globalThis.axiosApiMock.get.mockResolvedValueOnce({
      data: [
        { id: "2", drugName: "B-Remédio" },
        { id: "1", drugName: "a-remédio" },
      ],
    });

    const { result } = renderHook(() => useContext(ProfileContext), { wrapper });

    await act(async () => {
      await result.current.fetchDrugs();
    });

    expect(result.current.drugs.map(drug => drug.drugName)).toEqual(["a-remédio", "B-Remédio"]);
  });

  it("updates drug history", async () => {
    globalThis.axiosApiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(ProfileContext), { wrapper });

    const payload = [{ id: "1", drugName: "Chá" } as any];

    await act(async () => {
      await result.current.updateDrugHistory(payload);
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/medical-history/drugs", payload);
  });
});
