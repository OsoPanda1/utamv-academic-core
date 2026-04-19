import { supabase } from "@/integrations/supabase/client";

import type { EoctEvaluation, ProtocolContextMetadata } from "./protocol.types";

export async function emitEoctTelemetry(
  eoct: EoctEvaluation,
  metadata: ProtocolContextMetadata
) {
  await supabase.from("tamvcrums_logs").insert({
    ecg_rhythm: deriveRhythm(eoct),
    impact_score: eoct.severity === "critical" ? 100 : eoct.severity === "high" ? 75 : 50,
    emotional_state: {
      label: eoct.status,
      reason: eoct.reason,
    },
    federation_id: metadata?.federation_id ?? null,
  });
}

function deriveRhythm(eoct: EoctEvaluation): number {
  if (eoct.status === "rejected") return 90;
  if (eoct.status === "escalated") return 70;
  return 40;
}
