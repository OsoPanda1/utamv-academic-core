import type { XrVisualEvent } from "./protocol.visual.xr";

export interface XrGateway {
  publish: (event: XrVisualEvent) => Promise<void>;
}

export class InMemoryXrGateway implements XrGateway {
  public readonly events: XrVisualEvent[] = [];

  async publish(event: XrVisualEvent): Promise<void> {
    this.events.push(event);
  }
}
