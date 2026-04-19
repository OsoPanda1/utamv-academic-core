import { describe, expect, it } from "vitest";
import { InMemoryProtocolWebhookDispatcher } from "@/core/tamv/protocol.webhook.dispatcher";

describe("InMemoryProtocolWebhookDispatcher", () => {
  it("genera entregas firmadas solo para eventos suscritos", async () => {
    const dispatcher = new InMemoryProtocolWebhookDispatcher([
      {
        id: "lms-bridge",
        eventTypes: ["protocol.decision.selected", "protocol.run.completed"],
        secret: "secret-1",
      },
    ]);

    const deliveries = await dispatcher.dispatch({
      type: "protocol.decision.selected",
      runId: "run-123",
      occurredAt: new Date().toISOString(),
      payload: { riskLevel: "low" },
    });

    expect(deliveries.length).toBe(1);
    expect(deliveries[0].signature.length).toBeGreaterThan(10);
    expect(dispatcher.deliveries.length).toBe(1);
  });
});
