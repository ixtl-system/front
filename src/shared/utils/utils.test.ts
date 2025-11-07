import { describe, expect, it } from "vitest";

import cleanString from "./cleanString";
import { findDiseaseName, findMedicationName } from "./findDiseaseName";
import { formatCep } from "./formatCep";
import { formatCpf } from "./formatCpf";
import { formatPassport } from "./formatPassport";
import { formatPhoneNumber, formatResidentialPhoneNumber } from "./formatPhoneNumber";
import { formatRg } from "./formatRG";
import { validateCpf, validateEmail, validatePhone, validateResidentialPhone, validateRg } from "./validate";

describe("utility helpers", () => {
  it("cleans non numeric characters", () => {
    expect(cleanString("12.345-6")).toBe("123456");
  });

  it("finds disease names by id", () => {
    const diseases = [
      { id: "1", name: "Hipertensão", medicalSpeciality: "Clínico", createdAt: "2024-01-01" },
      { id: "2", name: "Diabetes", medicalSpeciality: "Clínico", createdAt: "2024-01-02" },
    ];
    expect(findDiseaseName("2", diseases)).toBe("Diabetes");
    expect(findDiseaseName("3", diseases)).toBe("");
  });

  it("finds medication names by id", () => {
    const medications = [
      { id: "1", name: "Chá" },
      { id: "2", name: "Planta" },
    ];
    expect(findMedicationName("1", medications)).toBe("Chá");
    expect(findMedicationName("3", medications)).toBe("");
  });

  it("formats CEP values", () => {
    expect(formatCep("12345678")).toBe("12345-678");
    expect(formatCep("1234")).toBe("1234");
  });

  it("formats CPF and RG identifiers", () => {
    expect(formatCpf("12345678901")).toBe("123.456.789-01");
    expect(formatRg("123456789")).toBe("12.345.678-9");
  });

  it("formats passport codes and phone numbers", () => {
    expect(formatPassport("ab-123")).toBe("AB123");
    expect(formatPhoneNumber("11987654321")).toBe("(11) 98765-4321");
    expect(formatResidentialPhoneNumber("1134567890")).toBe("(11) 3456-7890");
  });

  it("validates identification documents and contact information", () => {
    expect(validateCpf("529.982.247-25")).toBe(true);
    expect(validateCpf("12345678901")).toBe(false);

    expect(validateRg("12.345.678-9")).toBe(true);
    expect(validateRg("11.111.111-1")).toBe(false);

    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("invalid-email")).toBe(false);

    expect(validatePhone("(11) 98765-4321")).toBe(true);
    expect(validatePhone("123")).toBe(false);

    expect(validateResidentialPhone("(11) 3456-7890")).toBe(true);
    expect(validateResidentialPhone("123")).toBe(false);
  });
});
