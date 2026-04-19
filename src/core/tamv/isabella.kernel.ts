import type { ProtocolExecution } from "./protocol.types";

export class IsabellaKernel {
  summarize(execution: ProtocolExecution): string {
    return `Isabella report: ${execution.input.protocolKey} en estado ${execution.stage} con riesgo ${execution.decision?.riskLevel ?? "n/a"}.`;
  }
}
