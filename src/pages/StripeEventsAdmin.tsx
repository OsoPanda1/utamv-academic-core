import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, CheckCircle2, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";

type EventRow = {
  event_id: string;
  event_type: string;
  processed_at: string;
  payload: any;
};

type FailureRow = {
  id: string;
  event_id: string | null;
  event_type: string | null;
  error_message: string;
  payload: any;
  retry_count: number;
  resolved: boolean;
  created_at: string;
};

type Enrollment = {
  id: string;
  user_id: string;
  course_id: string;
  status: string;
  amount_paid_mxn: number | null;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  enrolled_at: string;
};

type Course = { id: string; slug: string; title: string };

const TYPE_OPTIONS = [
  "all",
  "checkout.session.completed",
  "checkout.session.expired",
  "charge.refunded",
  "charge.dispute.created",
];

const STATUS_OPTIONS = ["all", "active", "pending", "expired", "refunded"];

export default function StripeEventsAdmin() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [failures, setFailures] = useState<FailureRow[]>([]);
  const [courses, setCourses] = useState<Record<string, Course>>({});
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EventRow | null>(null);
  const [selectedFailure, setSelectedFailure] = useState<FailureRow | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const [evRes, failRes, courseRes, enrRes] = await Promise.all([
      supabase
        .from("processed_stripe_events")
        .select("event_id,event_type,processed_at,payload")
        .order("processed_at", { ascending: false })
        .limit(500),
      supabase
        .from("stripe_webhook_failures")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase.from("courses").select("id,slug,title"),
      supabase
        .from("enrollments")
        .select("id,user_id,course_id,status,amount_paid_mxn,stripe_session_id,stripe_payment_intent,enrolled_at")
        .order("enrolled_at", { ascending: false })
        .limit(500),
    ]);
    setEvents((evRes.data ?? []) as EventRow[]);
    setFailures((failRes.data ?? []) as FailureRow[]);
    const cmap: Record<string, Course> = {};
    (courseRes.data ?? []).forEach((c: any) => (cmap[c.id] = c));
    setCourses(cmap);
    setEnrollments((enrRes.data ?? []) as Enrollment[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // Realtime: nuevos fallos => alerta en pantalla
    const channel = supabase
      .channel("stripe-failures")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "stripe_webhook_failures" },
        (payload) => {
          const f = payload.new as FailureRow;
          toast.error(`Webhook Stripe falló: ${f.event_type ?? "desconocido"}`, {
            description: f.error_message.slice(0, 140),
          });
          setFailures((prev) => [f, ...prev]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const colorFor = (t: string) =>
    t.includes("completed")
      ? "bg-emerald-600"
      : t.includes("refund") || t.includes("dispute")
        ? "bg-red-600"
        : t.includes("expired")
          ? "bg-amber-600"
          : "bg-slate-600";

  const findEnrollmentForEvent = (ev: EventRow): Enrollment | undefined => {
    const obj = ev.payload ?? {};
    const sessionId = typeof obj.id === "string" && obj.id.startsWith("cs_") ? obj.id : null;
    const pi = typeof obj.payment_intent === "string" ? obj.payment_intent : null;
    const piFromCharge = typeof obj.payment_intent === "string" && obj.object === "charge" ? obj.payment_intent : null;
    return enrollments.find(
      (e) =>
        (sessionId && e.stripe_session_id === sessionId) ||
        ((pi || piFromCharge) && e.stripe_payment_intent === (pi || piFromCharge)),
    );
  };

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((e) => {
      if (typeFilter !== "all" && e.event_type !== typeFilter) return false;
      const enr = findEnrollmentForEvent(e);
      if (statusFilter !== "all" && (!enr || enr.status !== statusFilter)) return false;
      if (courseFilter !== "all" && (!enr || enr.course_id !== courseFilter)) return false;
      if (!q) return true;
      const haystack =
        `${e.event_id} ${e.event_type} ${enr?.id ?? ""} ${enr?.user_id ?? ""} ${enr?.stripe_session_id ?? ""} ${enr?.stripe_payment_intent ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [events, search, typeFilter, statusFilter, courseFilter, enrollments]);

  const filteredFailures = useMemo(() => {
    const q = search.trim().toLowerCase();
    return failures.filter((f) => {
      if (typeFilter !== "all" && f.event_type !== typeFilter) return false;
      if (!q) return true;
      return `${f.event_id ?? ""} ${f.event_type ?? ""} ${f.error_message}`.toLowerCase().includes(q);
    });
  }, [failures, search, typeFilter]);

  const unresolvedCount = failures.filter((f) => !f.resolved).length;

  const markResolved = async (f: FailureRow) => {
    const { error } = await supabase
      .from("stripe_webhook_failures")
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq("id", f.id);
    if (error) return toast.error("No se pudo marcar como resuelto");
    toast.success("Fallo marcado como resuelto");
    setFailures((prev) => prev.map((x) => (x.id === f.id ? { ...x, resolved: true } : x)));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">Centro de eventos Stripe</h1>
            <p className="text-muted-foreground text-sm">
              Idempotencia, búsqueda, alertas y trazabilidad por curso y enrollment
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unresolvedCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" /> {unresolvedCount} fallo(s) sin resolver
              </Badge>
            )}
            <Button onClick={load} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refrescar
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-3">
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Buscar por event id, session, payment intent, user…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger><SelectValue placeholder="Tipo de evento" /></SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>{t === "all" ? "Todos los tipos" : t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger><SelectValue placeholder="Estado enrollment" /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s === "all" ? "Todos los estados" : s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="md:col-span-4"><SelectValue placeholder="Curso" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  {Object.values(courses).map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.title} ({c.slug})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="events">
          <TabsList>
            <TabsTrigger value="events">Eventos procesados ({filteredEvents.length})</TabsTrigger>
            <TabsTrigger value="failures">
              Fallos {unresolvedCount > 0 && <Badge variant="destructive" className="ml-2">{unresolvedCount}</Badge>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>Eventos ({filteredEvents.length})</CardTitle></CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh]">
                  <div className="space-y-2 pr-3">
                    {filteredEvents.map((r) => {
                      const enr = findEnrollmentForEvent(r);
                      const course = enr ? courses[enr.course_id] : undefined;
                      return (
                        <button
                          key={r.event_id}
                          onClick={() => setSelected(r)}
                          className="w-full text-left border rounded-lg p-3 hover:bg-muted/40 transition"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Badge className={`${colorFor(r.event_type)} text-white`}>{r.event_type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(r.processed_at).toLocaleString()}
                            </span>
                          </div>
                          <code className="text-xs text-muted-foreground block truncate">{r.event_id}</code>
                          {enr && (
                            <div className="mt-2 text-xs flex flex-wrap gap-2">
                              {course && <Badge variant="secondary">{course.title}</Badge>}
                              <Badge variant="outline">enrollment: {enr.status}</Badge>
                              {enr.amount_paid_mxn != null && (
                                <Badge variant="outline">${enr.amount_paid_mxn} MXN</Badge>
                              )}
                            </div>
                          )}
                        </button>
                      );
                    })}
                    {filteredEvents.length === 0 && !loading && (
                      <p className="text-muted-foreground text-sm">Sin resultados con los filtros actuales.</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Detalle / Idempotencia</CardTitle></CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh]">
                  {selected ? (
                    <div className="space-y-3 pr-3">
                      <div className="text-xs space-y-1">
                        <div><span className="text-muted-foreground">event_id:</span> <code>{selected.event_id}</code></div>
                        <div><span className="text-muted-foreground">type:</span> {selected.event_type}</div>
                        <div><span className="text-muted-foreground">procesado:</span> {new Date(selected.processed_at).toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-emerald-600">
                          <CheckCircle2 className="w-3 h-3" /> Registrado en processed_stripe_events (idempotente)
                        </div>
                      </div>
                      {(() => {
                        const enr = findEnrollmentForEvent(selected);
                        const course = enr ? courses[enr.course_id] : undefined;
                        if (!enr) return <p className="text-xs text-muted-foreground">Sin enrollment vinculado.</p>;
                        return (
                          <div className="border rounded-lg p-3 text-xs space-y-1 bg-muted/30">
                            <div className="font-medium">Enrollment vinculado</div>
                            {course && <div>Curso: <strong>{course.title}</strong> ({course.slug})</div>}
                            <div>user_id: <code>{enr.user_id}</code></div>
                            <div>status: <Badge variant="outline">{enr.status}</Badge></div>
                            <div>monto: ${enr.amount_paid_mxn ?? 0} MXN</div>
                          </div>
                        );
                      })()}
                      <pre className="text-xs bg-muted/40 p-3 rounded-lg overflow-auto">
{JSON.stringify(selected.payload, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Selecciona un evento para ver detalle.</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failures" className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Fallos de webhook ({filteredFailures.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh]">
                  <div className="space-y-2 pr-3">
                    {filteredFailures.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFailure(f)}
                        className={`w-full text-left border rounded-lg p-3 hover:bg-muted/40 transition ${f.resolved ? "opacity-60" : "border-destructive/40"}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant={f.resolved ? "secondary" : "destructive"}>
                            {f.resolved ? "Resuelto" : "Pendiente"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(f.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs font-medium">{f.event_type ?? "—"}</div>
                        <p className="text-xs text-muted-foreground truncate mt-1">{f.error_message}</p>
                      </button>
                    ))}
                    {filteredFailures.length === 0 && !loading && (
                      <p className="text-muted-foreground text-sm">Sin fallos registrados. 🎉</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Detalle del fallo</CardTitle></CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh]">
                  {selectedFailure ? (
                    <div className="space-y-3 pr-3">
                      <div className="text-xs space-y-1">
                        <div><span className="text-muted-foreground">event_id:</span> <code>{selectedFailure.event_id ?? "—"}</code></div>
                        <div><span className="text-muted-foreground">type:</span> {selectedFailure.event_type ?? "—"}</div>
                        <div><span className="text-muted-foreground">retry_count:</span> {selectedFailure.retry_count}</div>
                      </div>
                      <div className="border-l-4 border-destructive bg-destructive/10 p-3 rounded text-xs">
                        <div className="font-medium mb-1">Error</div>
                        {selectedFailure.error_message}
                      </div>
                      {!selectedFailure.resolved && (
                        <Button size="sm" onClick={() => markResolved(selectedFailure)}>
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Marcar como resuelto
                        </Button>
                      )}
                      <pre className="text-xs bg-muted/40 p-3 rounded-lg overflow-auto">
{JSON.stringify(selectedFailure.payload, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Selecciona un fallo para ver detalle.</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
