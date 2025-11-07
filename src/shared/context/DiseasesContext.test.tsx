import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";

import { DiseasesContext, DiseasesProvider } from "./DiseasesContext";

describe("DiseasesContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DiseasesProvider>{children}</DiseasesProvider>
  );

  beforeEach(() => {
    __apiMock.get.mockReset();
    __apiMock.post.mockReset();
    __apiMock.delete.mockReset();
    __messageMock.success.mockReset();
    __messageMock.error.mockReset();
  });

  it("fetches all diseases and updates state", async () => {
    const diseases = [
      { id: "1", name: "Hipertensão", medicalSpeciality: "Clínico", createdAt: "2024-01-01" },
      { id: "2", name: "Diabetes", medicalSpeciality: "Clínico", createdAt: "2024-01-02" },
    ];
    __apiMock.get.mockResolvedValueOnce({ data: diseases });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    await act(async () => {
      await result.current.fetchAllDiseases();
    });

    expect(result.current.allDiseases).toEqual(diseases);
    expect(__apiMock.get).toHaveBeenCalledWith("/diseases");
  });

  it("registers a user disease and refreshes the list", async () => {
    __apiMock.post.mockResolvedValueOnce({});
    __apiMock.get.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    await act(async () => {
      await result.current.createUserDisease("1", "Hipertensão");
    });

    expect(__apiMock.post).toHaveBeenCalledWith(
      "/medical-history/disease",
      { diseaseId: "1", diseaseName: "Hipertensão" },
    );
    expect(__apiMock.get).toHaveBeenCalledWith("/medical-history/diseases");
    expect(__messageMock.success).toHaveBeenCalledWith("Doença registrada com sucesso!");
  });

  it("combines diseases and medications data", async () => {
    const diseases = [
      {
        id: "d1",
        name: "Hipertensão",
        diseaseId: "d1",
        medicalSpeciality: "Clínico",
        createdAt: "2024-01-01",
      },
    ];
    const medications = [
      {
        id: "m1",
        name: "Medicação",
        userDiseaseId: "d1",
        startUsing: "",
        createdAt: "",
        userId: "user",
        userSurgeryId: "",
      },
    ];
    __apiMock.get
      .mockResolvedValueOnce({ data: diseases })
      .mockResolvedValueOnce({ data: medications });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    await act(async () => {
      await result.current.getUserDiseasesAndMedications();
    });

    expect(result.current.userDiseases).toEqual(diseases);
    expect(result.current.userMedications).toEqual(medications);
    expect(result.current.userDiseasesAndMedications).toEqual([
      { id: "d1", name: "Hipertensão", medications: medications },
    ]);
  });

  it("removes a user disease and refreshes combined data", async () => {
    __apiMock.delete.mockResolvedValueOnce({});
    __apiMock.get.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current.removeUserDisease("d1");
    });

    expect(response).toEqual({ success: true });
    expect(__apiMock.delete).toHaveBeenCalledWith("/medical-history/diseases/d1");
  });
});
