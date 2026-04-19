import crypto from "crypto";

import type { EoctEvaluation, ProtocolDecision, ProtocolInput } from "./protocol.types";

/**
 * Evalúa una decisión bajo criterios de riesgo + contexto
 * y devuelve una evaluación EOCT completa.
 */
export function evaluateEoct(
  decision: ProtocolDecision,
  input: ProtocolInput = {}
): EoctEvaluation {
  const risk = decision.riskLevel;
  const metadata = input?.context?.metadata ?? {};

  let status: EoctEvaluation["status"] = "approved";
  const severity: EoctEvaluation["severity"] = risk;
  const requiredActions: string[] = [];
  let reason = "Operación permitida";

  if (risk === "critical") {
    status = "rejected";
    reason = "Riesgo crítico";
    requiredActions.push("Bloqueo total", "Revisión comité ético");
  } else if (risk === "high") {
    status = "escalated";
    reason = "Riesgo alto";
    requiredActions.push("Validación manual", "Auditoría");
  } else if (risk === "medium") {
    status = "approved";
    reason = "Riesgo medio (requiere monitoreo)";
    requiredActions.push("Monitoreo activo");
  } else {
    status = "approved";
    reason = "Riesgo bajo";
  }

  if (metadata.sensitive) {
    if (status === "approved") {
      status = "escalated";
      reason = "Escalado por contexto sensible";
    }
    requiredActions.push("Monitoreo reforzado por contexto sensible");
  }

  if (metadata.academicValidated === false) {
    status = "rejected";
    reason = "Falta validación académica";
    requiredActions.push("Revisión académica obligatoria");
  }

  const evaluationHash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ decision, input, status }))
    .digest("hex");

  return {
    status,
    passed: status === "approved",
    reason,
    severity,
    requiredActions,
    evaluationHash,
  };
}

export class EoctService {
  evaluate(decision: ProtocolDecision, input: ProtocolInput = {}): EoctEvaluation {
    return evaluateEoct(decision, input);
  }
}
