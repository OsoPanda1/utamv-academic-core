import { UtamvAppShell } from "@/components/layout/UtamvAppShell";
import { TelemetryConsole } from "@/modules/telemetry/components/TelemetryConsole";

export default function AnalyticsPage() {
  return (
    <UtamvAppShell title="Analítica académica" subtitle="Telemetría y uso de campus">
      <TelemetryConsole />
    </UtamvAppShell>
  );
}
