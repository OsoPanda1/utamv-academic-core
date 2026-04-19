import { transitionExecution } from "./protocol.lifecycle";
import { ProtocolBookPiAdapter } from "./protocol.bookpi.adapter";
import { ProtocolEngine } from "./protocol.engine";
import { ProtocolGuardian } from "./protocol.monitoring.guardian";
import { ProtocolMsrAdapter } from "./protocol.msr.adapter";
import type { ProtocolWebhookDispatcher } from "./protocol.webhook.dispatcher";
import { ProtocolXrVisualTranslator } from "./protocol.visual.xr";
import { EoctService } from "./eoct.service";
import { IsabellaKernel } from "./isabella.kernel";
import type { ProtocolEvent, ProtocolExecution, ProtocolInput } from "./protocol.types";
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
    private readonly webhookDispatcher?: ProtocolWebhookDispatcher,
  ) {}

  private async publish(event: ProtocolEvent): Promise<void> {
    await this.msrAdapter.publish(event);
    if (this.webhookDispatcher) {
      await this.webhookDispatcher.dispatch(event);
    }
  }

  async execute(input: ProtocolInput): Promise<ProtocolExecution> {
    let run = this.engine.createRun(input);

    const validation = this.engine.validate(input);
    run = {
      ...run,
      academicStandards: validation.academic,
      updatedAt: new Date().toISOString(),
    };

    if (!validation.valid) {
      await this.publish({
        type: "protocol.run.rejected",
        runId: run.runId,
        occurredAt: new Date().toISOString(),
        payload: {
          violations: validation.violations,
          academicQualityScore: validation.academic.qualityScore,
        },
      });
      run = transitionExecution(run, "rejected");
      return run;
    }

    run = transitionExecution(run, "validated");
    run = transitionExecution(run, "running");

    const decision = this.engine.decide(input);
    const eoctResult = this.eoct.evaluate(decision);

    if (!eoctResult.passed) {
      await this.publish({
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

    await this.publish({
      type: "protocol.decision.selected",
      runId: run.runId,
      occurredAt: new Date().toISOString(),
      payload: {
        selectedPath: decision.selectedPath.pathId,
        riskLevel: decision.riskLevel,
        academicQualityScore: run.academicStandards?.qualityScore,
        isabellaSummary: this.isabella.summarize(run),
      },
    });

    if (run.academicStandards && run.academicStandards.qualityScore < 60) {
      await this.publish({
        type: "protocol.academic.flagged",
        runId: run.runId,
        occurredAt: new Date().toISOString(),
        payload: {
          qualityScore: run.academicStandards.qualityScore,
          requiredActions: run.academicStandards.requiredActions,
        },
      });
    }

    const alert = this.guardian.evaluate(run);
    const visualEvent = this.xrTranslator.toVisualEvent(alert);
    await this.xrRenderer.render(visualEvent);
    await this.xrGateway.publish(visualEvent);
    await this.bookPiAdapter.summarizeExecution(run);

    run = transitionExecution(run, "awaiting_review");
    run = transitionExecution(run, "completed");

    await this.publish({
      type: "protocol.run.completed",
      runId: run.runId,
      occurredAt: new Date().toISOString(),
      payload: { stage: run.stage, academicQualityScore: run.academicStandards?.qualityScore },
    });

    return run;
  }
}
