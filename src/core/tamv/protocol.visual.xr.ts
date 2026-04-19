import type { GuardianAlert } from "./protocol.monitoring.guardian";

export interface XrVisualEvent {
  sceneKey: string;
  intensity: number;
  color: "emerald" | "amber" | "crimson";
  label: string;
}

export class ProtocolXrVisualTranslator {
  toVisualEvent(alert: GuardianAlert | null): XrVisualEvent {
    if (!alert) {
      return { sceneKey: "tamv.city.calm", intensity: 15, color: "emerald", label: "Normal operation" };
    }

    if (alert.level === "medium") {
      return { sceneKey: "tamv.city.watch", intensity: 45, color: "amber", label: alert.message };
    }

    return { sceneKey: "tamv.city.escalation", intensity: 80, color: "crimson", label: alert.message };
  }
}
