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

import { InMemoryProtocolWebhookDispatcher } from "@/core/tamv/protocol.webhook.dispatcher";

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
      context: { actorUserId: "u1", actorRole: "guardian", metadata: { trace_id: "trace-01", competency_evidence_count: 2, ai_usage_mode: "declared" } },
      constraints: [],
      signals: { trust: 78, viability: 66, clarity: 73 },
    });

    expect(result.stage).toBe("completed");
    expect(msrRepo.events.length).toBeGreaterThan(0);
    expect(bookRepo.entries.length).toBe(1);
  });


  it("dispara webhooks y bandera académica cuando la calidad es baja", async () => {
    const msrRepo = new InMemoryMsrRepository();
    const bookRepo = new InMemoryBookPiRepository();
    const webhook = new InMemoryProtocolWebhookDispatcher([
      {
        id: "audit-bus",
        eventTypes: ["protocol.decision.selected", "protocol.academic.flagged", "protocol.run.completed"],
        secret: "audit-secret",
      },
    ]);

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
      webhook,
    );

    const result = await orchestrator.execute({
      protocolKey: "tamv.low-signal",
      objective: "Ejecución con señales débiles para probar alerta de calidad",
      context: {
        actorUserId: "u2",
        actorRole: "guardian",
        metadata: { trace_id: "trace-02", competency_evidence_count: 1, ai_usage_mode: "none" },
      },
      constraints: [],
      signals: { trust: 30, viability: 35, clarity: 40 },
    });

    expect(result.stage).toBe("completed");
    expect(result.academicStandards?.qualityScore).toBeLessThan(60);
    expect(msrRepo.events.some((event) => event.eventType === "protocol.academic.flagged")).toBe(true);
    expect(webhook.deliveries.length).toBeGreaterThanOrEqual(2);
  });

});
