import { describe, expect, it } from "vitest";

import Cpf from "./CPF";

describe("CPF validation", () => {
  it("validates correct CPF numbers", () => {
    const cpf = new Cpf();
    expect(cpf.validate("529.982.247-25")).toBe(true);
  });

  it("rejects invalid CPF numbers", () => {
    const cpf = new Cpf();
    expect(cpf.validate("123.456.789-00")).toBe(false);
  });
});
