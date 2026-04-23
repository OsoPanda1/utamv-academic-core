import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import EliteBackground from "@/components/EliteBackground";
import {
  ArrowLeft, RefreshCcw, CheckCircle2, AlertTriangle, Loader2,
  ShieldCheck, ShieldAlert, Mic, Play, Volume2,
} from "lucide-react";

interface LessonWithJob {
  id: string;
  title: string;
  order_index: number;
  audio_url: string | null;
  module_id: string;
  job?: {
    status: "pending" | "processing" | "success" | "failed" | "fallback";
    provider: string | null;
    error_message: string | null;
    attempts: number;
    duration_ms: number | null;
    audio_url: string | null;
    updated_at: string;
  };
}

interface PermissionCheck {
  ok: boolean;
  hasTextToSpeech: boolean;
  error?: string;
  status?: number;
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  processing: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  fallback: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  failed: "bg-rose-500/15 text-rose-300 border-rose-500/30",
};

export default function TTSAdmin() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [lessons, setLessons] = useState<LessonWithJob[]>([]);
  const [permissions, setPermissions] = useState<PermissionCheck | null>(null);
  const [checkingPerms, setCheckingPerms] = useState(false);
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth + admin gate
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => {
      setIsAdmin(!!data);
    });
  }, [user]);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { data: course } = await supabase.from("courses").select("id")
      .eq("slug", "diplomado-ecosistemas-digitales").maybeSingle();
    if (!course) { setLoading(false); return; }

    const [{ data: lessonsData }, { data: jobsData }] = await Promise.all([
      supabase.from("lessons")
        .select("id,title,order_index,audio_url,module_id")
        .eq("course_id", course.id).order("order_index"),
      supabase.from("tts_jobs").select("*"),
    ]);

    const jobsMap = new Map((jobsData || []).map((j: any) => [j.lesson_id, j]));
    const merged: LessonWithJob[] = (lessonsData || []).map((l: any) => ({
      ...l,
      job: jobsMap.get(l.id),
    }));
    setLessons(merged);
    setLoading(false);
  }, []);

  useEffect(() => { if (isAdmin) loadData(); }, [isAdmin, loadData]);

  // Realtime updates
  useEffect(() => {
    if (!isAdmin) return;
    const ch = supabase.channel("tts_jobs_admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "tts_jobs" }, () => loadData())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [isAdmin, loadData]);

  const checkPermissions = async () => {
    setCheckingPerms(true);
    setPermissions(null);
    try {
      const { data, error } = await supabase.functions.invoke("check-elevenlabs-permissions");
      if (error) throw error;
      setPermissions(data as PermissionCheck);
      if (data?.hasTextToSpeech) {
        toast.success("✓ ElevenLabs habilitado para Text to Speech");
      } else {
        toast.warning("ElevenLabs sin permiso TTS — se usará fallback Lovable AI");
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCheckingPerms(false);
    }
  };

  const runBatch = async (target: "all" | "pending" | "failed") => {
    if (running) return;
    setRunning(true);
    try {
      let lessonIds: string[] | undefined;
      if (target === "pending") {
        lessonIds = lessons.filter((l) => !l.job || l.job.status === "pending").map((l) => l.id);
      } else if (target === "failed") {
        lessonIds = lessons.filter((l) => l.job?.status === "failed").map((l) => l.id);
      }

      if (lessonIds && lessonIds.length === 0) {
        toast.info("No hay lecciones para procesar en esa categoría");
        setRunning(false);
        return;
      }

      const payload = lessonIds
        ? { lessonIds }
        : { batchAll: true, courseSlug: "diplomado-ecosistemas-digitales" };

      toast.info(`Iniciando batch (${lessonIds?.length ?? 40} lecciones)…`);
      const { data, error } = await supabase.functions.invoke("generate-lesson-narration", {
        body: payload,
      });
      if (error) throw error;

      const s = (data as { summary?: { success: number; fallback: number; failed: number; total: number } })?.summary;
      if (s) {
        toast.success(`Batch completado · ✓${s.success} ↻${s.fallback} ✗${s.failed} (${s.total})`);
      }
      await loadData();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setRunning(false);
    }
  };

  const retryLesson = async (lessonId: string) => {
    try {
      toast.info("Reintentando…");
      const { data, error } = await supabase.functions.invoke("generate-lesson-narration", {
        body: { lessonId },
      });
      if (error) throw error;
      const r = (data as { results?: Array<{ status: string }> })?.results?.[0];
      toast.success(`Lección procesada: ${r?.status ?? "ok"}`);
      await loadData();
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const stats = {
    total: lessons.length,
    success: lessons.filter((l) => l.job?.status === "success").length,
    fallback: lessons.filter((l) => l.job?.status === "fallback").length,
    failed: lessons.filter((l) => l.job?.status === "failed").length,
    pending: lessons.filter((l) => !l.job || l.job.status === "pending").length,
    processing: lessons.filter((l) => l.job?.status === "processing").length,
    withAudio: lessons.filter((l) => !!l.audio_url).length,
  };
  const completePct = stats.total > 0 ? Math.round(((stats.success + stats.fallback) / stats.total) * 100) : 0;

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-platinum" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader><CardTitle>Acceso restringido</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="font-ui text-sm text-muted-foreground">Solo administradores pueden ver este panel.</p>
            <Link to="/campus"><Button>Volver al campus</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(222_38%_4%)]">
      <EliteBackground variant="petrol" />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin/telemetria-isabella" className="flex items-center gap-2 text-platinum-dim hover:text-platinum text-sm font-ui">
            <ArrowLeft size={16} /> Telemetría Isabella
          </Link>
          <Badge variant="outline" className="border-platinum/30 text-platinum gap-1.5">
            <Mic size={12} /> TTS Studio
          </Badge>
        </div>

        <div className="text-center mb-8 space-y-2">
          <h1 className="font-display text-4xl text-platinum">Narración automática</h1>
          <p className="font-ui text-sm text-platinum-dim max-w-2xl mx-auto">
            Genera, monitorea y reintenta los audios narrados de las 40 lecciones del Diplomado.
            Si ElevenLabs falla por permisos, el sistema usa Lovable AI Gateway como fallback.
          </p>
        </div>

        {/* Permission check */}
        <Card className="mb-6 bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-platinum text-base flex items-center gap-2">
              <ShieldCheck size={16} /> Verificación previa de proveedores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Button onClick={checkPermissions} disabled={checkingPerms} size="sm" variant="outline">
                {checkingPerms ? <Loader2 size={14} className="animate-spin mr-2" /> : <ShieldCheck size={14} className="mr-2" />}
                Verificar ElevenLabs
              </Button>
              {permissions && (
                <Badge className={permissions.hasTextToSpeech ? STATUS_COLOR.success : STATUS_COLOR.failed}>
                  {permissions.hasTextToSpeech ? "✓ Text to Speech activo" : "✗ Sin permiso TTS"}
                </Badge>
              )}
              <Badge className={STATUS_COLOR.success + " gap-1"}>
                <CheckCircle2 size={10} /> Lovable AI fallback listo
              </Badge>
            </div>
            {permissions && !permissions.hasTextToSpeech && permissions.error && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 flex gap-2">
                <ShieldAlert size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 min-w-0">
                  <p className="font-ui text-xs font-semibold text-rose-300">Detalle ElevenLabs</p>
                  <p className="font-ui text-[11px] text-rose-200/80 break-words">{permissions.error}</p>
                  <p className="font-ui text-[11px] text-platinum-dim">
                    💡 Activa el scope <strong>text_to_speech</strong> en{" "}
                    <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noreferrer" className="underline">
                      elevenlabs.io/app/settings/api-keys
                    </a>. Mientras tanto el sistema usará el fallback de Lovable AI.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats + actions */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Con audio" value={stats.withAudio} accent="emerald" />
          <StatCard label="Éxito" value={stats.success} accent="emerald" />
          <StatCard label="Fallback" value={stats.fallback} accent="cyan" />
          <StatCard label="Fallidas" value={stats.failed} accent="rose" />
          <StatCard label="Pendientes" value={stats.pending} accent="amber" />
        </div>

        <Card className="mb-6 bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-ui text-platinum-dim">
                <span>Cobertura narración</span>
                <span>{completePct}%</span>
              </div>
              <Progress value={completePct} className="h-2" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => runBatch("all")} disabled={running} size="sm">
                {running ? <Loader2 size={14} className="animate-spin mr-2" /> : <Mic size={14} className="mr-2" />}
                Generar todas (40)
              </Button>
              <Button onClick={() => runBatch("pending")} disabled={running || stats.pending === 0} size="sm" variant="outline">
                <RefreshCcw size={14} className="mr-2" />
                Procesar pendientes ({stats.pending})
              </Button>
              <Button onClick={() => runBatch("failed")} disabled={running || stats.failed === 0} size="sm" variant="outline">
                <AlertTriangle size={14} className="mr-2" />
                Reintentar fallidas ({stats.failed})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lessons table */}
        <Card className="bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10">
          <CardHeader>
            <CardTitle className="font-display text-platinum text-base">Estado por lección</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <p className="p-6 text-center text-platinum-dim text-sm">Cargando…</p>
            ) : (
              <div className="divide-y divide-platinum/5">
                {lessons.map((l) => {
                  const status = l.job?.status ?? "pending";
                  return (
                    <div key={l.id} className="px-4 py-3 flex items-center gap-3 hover:bg-platinum/[0.03]">
                      <span className="font-ui text-[10px] text-platinum-dim tabular-nums w-8 text-right">
                        {l.order_index}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-ui text-xs text-foreground truncate">{l.title}</p>
                        {l.job?.error_message && status === "failed" && (
                          <p className="font-ui text-[10px] text-rose-400/80 truncate">
                            {l.job.error_message}
                          </p>
                        )}
                        {l.job?.provider && (
                          <p className="font-ui text-[10px] text-platinum-dim">
                            via {l.job.provider}
                            {l.job.duration_ms ? ` · ${(l.job.duration_ms / 1000).toFixed(1)}s` : ""}
                          </p>
                        )}
                      </div>
                      {l.audio_url && (
                        <a href={l.audio_url} target="_blank" rel="noreferrer" className="text-platinum-dim hover:text-platinum">
                          <Play size={14} />
                        </a>
                      )}
                      <Badge variant="outline" className={`${STATUS_COLOR[status]} text-[10px] uppercase tracking-wider`}>
                        {status === "processing" && <Loader2 size={10} className="animate-spin mr-1" />}
                        {status === "success" && <CheckCircle2 size={10} className="mr-1" />}
                        {status === "fallback" && <Volume2 size={10} className="mr-1" />}
                        {status === "failed" && <AlertTriangle size={10} className="mr-1" />}
                        {status}
                      </Badge>
                      <Button size="icon" variant="ghost" onClick={() => retryLesson(l.id)} className="h-7 w-7">
                        <RefreshCcw size={12} />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: "emerald" | "rose" | "amber" | "cyan" }) {
  const accentClass = accent === "emerald" ? "text-emerald-400" :
    accent === "rose" ? "text-rose-400" :
    accent === "amber" ? "text-amber-400" :
    accent === "cyan" ? "text-cyan-400" : "text-platinum";
  return (
    <Card className="bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10">
      <CardContent className="p-3 text-center">
        <p className={`font-display text-2xl ${accentClass}`}>{value}</p>
        <p className="font-ui text-[10px] uppercase tracking-wider text-platinum-dim">{label}</p>
      </CardContent>
    </Card>
  );
}
