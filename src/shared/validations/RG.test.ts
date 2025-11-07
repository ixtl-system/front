import { describe, expect, it } from "vitest";

import Rg from "./RG";

describe("RG validation", () => {
  it("validates correct RG numbers", () => {
    const rg = new Rg();
    expect(rg.validate("12.345.678-9")).toBe(true);
  });

  it("rejects invalid RG numbers", () => {
    const rg = new Rg();
    expect(rg.validate("11.111.111-1")).toBe(false);
  });
});
