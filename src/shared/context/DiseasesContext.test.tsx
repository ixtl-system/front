import { act, renderHook } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it } from "vitest";

import { DiseasesContext, DiseasesProvider } from "./DiseasesContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DiseasesProvider>{children}</DiseasesProvider>
);

describe("DiseasesContext", () => {
  it("fetches diseases lists", async () => {
    globalThis.axiosApiMock.get
      .mockResolvedValueOnce({ data: [{ id: "d1", name: "Diabetes", medicalSpeciality: "Endócrino", createdAt: "" }] })
      .mockResolvedValueOnce({ data: [{ id: "m1", name: "Remédio" }] });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    await act(async () => {
      await result.current.fetchAllDiseases();
      await result.current.fetchMedicationsList();
    });

    expect(result.current.allDiseases[0].name).toBe("Diabetes");
    expect(result.current.medicationsList[0].name).toBe("Remédio");
  });

  it("creates a disease and refreshes list", async () => {
    globalThis.axiosApiMock.post.mockResolvedValueOnce({});
    globalThis.axiosApiMock.get.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    await act(async () => {
      await result.current.createUserDisease("d1", "Diabetes");
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/medical-history/disease", {
      diseaseId: "d1",
      diseaseName: "Diabetes",
    });
    expect(globalThis.antdMessageMock.success).toHaveBeenCalledWith("Doença registrada com sucesso!");
  });

  it("creates medication entry", async () => {
    globalThis.axiosApiMock.post.mockResolvedValueOnce({});
    globalThis.axiosApiMock.get.mockResolvedValueOnce({ data: [] });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    await act(async () => {
      await result.current.createUserMedication({ medicationId: "1", diseaseId: "d1", name: "Chá" });
    });

    expect(globalThis.axiosApiMock.post).toHaveBeenCalledWith("/medical-history/medications", {
      medicationId: "1",
      diseaseId: "d1",
      name: "Chá",
      startUsing: "SIX_MONTH",
      isDaimeHelp: false,
    });
    expect(globalThis.antdMessageMock.success).toHaveBeenCalledWith("Medicação registrada com sucesso!");
  });

  it("removes diseases and medications", async () => {
    globalThis.axiosApiMock.delete.mockResolvedValue({});
    globalThis.axiosApiMock.get.mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useContext(DiseasesContext), { wrapper });

    let response;
    await act(async () => {
      response = await result.current.removeUserDisease("id-1");
    });
    expect(response.success).toBe(true);

    await act(async () => {
      response = await result.current.removeUserMedication("id-2");
    });
    expect(response.success).toBe(true);
  });
});
