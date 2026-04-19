import { describe, expect, it } from "vitest";
import { ProtocolGuardian } from "@/core/tamv/protocol.monitoring.guardian";
import { ProtocolXrVisualTranslator } from "@/core/tamv/protocol.visual.xr";
import type { ProtocolExecution } from "@/core/tamv/protocol.types";

const run: ProtocolExecution = {
  runId: "run-1",
  stage: "running",
  input: {
    protocolKey: "guardian-test",
    objective: "Monitoring",
    context: { actorUserId: "u", actorRole: "guardian" },
    constraints: [],
    signals: { trust: 20 },
  },
  decision: {
    selectedPath: { pathId: "p1", description: "path", ethicalScore: 30, viabilityScore: 20, confidence: 40 },
    alternatives: [],
    rationale: "r",
    riskLevel: "high",
  },
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("Guardian + XR", () => {
  it("genera alerta y evento visual", () => {
    const guardian = new ProtocolGuardian();
    const translator = new ProtocolXrVisualTranslator();
    const alert = guardian.evaluate(run);
    expect(alert).not.toBeNull();

    const visual = translator.toVisualEvent(alert);
    expect(visual.sceneKey).toContain("escalation");
  });
});
