import { describe, expect, it } from "vitest";
import { AcademicStandardsService } from "@/core/tamv/academic.standards.service";

describe("AcademicStandardsService", () => {
  it("aprueba ejecución con evidencia y uso de IA declarado", () => {
    const service = new AcademicStandardsService();

    const result = service.evaluate({
      protocolKey: "tamv.admission.flow",
      objective: "Validar ingreso por competencias y evidencias verificables",
      context: {
        actorUserId: "u-1",
        actorRole: "guardian",
        metadata: {
          admission_evidence_count: 3,
          competency_evidence_count: 2,
          ai_usage_mode: "declared",
          trace_id: "trace-ok",
        },
      },
      constraints: [],
      signals: { trust: 80, viability: 75, clarity: 72 },
    });

    expect(result.passed).toBe(true);
    expect(result.qualityScore).toBeGreaterThanOrEqual(70);
  });

  it("bloquea cuando hay IA prohibida y sin evidencia práctica", () => {
    const service = new AcademicStandardsService();

    const result = service.evaluate({
      protocolKey: "tamv.admission.flow",
      objective: "Admisión sin respaldo",
      context: {
        actorUserId: "u-2",
        actorRole: "guardian",
        metadata: {
          admission_evidence_count: 1,
          competency_evidence_count: 0,
          ai_usage_mode: "prohibited",
          trace_id: "trace-bad",
        },
      },
      constraints: [],
      signals: { trust: 50, viability: 40 },
    });

    expect(result.passed).toBe(false);
    expect(result.violations.length).toBeGreaterThanOrEqual(2);
    expect(result.requiredActions.length).toBeGreaterThanOrEqual(2);
  });
});
