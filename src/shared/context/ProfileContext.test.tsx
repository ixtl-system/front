import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";

import { ProfileContext, ProfileContextProvider } from "./Profile";

describe("ProfileContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ProfileContextProvider>{children}</ProfileContextProvider>
  );

  beforeEach(() => {
    __apiMock.get.mockReset();
    __apiMock.post.mockReset();
  });

  it("updates the drug history via API", async () => {
    __apiMock.post.mockResolvedValueOnce({});

    const { result } = renderHook(() => useContext(ProfileContext), { wrapper });

    const payload = [
      {
        id: "1",
        userId: "user",
        drugId: "drug-1",
        drugName: "Ayahuasca",
        frequency: "ALWAYS" as const,
      },
    ];

    await act(async () => {
      await result.current.updateDrugHistory(payload as any);
    });

    expect(__apiMock.post).toHaveBeenCalledWith("/medical-history/drugs", payload);
  });

  it("fetches drugs and sorts them alphabetically", async () => {
    __apiMock.get.mockResolvedValueOnce({
      data: [
        { id: "2", drugName: "Canabis", userId: "user", drugId: "drug-2", frequency: "SOMETIMES" },
        { id: "1", drugName: "Ayahuasca", userId: "user", drugId: "drug-1", frequency: "ALWAYS" },
      ],
    });

    const { result } = renderHook(() => useContext(ProfileContext), { wrapper });

    await act(async () => {
      await result.current.fetchDrugs();
    });

    expect(result.current.drugs.map(drug => drug.drugName)).toEqual(["Ayahuasca", "Canabis"]);
  });
});
