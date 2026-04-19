import type { ProtocolInput } from "./protocol.types";

export type AiUsageMode = "none" | "declared" | "prohibited";

export interface AcademicStandardsEvaluation {
  passed: boolean;
  qualityScore: number;
  violations: string[];
  requiredActions: string[];
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

export class AcademicStandardsService {
  evaluate(input: ProtocolInput): AcademicStandardsEvaluation {
    const violations: string[] = [];
    const requiredActions: string[] = [];

    const admissionEvidenceCount = readNumericMetadata(input, "admission_evidence_count");
    if (input.protocolKey.includes("admission") && admissionEvidenceCount < 2) {
      violations.push("Admisión sin evidencia suficiente: se requieren al menos 2 evidencias verificables.");
      requiredActions.push("Solicitar portafolio y entrevista estructurada por competencias.");
    }

    const competencyEvidenceCount = readNumericMetadata(input, "competency_evidence_count");
    if (competencyEvidenceCount < 1) {
      violations.push("Evaluación sin evidencia práctica: falta entregable verificable.");
      requiredActions.push("Exigir proyecto aplicado, rúbrica y defensa breve.");
    }

    const aiMode = readAiMode(input);
    if (aiMode === "prohibited") {
      violations.push("Uso de IA no autorizado para esta actividad académica.");
      requiredActions.push("Activar revisión de integridad académica y abrir expediente.");
    }

    const scorePenalty = violations.length * 25;
    const baseSignals = Object.values(input.signals);
    const signalAvg = baseSignals.length > 0 ? baseSignals.reduce((a, b) => a + b, 0) / baseSignals.length : 50;
    const qualityScore = Math.max(0, Math.min(100, Math.round(signalAvg - scorePenalty / 2)));

    return {
      passed: violations.length === 0,
      qualityScore,
      violations,
      requiredActions,
    };
  }
}
