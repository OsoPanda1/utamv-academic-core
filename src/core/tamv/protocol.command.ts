import type { ProtocolInput } from "./protocol.types";

export type ProtocolCommandType = "create_run" | "validate_run" | "execute_run" | "complete_run";

export interface ProtocolCommand {
  commandId: string;
  type: ProtocolCommandType;
  runId: string;
  issuedAt: string;
  input?: ProtocolInput;
}

export function createProtocolCommand(
  type: ProtocolCommandType,
  runId: string,
  input?: ProtocolInput,
): ProtocolCommand {
  return {
    commandId: crypto.randomUUID(),
    type,
    runId,
    issuedAt: new Date().toISOString(),
    input,
  };
}
