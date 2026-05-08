import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Row = { event_id: string; event_type: string; processed_at: string; payload: any };

export default function StripeEventsAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Row | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("processed_stripe_events")
      .select("event_id,event_type,processed_at,payload")
      .order("processed_at", { ascending: false })
      .limit(200);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const colorFor = (t: string) =>
    t.includes("completed") ? "bg-emerald-600" :
    t.includes("refund") || t.includes("dispute") ? "bg-red-600" :
    t.includes("expired") ? "bg-amber-600" : "bg-slate-600";

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold">Eventos Stripe procesados</h1>
            <p className="text-muted-foreground text-sm">Idempotencia y trazabilidad de cobros</p>
          </div>
          <Button onClick={load} disabled={loading}>{loading ? "Cargando…" : "Refrescar"}</Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>Últimos 200 eventos</CardTitle></CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh]">
                <div className="space-y-2 pr-3">
                  {rows.map((r) => (
                    <button key={r.event_id} onClick={() => setSelected(r)}
                      className="w-full text-left border rounded-lg p-3 hover:bg-muted/40 transition">
                      <div className="flex items-center justify-between">
                        <Badge className={`${colorFor(r.event_type)} text-white`}>{r.event_type}</Badge>
                        <span className="text-xs text-muted-foreground">{new Date(r.processed_at).toLocaleString()}</span>
                      </div>
                      <code className="text-xs text-muted-foreground block mt-1 truncate">{r.event_id}</code>
                    </button>
                  ))}
                  {rows.length === 0 && !loading && (
                    <p className="text-muted-foreground text-sm">Aún no hay eventos. En cuanto Stripe envíe el primer cobro al webhook, aparecerá aquí.</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Payload</CardTitle></CardHeader>
            <CardContent>
              <ScrollArea className="h-[70vh]">
                {selected ? (
                  <pre className="text-xs bg-muted/40 p-3 rounded-lg overflow-auto">
{JSON.stringify(selected.payload, null, 2)}
                  </pre>
                ) : <p className="text-muted-foreground text-sm">Selecciona un evento.</p>}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
