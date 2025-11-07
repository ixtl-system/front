import { describe, expect, it } from "vitest";

import { formatCep } from "../formatCep";
import { formatCpf } from "../formatCpf";
import { formatPhoneNumber, formatResidentialPhoneNumber } from "../formatPhoneNumber";
import { formatPassport } from "../formatPassport";
import { formatRg } from "../formatRG";
import cleanString from "../cleanString";

describe("string formatters", () => {
  it("formats cpf values", () => {
    expect(formatCpf("12345678901")).toBe("123.456.789-01");
    expect(formatCpf("")).toBe("");
  });

  it("formats rg values", () => {
    expect(formatRg("123456789")).toBe("12.345.678-9");
  });

  it("formats phone numbers", () => {
    expect(formatPhoneNumber("11987654321")).toBe("(11) 98765-4321");
    expect(formatResidentialPhoneNumber("1132654321")).toBe("(11) 3265-4321");
  });

  it("formats cep", () => {
    expect(formatCep("12345678")).toBe("12345-678");
  });

  it("formats passport codes", () => {
    expect(formatPassport("ab-12")).toBe("AB12");
  });

  it("cleans string digits", () => {
    expect(cleanString("123-45")).toBe("12345");
  });
});
