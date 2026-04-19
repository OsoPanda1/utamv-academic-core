import crypto from "crypto";

import type { ProtocolInput } from "./protocol.types";
import { recordEvent } from "./msr.engine";

export type AiUsageMode = "none" | "declared" | "prohibited";

export interface AcademicStandardsEvaluation {
  passed: boolean;
  qualityScore: number;
  violations: string[];
  requiredActions: string[];

  // 🔥 NUEVO
  severity: "low" | "medium" | "high" | "critical";
  evaluationHash: string;
}

function readNumericMetadata(input: ProtocolInput, key: string): number {
  const value = input.context.metadata?.[key];
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function readAiMode(input: ProtocolInput): AiUsageMode {
  const raw = input.context.metadata?.ai_usage_mode;
  if (raw === "none" || raw === "declared" || raw === "prohibited") {
    return raw;
  }
  return "none";
}

/**
 * 🔥 Severidad basada en número y tipo de violaciones
 */
function deriveSeverity(violations: string[]): AcademicStandardsEvaluation["severity"] {
  if (violations.length === 0) return "low";
  if (violations.length === 1) return "medium";
  if (violations.length === 2) return "high";
  return "critical";
}

/**
 * 🔐 Hash verificable de evaluación
 */
function hashEvaluation(evaluation: any): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(evaluation))
    .digest("hex");
}

export class AcademicStandardsService {
  evaluate(input: ProtocolInput): AcademicStandardsEvaluation {
    const violations: string[] = [];
    const requiredActions: string[] = [];

    /**
     * 🎓 ADMISIÓN
     */
    const admissionEvidenceCount = readNumericMetadata(input, "admission_evidence_count");
    if (input.protocolKey.includes("admission") && admissionEvidenceCount < 2) {
      violations.push("Admisión sin evidencia suficiente");
      requiredActions.push("Solicitar portafolio y entrevista estructurada");
    }

    /**
     * 🧠 COMPETENCIAS
     */
    const competencyEvidenceCount = readNumericMetadata(input, "competency_evidence_count");
    if (competencyEvidenceCount < 1) {
      violations.push("Falta evidencia práctica verificable");
      requiredActions.push("Exigir proyecto aplicado con rúbrica");
    }

    /**
     * 🤖 IA
     */
    const aiMode = readAiMode(input);

    if (aiMode === "prohibited") {
      violations.push("Uso de IA no autorizado");
      requiredActions.push("Abrir revisión de integridad académica");
    }

    /**
     * 📊 SCORING MEJORADO
     */
    const baseSignals = Object.values(input.signals);
    const signalAvg =
      baseSignals.length > 0
        ? baseSignals.reduce((a, b) => a + b, 0) / baseSignals.length
        : 50;

    const penaltyMap = {
      low: 5,
      medium: 15,
      high: 30,
      critical: 50,
    };

    const severity = deriveSeverity(violations);

    const penalty = penaltyMap[severity];

    const qualityScore = Math.max(
      0,
      Math.min(100, Math.round(signalAvg - penalty))
    );

    /**
     * 📦 RESULTADO BASE
     */
    const evaluationBase = {
      passed: violations.length === 0,
      qualityScore,
      violations,
      requiredActions,
      severity,
    };

    /**
     * 🔐 HASH
     */
    const evaluationHash = hashEvaluation(evaluationBase);

    const finalEvaluation: AcademicStandardsEvaluation = {
      ...evaluationBase,
      evaluationHash,
    };

    /**
     * 🔥 REGISTRO EN MSR
     */
    recordEvent({
      eventType: "ACADEMIC_EVALUATED",
      entityId: input.protocolKey,
      payload: finalEvaluation,
    });

    return finalEvaluation;
  }
}
