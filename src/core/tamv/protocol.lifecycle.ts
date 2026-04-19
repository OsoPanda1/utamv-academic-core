import type { ProtocolExecution, ProtocolStage } from "./protocol.types";

const stageTransitions: Record<ProtocolStage, ProtocolStage[]> = {
  draft: ["validated", "rejected"],
  validated: ["running", "rejected"],
  running: ["awaiting_review", "completed", "rejected"],
  awaiting_review: ["completed", "rejected"],
  completed: [],
  rejected: [],
};

export function canTransition(current: ProtocolStage, next: ProtocolStage): boolean {
  return stageTransitions[current].includes(next);
}

export function transitionExecution(execution: ProtocolExecution, next: ProtocolStage): ProtocolExecution {
  if (!canTransition(execution.stage, next)) {
    throw new Error(`Invalid transition: ${execution.stage} -> ${next}`);
  }

  return {
    ...execution,
    stage: next,
    updatedAt: new Date().toISOString(),
  };
}
