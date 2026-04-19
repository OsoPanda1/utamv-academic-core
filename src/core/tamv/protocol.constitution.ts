import type { ProtocolInput, ProtocolRiskLevel } from "./protocol.types";

export interface ConstitutionalRule {
  id: string;
  title: string;
  severity: ProtocolRiskLevel;
  evaluate: (input: ProtocolInput) => boolean;
  violationMessage: string;
}

export interface ConstitutionalValidationResult {
  passed: boolean;
  violations: Array<{ ruleId: string; severity: ProtocolRiskLevel; message: string }>;
}

export const constitutionalRules: ConstitutionalRule[] = [
  {
    id: "do-no-harm",
    title: "Do-No-Harm",
    severity: "critical",
    evaluate: (input) => !input.constraints.includes("harmful_action"),
    violationMessage: "La propuesta viola la política Do-No-Harm.",
  },
  {
    id: "civilian-clarity",
    title: "Civilians must understand",
    severity: "medium",
    evaluate: (input) => input.objective.length >= 12,
    violationMessage: "El objetivo es ambiguo para uso civil.",
  },
  {
    id: "auditability",
    title: "Trazabilidad requerida",
    severity: "high",
    evaluate: (input) => Boolean(input.context.metadata?.trace_id),
    violationMessage: "Falta trace_id para auditoría MSR/BookPI.",
  },
];

export function validateAgainstConstitution(input: ProtocolInput): ConstitutionalValidationResult {
  const violations = constitutionalRules
    .filter((rule) => !rule.evaluate(input))
    .map((rule) => ({ ruleId: rule.id, severity: rule.severity, message: rule.violationMessage }));

  return {
    passed: violations.length === 0,
    violations,
  };
}
