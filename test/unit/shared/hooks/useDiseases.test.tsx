import type { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DiseasesContext } from "@/shared/context/DiseasesContext";
import { useDiseases } from "@/shared/hooks/useDiseases";

describe("useDiseases", () => {
  it("returns the provided context value", () => {
    const mockValue = {
      allDiseases: [{ id: "1", name: "Asma", medicalSpeciality: "Clínico", createdAt: "2023-01-01" }],
      userDiseases: [{ id: "1", diseaseId: "1", name: "Asma", medicalSpeciality: "Clínico", createdAt: "2023-01-01" }],
      userMedications: [
        {
          id: "2",
          name: "Remédio",
          medicationId: "2",
          userDiseaseId: "1",
          startUsing: "NOW",
          createdAt: "2023-02-01",
          userId: "10",
          userSurgeryId: "",
        },
      ],
      userDiseasesAndMedications: [
        {
          id: "1",
          name: "Asma",
          medications: [
            {
              id: "2",
              name: "Remédio",
              medicationId: "2",
              userDiseaseId: "1",
              startUsing: "NOW",
              createdAt: "2023-02-01",
              userId: "10",
              userSurgeryId: "",
            },
          ],
        },
      ],
      medicationsList: [{ id: "2", name: "Remédio" }],
      fetchMedicationsList: vi.fn(),
      fetchAllDiseases: vi.fn(),
      fetchUserDiseases: vi.fn(),
      fetchUserMedications: vi.fn(),
      removeUserDisease: vi.fn(),
      removeUserMedication: vi.fn(),
      createUserDisease: vi.fn(),
      createUserMedication: vi.fn(),
      getUserDiseasesAndMedications: vi.fn(),
    };

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DiseasesContext.Provider value={mockValue}>{children}</DiseasesContext.Provider>
    );

    const { result } = renderHook(() => useDiseases(), { wrapper });

    expect(result.current).toBe(mockValue);
    expect(result.current.allDiseases[0].name).toBe("Asma");
    expect(result.current.fetchAllDiseases).toBe(mockValue.fetchAllDiseases);
  });
});
