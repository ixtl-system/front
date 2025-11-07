import { describe, expect, it } from "vitest";

import { validateCpf, validateEmail, validatePhone, validateResidentialPhone, validateRg } from "@/shared/utils/validate";

describe("validation helpers", () => {
  it("validates CPF", () => {
    expect(validateCpf("52998224725")).toBe(true);
    expect(validateCpf("11111111111")).toBe(false);
  });

  it("validates RG", () => {
    expect(validateRg("10.000.019-8")).toBe(true);
    expect(validateRg("12345678")).toBe(false);
  });

  it("validates email", () => {
    expect(validateEmail("user@test.com")).toBe(true);
    expect(validateEmail("invalid@")).toBe(false);
  });

  it("validates phone numbers", () => {
    expect(validatePhone("(11) 98765-4321")).toBe(true);
    expect(validatePhone("000")).toBe(false);
  });

  it("validates residential phone numbers", () => {
    expect(validateResidentialPhone("(11) 3265-4321")).toBe(true);
    expect(validateResidentialPhone("(11) 1111-1111")).toBe(false);
  });
});
