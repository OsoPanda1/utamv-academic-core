import { transitionExecution } from "./protocol.lifecycle";
import { ProtocolBookPiAdapter } from "./protocol.bookpi.adapter";
import { ProtocolEngine } from "./protocol.engine";
import { ProtocolGuardian } from "./protocol.monitoring.guardian";
import { ProtocolMsrAdapter } from "./protocol.msr.adapter";
import { ProtocolXrVisualTranslator } from "./protocol.visual.xr";
import { EoctService } from "./eoct.service";
import { IsabellaKernel } from "./isabella.kernel";
import type { ProtocolExecution, ProtocolInput } from "./protocol.types";
import type { XrGateway } from "./xr.gateway";
import type { XrRenderer } from "./xr.renderer.adapter";

export class ProtocolOrchestrator {
  constructor(
    private readonly engine: ProtocolEngine,
    private readonly msrAdapter: ProtocolMsrAdapter,
    private readonly bookPiAdapter: ProtocolBookPiAdapter,
    private readonly guardian: ProtocolGuardian,
    private readonly xrTranslator: ProtocolXrVisualTranslator,
    private readonly xrRenderer: XrRenderer,
    private readonly xrGateway: XrGateway,
    private readonly eoct: EoctService,
    private readonly isabella: IsabellaKernel,
  ) {}

  async execute(input: ProtocolInput): Promise<ProtocolExecution> {
    let run = this.engine.createRun(input);

    const validation = this.engine.validate(input);
    if (!validation.valid) {
      await this.msrAdapter.publish({
        type: "protocol.run.rejected",
        runId: run.runId,
        occurredAt: new Date().toISOString(),
        payload: { violations: validation.violations },
      });
      run = transitionExecution(run, "rejected");
      return run;
    }

    run = transitionExecution(run, "validated");
    run = transitionExecution(run, "running");

    const decision = this.engine.decide(input);
    const eoctResult = this.eoct.evaluate(decision);

    if (!eoctResult.passed) {
      await this.msrAdapter.publish({
        type: "protocol.run.rejected",
        runId: run.runId,
        occurredAt: new Date().toISOString(),
        payload: { reason: eoctResult.reason },
      });
      run = { ...run, decision };
      run = transitionExecution(run, "rejected");
      return run;
    }

    run = { ...run, decision, updatedAt: new Date().toISOString() };

    await this.msrAdapter.publish({
      type: "protocol.decision.selected",
      runId: run.runId,
      occurredAt: new Date().toISOString(),
      payload: {
        selectedPath: decision.selectedPath.pathId,
        riskLevel: decision.riskLevel,
        isabellaSummary: this.isabella.summarize(run),
      },
    });

    const alert = this.guardian.evaluate(run);
    const visualEvent = this.xrTranslator.toVisualEvent(alert);
    await this.xrRenderer.render(visualEvent);
    await this.xrGateway.publish(visualEvent);
    await this.bookPiAdapter.summarizeExecution(run);

    run = transitionExecution(run, "awaiting_review");
    run = transitionExecution(run, "completed");

    await this.msrAdapter.publish({
      type: "protocol.run.completed",
      runId: run.runId,
      occurredAt: new Date().toISOString(),
      payload: { stage: run.stage },
    });

    return run;
  }
}
