import type { XrVisualEvent } from "./protocol.visual.xr";

export interface XrRenderer {
  render: (event: XrVisualEvent) => Promise<void>;
}

export class ConsoleXrRenderer implements XrRenderer {
  async render(event: XrVisualEvent): Promise<void> {
    console.info(`[XR:${event.sceneKey}] ${event.label} (${event.intensity})`);
  }
}
