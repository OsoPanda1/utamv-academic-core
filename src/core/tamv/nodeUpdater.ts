import { supabase } from "@/integrations/supabase/client";

import type { EoctEvaluation } from "./protocol.types";

export async function updateNodeFromEoct(nodeId: string, eoct: EoctEvaluation) {
  let status = "OK";

  if (eoct.status === "rejected") status = "OFFLINE";
  if (eoct.status === "escalated") status = "SATURATING";

  await supabase
    .from("tamv_federation_ring")
    .update({
      status,
      ecg_rhythm: deriveRhythm(eoct),
    })
    .eq("id", nodeId);
}

function deriveRhythm(eoct: EoctEvaluation): number {
  if (eoct.status === "rejected") return 95;
  if (eoct.status === "escalated") return 75;
  return 45;
}
