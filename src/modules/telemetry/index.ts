export interface TelemetryEvent {
  name: string;
  timestamp: string;
  payload: Record<string, unknown>;
}

export function createTelemetryEvent(name: string, payload: Record<string, unknown>): TelemetryEvent {
  return { name, payload, timestamp: new Date().toISOString() };
}
