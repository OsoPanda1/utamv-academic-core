interface TelemetryConsoleEntry {
  timestamp: string;
  scope: "campus" | "identity" | "commerce" | "ai";
  event: string;
  meta: string;
}

const mockEntries: TelemetryConsoleEntry[] = [
  { timestamp: "2026-05-12T12:03:21Z", scope: "campus", event: "VISIT", meta: "/campus/cursos · user:ut-123" },
  { timestamp: "2026-05-12T12:03:34Z", scope: "identity", event: "AUTH_OK", meta: "supabase · role:student" },
];

export function TelemetryConsole() {
  return (
    <div className="rounded-2xl border border-ut-border/50 bg-black/80 p-4 backdrop-blur">
      <div className="flex items-center justify-between"><p className="text-xs font-medium text-slate-200">Consola de telemetría UTAMV</p><span className="text-[11px] text-slate-500">lectura · solo campus</span></div>
      <div className="mt-3 rounded-lg bg-black/80 p-3 text-[11px] font-mono text-slate-300">
        {mockEntries.map((e) => (
          <div key={`${e.timestamp}-${e.event}`} className="flex gap-2"><span className="text-slate-500">{new Date(e.timestamp).toISOString()}</span><span className="text-ut-telemetry">[{e.scope.toUpperCase()}]</span><span className="text-ut-success">{e.event}</span><span className="truncate text-slate-400">{e.meta}</span></div>
        ))}
      </div>
    </div>
  );
}
