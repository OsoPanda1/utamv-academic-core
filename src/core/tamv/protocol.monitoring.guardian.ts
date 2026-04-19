import type { ProtocolExecution, ProtocolRiskLevel } from "./protocol.types";

export interface GuardianAlert {
  id: string;
  runId: string;
  level: ProtocolRiskLevel;
  message: string;
  createdAt: string;
}

export class ProtocolGuardian {
  evaluate(execution: ProtocolExecution): GuardianAlert | null {
    if (!execution.decision) return null;
    if (execution.decision.riskLevel === "low") return null;

    return {
      id: crypto.randomUUID(),
      runId: execution.runId,
      level: execution.decision.riskLevel,
      message: `Guardian alert: ${execution.decision.riskLevel} risk for ${execution.input.protocolKey}`,
      createdAt: new Date().toISOString(),
    };
  }
}
