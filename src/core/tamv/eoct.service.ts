import type { ProtocolDecision } from "./protocol.types";

export interface EoctEvaluation {
  passed: boolean;
  reason: string;
}

export class EoctService {
  evaluate(decision: ProtocolDecision): EoctEvaluation {
    if (decision.riskLevel === "critical") {
      return { passed: false, reason: "EOCT bloquea decisiones de riesgo crítico." };
    }
    return { passed: true, reason: "EOCT aprobado." };
  }
}
