import { describe, expect, it } from "vitest";
import { ProtocolEngine } from "@/core/tamv/protocol.engine";

const baseInput = {
  protocolKey: "civil-protocol",
  objective: "Coordinar respuesta ética para evento comunitario",
  context: { actorUserId: "u1", actorRole: "guardian" as const, metadata: { trace_id: "t-1" } },
  constraints: [],
  signals: { trust: 80, relevance: 75, safety: 85 },
};

describe("ProtocolEngine", () => {
  it("debe validar correctamente un input constitucional", () => {
    const engine = new ProtocolEngine();
    const result = engine.validate(baseInput);
    expect(result.valid).toBe(true);
  });

  it("debe generar una decisión con alternativa seleccionada", () => {
    const engine = new ProtocolEngine();
    const decision = engine.decide(baseInput);
    expect(decision.selectedPath.pathId).toContain("civil-protocol");
    expect(decision.alternatives.length).toBe(3);
  });
});
