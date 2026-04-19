import { describe, expect, it } from "vitest";
import { BookPiService, InMemoryBookPiRepository } from "@/core/tamv/bookpi";
import { EoctService } from "@/core/tamv/eoct.service";
import { IsabellaKernel } from "@/core/tamv/isabella.kernel";
import { InMemoryMsrRepository, MsrEngine } from "@/core/tamv/msr.engine";
import { ProtocolBookPiAdapter } from "@/core/tamv/protocol.bookpi.adapter";
import { ProtocolEngine } from "@/core/tamv/protocol.engine";
import { ProtocolGuardian } from "@/core/tamv/protocol.monitoring.guardian";
import { ProtocolMsrAdapter } from "@/core/tamv/protocol.msr.adapter";
import { ProtocolOrchestrator } from "@/core/tamv/protocol.orchestrator";
import { ProtocolXrVisualTranslator } from "@/core/tamv/protocol.visual.xr";
import { InMemoryXrGateway } from "@/core/tamv/xr.gateway";
import { ConsoleXrRenderer } from "@/core/tamv/xr.renderer.adapter";

describe("ProtocolOrchestrator", () => {
  it("ejecuta flujo completo", async () => {
    const msrRepo = new InMemoryMsrRepository();
    const bookRepo = new InMemoryBookPiRepository();

    const orchestrator = new ProtocolOrchestrator(
      new ProtocolEngine(),
      new ProtocolMsrAdapter(new MsrEngine(msrRepo)),
      new ProtocolBookPiAdapter(new BookPiService(bookRepo)),
      new ProtocolGuardian(),
      new ProtocolXrVisualTranslator(),
      new ConsoleXrRenderer(),
      new InMemoryXrGateway(),
      new EoctService(),
      new IsabellaKernel(),
    );

    const result = await orchestrator.execute({
      protocolKey: "tamv.phoenix",
      objective: "Ejecutar protocolo docente con trazabilidad",
      context: { actorUserId: "u1", actorRole: "guardian", metadata: { trace_id: "trace-01" } },
      constraints: [],
      signals: { trust: 78, viability: 66, clarity: 73 },
    });

    expect(result.stage).toBe("completed");
    expect(msrRepo.events.length).toBeGreaterThan(0);
    expect(bookRepo.entries.length).toBe(1);
  });
});
