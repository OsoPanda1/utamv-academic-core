export type RiskLevel = "low" | "medium" | "high" | "critical";
export type ProtocolRiskLevel = RiskLevel;

export type ProtocolStage =
  | "draft"
  | "validated"
  | "running"
  | "awaiting_review"
  | "completed"
  | "rejected";

export interface ProtocolContextMetadata {
  sensitive?: boolean;
  academicValidated?: boolean;
  federation_id?: number | string;
  entityType?: string;
  entityId?: string | number;
  [key: string]: unknown;
}

export interface ProtocolContext {
  actorUserId?: string;
  actorRole?: "student" | "creator" | "guardian" | "institutional" | "system";
  locale?: string;
  metadata?: ProtocolContextMetadata;
}

export interface ProtocolInput {
  protocolKey?: string;
  objective?: string;
  context?: ProtocolContext;
  constraints?: string[];
  signals?: Record<string, number>;
}

export interface AcademicStandardsSnapshot {
  passed: boolean;
  qualityScore: number;
  violations: string[];
  requiredActions: string[];
}

export interface ProtocolPath {
  pathId: string;
  label: string;
}

export interface ProtocolDecisionPath {
  pathId: string;
  description: string;
  ethicalScore: number;
  viabilityScore: number;
  confidence: number;
}

export interface ProtocolDecision {
  decisionId?: string;
  selectedPath: ProtocolPath | ProtocolDecisionPath;
  alternatives?: ProtocolDecisionPath[];
  rationale?: string;
  riskLevel: RiskLevel;
  description?: string;
}

export type EoctStatus = "approved" | "rejected" | "escalated";

export interface EoctEvaluation {
  status: EoctStatus;
  passed: boolean;
  reason: string;
  severity: RiskLevel;
  requiredActions: string[];
  evaluationHash: string;
}

export interface ProtocolExecution {
  runId: string;
  traceId?: string;
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
