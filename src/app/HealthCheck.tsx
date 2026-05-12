export function HealthCheck() {
  return (
    <div className="p-4 text-sm text-muted-foreground">
      <p>UTAMV Academic Core - status: OK</p>
      <p>buildMode: {import.meta.env.MODE}</p>
      <p>timestamp: {new Date().toISOString()}</p>
    </div>
  );
}
