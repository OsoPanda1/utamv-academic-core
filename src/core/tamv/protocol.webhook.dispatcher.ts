import { createHash } from "node:crypto";
import type { ProtocolEvent } from "./protocol.types";

export interface ProtocolWebhookEndpoint {
  id: string;
  eventTypes: ProtocolEvent["type"][];
  secret: string;
}

export interface ProtocolWebhookDelivery {
  endpointId: string;
  eventType: ProtocolEvent["type"];
  signature: string;
  occurredAt: string;
  payload: Record<string, unknown>;
}

export interface ProtocolWebhookDispatcher {
  dispatch: (event: ProtocolEvent) => Promise<ProtocolWebhookDelivery[]>;
}

export class InMemoryProtocolWebhookDispatcher implements ProtocolWebhookDispatcher {
  public readonly deliveries: ProtocolWebhookDelivery[] = [];

  constructor(private readonly endpoints: ProtocolWebhookEndpoint[]) {}

  async dispatch(event: ProtocolEvent): Promise<ProtocolWebhookDelivery[]> {
    const matched = this.endpoints.filter((endpoint) => endpoint.eventTypes.includes(event.type));
    const encodedPayload = JSON.stringify({
      type: event.type,
      runId: event.runId,
      occurredAt: event.occurredAt,
      payload: event.payload,
    });

    const results = matched.map((endpoint) => {
      const signature = createHash("sha256").update(`${endpoint.secret}.${encodedPayload}`).digest("hex");
      const delivery: ProtocolWebhookDelivery = {
        endpointId: endpoint.id,
        eventType: event.type,
        signature,
        occurredAt: new Date().toISOString(),
        payload: event.payload,
      };

      this.deliveries.push(delivery);
      return delivery;
    });

    return results;
  }
}
