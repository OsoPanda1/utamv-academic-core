import { supabase } from "@/integrations/supabase/client";

import type { EoctEvaluation, ProtocolContextMetadata } from "./protocol.types";

export async function emitEoctTelemetry(
  eoct: EoctEvaluation,
  metadata: ProtocolContextMetadata
) {
  // Tabla tamvcrums_logs no está en el schema actual; no-op seguro.
  try {
    await (supabase as any).from("tamvcrums_logs").insert({
      ecg_rhythm: deriveRhythm(eoct),
      impact_score: eoct.severity === "critical" ? 100 : eoct.severity === "high" ? 75 : 50,
      emotional_state: { label: eoct.status, reason: eoct.reason },
      federation_id: metadata?.federation_id ?? null,
    });
  } catch {
    // Telemetría opcional
  }
}

function deriveRhythm(eoct: EoctEvaluation): number {
  if (eoct.status === "rejected") return 90;
  if (eoct.status === "escalated") return 70;
  return 40;
}
