export type MsrSeverity = "info" | "warning" | "critical";

export interface MsrEvent {
  id: string;
  runId?: string;
  eventType: string;
  severity: MsrSeverity;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface MsrRepository {
  append: (event: MsrEvent) => Promise<void>;
}
