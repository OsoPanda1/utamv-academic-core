import type { MsrEvent, MsrRepository, MsrSeverity } from "./msr.types";

export class InMemoryMsrRepository implements MsrRepository {
  public readonly events: MsrEvent[] = [];

  async append(event: MsrEvent): Promise<void> {
    this.events.push(event);
  }
}

export class MsrEngine {
  constructor(private readonly repository: MsrRepository) {}

  async emit(eventType: string, payload: Record<string, unknown>, severity: MsrSeverity = "info", runId?: string): Promise<MsrEvent> {
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
