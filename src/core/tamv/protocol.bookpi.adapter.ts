import { BookPiService } from "./bookpi";
import type { ProtocolExecution } from "./protocol.types";

export class ProtocolBookPiAdapter {
  constructor(private readonly bookpi: BookPiService) {}

  async summarizeExecution(execution: ProtocolExecution): Promise<void> {
    const quality = execution.academicStandards?.qualityScore ?? "n/a";
    const stageSummary = `Ejecución ${execution.runId} en estado ${execution.stage} (calidad académica: ${quality})`;
    await this.bookpi.narrate(
      `Protocol ${execution.input.protocolKey}`,
      stageSummary,
      ["protocol", execution.input.protocolKey, execution.stage],
      execution.runId,
    );
  }
}
