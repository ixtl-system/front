import { describe, expect, it } from "vitest";

import { findDiseaseName, findMedicationName } from "@/shared/utils/findDiseaseName";

describe("lookup helpers", () => {
  const diseases = [
    { id: "1", name: "Diabetes", medicalSpeciality: "Endócrino", createdAt: "" },
  ];
  const medications = [
    { id: "10", name: "Remédio" },
  ];

  it("returns matching disease name", () => {
    expect(findDiseaseName("1", diseases)).toBe("Diabetes");
    expect(findDiseaseName("2", diseases)).toBe("");
  });

  it("returns matching medication name", () => {
    expect(findMedicationName("10", medications)).toBe("Remédio");
    expect(findMedicationName("11", medications)).toBe("");
  });
});
