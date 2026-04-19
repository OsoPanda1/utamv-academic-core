import { describe, expect, it } from "vitest";
import { IdnVidaService } from "@/core/tamv/idnvida.service";

describe("IdnVidaService", () => {
  it("registra y promueve identidad", () => {
    const idn = new IdnVidaService();
    const base = idn.register("u-id");
    expect(base.trustLevel).toBe("base");

    const promoted = idn.promote("u-id", "verified");
    expect(promoted.trustLevel).toBe("verified");
  });
});
