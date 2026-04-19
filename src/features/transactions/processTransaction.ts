import { executeWithEoct } from "@/core/tamv/protocol.engine";
import { emitEoctTelemetry } from "@/core/tamv/eoctTelemetry";
import { updateNodeFromEoct } from "@/core/tamv/nodeUpdater";
import type { ProtocolDecision, ProtocolInput, RiskLevel } from "@/core/tamv/protocol.types";

export async function processTransaction(tx: any) {
  const decision: ProtocolDecision = {
    decisionId: `TX-${tx.id}`,
    selectedPath: {
      pathId: `TAMVTransaction::${tx.id}`,
      label: "create",
    },
    riskLevel: deriveRisk(tx),
    description: "Creación de transacción TAMV DM‑X4",
  };

  const input: ProtocolInput = {
    context: {
      metadata: {
        sensitive: tx.amount > 1000,
        federation_id: 1,
        entityType: "TAMVTransaction",
        entityId: tx.id,
      },
    },
  };

  const result = await executeWithEoct(decision, input);

  await emitEoctTelemetry(result.eoct, input.context?.metadata ?? {});
  await updateNodeFromEoct(tx.node_id, result.eoct);

  if (!result.executed) {
    throw new Error(result.eoct.reason);
  }

  return saveTransaction(tx);
}

function deriveRisk(tx: any): RiskLevel {
  if (tx.amount > 5000) return "critical";
  if (tx.amount > 1000) return "high";
  if (tx.amount > 200) return "medium";
  return "low";
}

async function saveTransaction(tx: any) {
  return tx;
}
