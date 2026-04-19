import type { ProtocolEvent } from "./protocol.types";
import { MsrEngine } from "./msr.engine";

export class ProtocolMsrAdapter {
  constructor(private readonly msr: MsrEngine) {}

  async publish(event: ProtocolEvent): Promise<void> {
    const severity = event.type.includes("rejected")
      ? "critical"
      : event.type === "protocol.academic.flagged"
        ? "warning"
        : "info";

    await this.msr.emit(event.type, event.payload, severity, event.runId);
  }
}
