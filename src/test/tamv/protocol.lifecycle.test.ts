import { describe, expect, it } from "vitest";
import { transitionExecution } from "@/core/tamv/protocol.lifecycle";
import type { ProtocolExecution } from "@/core/tamv/protocol.types";

const execution: ProtocolExecution = {
  runId: "r1",
  stage: "draft",
  input: {
    protocolKey: "demo",
    objective: "Demo",
    context: { actorUserId: "u", actorRole: "system" },
    constraints: [],
    signals: { a: 1 },
  },
  startedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("ProtocolLifecycle", () => {
  it("permite transición válida", () => {
    const next = transitionExecution(execution, "validated");
    expect(next.stage).toBe("validated");
  });

  it("bloquea transición inválida", () => {
    expect(() => transitionExecution(execution, "completed")).toThrow();
  });
});
