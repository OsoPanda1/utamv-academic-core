export type ProtocolRiskLevel = "low" | "medium" | "high" | "critical";

export type ProtocolStage =
  | "draft"
  | "validated"
  | "running"
  | "awaiting_review"
  | "completed"
  | "rejected";

export interface ProtocolContext {
  actorUserId: string;
  actorRole: "student" | "creator" | "guardian" | "institutional" | "system";
  locale?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface ProtocolInput {
  protocolKey: string;
  objective: string;
  context: ProtocolContext;
  constraints: string[];
  signals: Record<string, number>;
}

export interface AcademicStandardsSnapshot {
  passed: boolean;
  qualityScore: number;
  violations: string[];
  requiredActions: string[];
}

export interface ProtocolDecisionPath {
  pathId: string;
  description: string;
  ethicalScore: number;
  viabilityScore: number;
  confidence: number;
}

export interface ProtocolDecision {
  selectedPath: ProtocolDecisionPath;
  alternatives: ProtocolDecisionPath[];
  rationale: string;
  riskLevel: ProtocolRiskLevel;
}

export interface ProtocolExecution {
  runId: string;
  stage: ProtocolStage;
  input: ProtocolInput;
  decision?: ProtocolDecision;
  academicStandards?: AcademicStandardsSnapshot;
  startedAt: string;
  updatedAt: string;
}

export interface ProtocolEvent {
  type:
    | "protocol.run.created"
    | "protocol.run.validated"
    | "protocol.decision.selected"
    | "protocol.academic.flagged"
    | "protocol.run.completed"
    | "protocol.run.rejected";
  runId: string;
  occurredAt: string;
  payload: Record<string, unknown>;
}
