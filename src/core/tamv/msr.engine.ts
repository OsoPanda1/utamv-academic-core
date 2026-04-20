import type { MsrEvent, MsrRepository, MsrSeverity } from "./msr.types";

export class InMemoryMsrRepository implements MsrRepository {
  public readonly events: MsrEvent[] = [];

  async append(event: MsrEvent): Promise<void> {
    this.events.push(event);
  }
}

export class MsrEngine {
  constructor(private readonly repository: MsrRepository) {}

  async emit(
    eventType: string,
    payload: Record<string, unknown>,
    severity: MsrSeverity = "info",
    runId?: string
  ): Promise<MsrEvent> {
    const event: MsrEvent = {
      id: crypto.randomUUID(),
      runId,
      eventType,
      severity,
      payload,
      createdAt: new Date().toISOString(),
    };

    await this.repository.append(event);
    return event;
  }
}

// Singleton interno para compatibilidad con módulos legacy
const _defaultRepo = new InMemoryMsrRepository();
const _defaultEngine = new MsrEngine(_defaultRepo);

export interface RecordEventInput {
  eventType: string;
  entityId?: string;
  payload: unknown;
  severity?: MsrSeverity;
}

/**
 * Helper de compatibilidad usado por protocol.engine, bookpi y academic.standards.
 * No lanza errores: registra en memoria de forma fire-and-forget.
 */
export function recordEvent(input: RecordEventInput): void {
  void _defaultEngine.emit(
    input.eventType,
    { payload: input.payload, entityId: input.entityId } as Record<string, unknown>,
    input.severity ?? "info"
  );
}
