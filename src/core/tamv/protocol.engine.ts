import crypto from "crypto";

import { supabase } from "@/integrations/supabase/client";

import { AcademicStandardsService } from "./academic.standards.service";
import { validateAgainstConstitution } from "./protocol.constitution";
import { recordEvent } from "./msr.engine";

import type {
  AcademicStandardsSnapshot,
  EoctEvaluation,
  ProtocolDecision,
  ProtocolDecisionPath,
  ProtocolExecution,
  ProtocolInput,
} from "./protocol.types";
import { evaluateEoct } from "./eoct.service";

/**
 * Weighted scoring (más robusto que promedio simple)
 */
function scorePath(
  input: ProtocolInput,
  label: string,
  boost = 0
): ProtocolDecisionPath {
  const weights = {
    ethical: 0.4,
    viability: 0.4,
    stability: 0.2,
  };

  const weightedScore =
    (input.signals?.ethical || 0) * weights.ethical +
    (input.signals?.viability || 0) * weights.viability +
    (input.signals?.stability || 0) * weights.stability;

  return {
    pathId: `${input.protocolKey}:${label}`,
    description: label,
    ethicalScore: Math.min(100, weightedScore + 10 + boost),
    viabilityScore: Math.min(100, weightedScore + boost),
    confidence: Math.min(100, weightedScore + 5 + boost),
  };
}

/**
 * Derivación de riesgo
 */
function deriveRisk(
  decision: ProtocolDecision
): ProtocolDecision["riskLevel"] {
  const selectedPath = decision.selectedPath as ProtocolDecisionPath;
  const score =
    ((selectedPath.ethicalScore ?? 0) +
      (selectedPath.viabilityScore ?? 0)) /
    2;

  if (score >= 80) return "low";
  if (score >= 60) return "medium";
  if (score >= 40) return "high";
  return "critical";
}

/**
 * Hash de decisiones (trazabilidad verificable)
 */
function hashDecision(decision: ProtocolDecision): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(decision))
    .digest("hex");
}

export interface ProtocolValidationResult {
  valid: boolean;
  violations: string[];
  academic: AcademicStandardsSnapshot;
}

export class ProtocolEngine {
  constructor(
    private readonly academicStandards = new AcademicStandardsService()
  ) {}

  /**
   * Crear ejecución del protocolo
   */
  createRun(input: ProtocolInput): ProtocolExecution {
    const run: ProtocolExecution = {
      runId: crypto.randomUUID(),
      traceId: crypto.randomUUID(),
      input,
      stage: "draft",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    recordEvent({
      eventType: "PROTOCOL_RUN_CREATED",
      entityId: run.runId,
      payload: {
        traceId: run.traceId,
        input,
      },
    });

    return run;
  }

  /**
   * Validación constitucional + académica
   */
  validate(input: ProtocolInput): ProtocolValidationResult {
    const constitutional = validateAgainstConstitution(input);
    const academic = this.academicStandards.evaluate(input);

    const result: ProtocolValidationResult = {
      valid: constitutional.passed && academic.passed,
      violations: [
        ...constitutional.violations.map((v) => v.message),
        ...academic.violations,
      ],
      academic,
    };

    recordEvent({
      eventType: "PROTOCOL_VALIDATED",
      entityId: input.protocolKey,
      payload: result,
    });

    return result;
  }

  /**
   * Toma de decisión multi-path
   */
  decide(input: ProtocolInput): ProtocolDecision {
    const alternatives: ProtocolDecisionPath[] = [
      scorePath(input, "baseline", 0),
      scorePath(input, "ethical_guarded", 7),
      scorePath(input, "high_throughput", -5),
    ];

    const selectedPath = alternatives
      .slice()
      .sort(
        (a, b) =>
          b.ethicalScore +
          b.viabilityScore -
          (a.ethicalScore + a.viabilityScore)
      )[0];

    const decisionBase: ProtocolDecision = {
      selectedPath,
      alternatives,
      rationale: `Selección por balance ético/viabilidad para ${input.objective}`,
      riskLevel: "medium",
    };

    const finalDecision: ProtocolDecision = {
      ...decisionBase,
      riskLevel: deriveRisk(decisionBase),
    };

    const decisionHash = hashDecision(finalDecision);

    recordEvent({
      eventType: "PROTOCOL_DECISION_MADE",
      entityId: input.protocolKey,
      payload: {
        decision: finalDecision,
        hash: decisionHash,
      },
    });

    return finalDecision;
  }
}


export interface ExecutionResult {
  executed: boolean;
  eoct: EoctEvaluation;
}

/**
 * Ejecuta EOCT sobre una decisión + contexto,
 * registra en tamv_kernel_events y devuelve resultado.
 */
export async function executeWithEoct(
  decision: ProtocolDecision,
  input: ProtocolInput
): Promise<ExecutionResult> {
  const eoct = evaluateEoct(decision, input);

  await supabase.from("tamv_kernel_events").insert({
    type: "EOCT_EVALUATED",
    payload: {
      decision,
      input,
      eoct,
    },
  });

  return {
    executed: eoct.status === "approved",
    eoct,
  };
}
