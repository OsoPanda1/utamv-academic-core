import { AcademicStandardsService } from "./academic.standards.service";
import { validateAgainstConstitution } from "./protocol.constitution";
import type { AcademicStandardsSnapshot, ProtocolDecision, ProtocolDecisionPath, ProtocolExecution, ProtocolInput } from "./protocol.types";

function scorePath(input: ProtocolInput, label: string, boost = 0): ProtocolDecisionPath {
  const signalSum = Object.values(input.signals).reduce((acc, value) => acc + value, 0);
  const base = Math.max(0, Math.min(100, signalSum / Math.max(1, Object.values(input.signals).length)));
  return {
    pathId: `${input.protocolKey}:${label}`,
    description: label,
    ethicalScore: Math.min(100, base + 10 + boost),
    viabilityScore: Math.min(100, base + boost),
    confidence: Math.min(100, base + 5 + boost),
  };
}

function deriveRisk(decision: ProtocolDecision): ProtocolDecision["riskLevel"] {
  const score = (decision.selectedPath.ethicalScore + decision.selectedPath.viabilityScore) / 2;
  if (score >= 80) return "low";
  if (score >= 60) return "medium";
  if (score >= 40) return "high";
  return "critical";
}

export interface ProtocolValidationResult {
  valid: boolean;
  violations: string[];
  academic: AcademicStandardsSnapshot;
}

export class ProtocolEngine {
  constructor(private readonly academicStandards = new AcademicStandardsService()) {}

  createRun(input: ProtocolInput): ProtocolExecution {
    return {
      runId: crypto.randomUUID(),
      input,
      stage: "draft",
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  validate(input: ProtocolInput): ProtocolValidationResult {
    const constitutional = validateAgainstConstitution(input);
    const academic = this.academicStandards.evaluate(input);

    return {
      valid: constitutional.passed && academic.passed,
      violations: [
        ...constitutional.violations.map((violation) => violation.message),
        ...academic.violations,
      ],
      academic,
    };
  }

  decide(input: ProtocolInput): ProtocolDecision {
    const alternatives = [
      scorePath(input, "baseline", 0),
      scorePath(input, "ethical_guarded", 7),
      scorePath(input, "high_throughput", -5),
    ];

    const selectedPath = alternatives
      .slice()
      .sort((a, b) => b.ethicalScore + b.viabilityScore - (a.ethicalScore + a.viabilityScore))[0];

    const decision: ProtocolDecision = {
      selectedPath,
      alternatives,
      rationale: `Selección por balance ético/viabilidad para ${input.objective}`,
      riskLevel: "medium",
    };

    return { ...decision, riskLevel: deriveRisk(decision) };
  }
}
