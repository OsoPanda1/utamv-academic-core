import type { ProtocolEvent } from "./protocol.types";
import { MsrEngine } from "./msr.engine";

export class ProtocolMsrAdapter {
  constructor(private readonly msr: MsrEngine) {}

  async publish(event: ProtocolEvent): Promise<void> {
    await this.msr.emit(event.type, event.payload, event.type.includes("rejected") ? "critical" : "info", event.runId);
  }
}
