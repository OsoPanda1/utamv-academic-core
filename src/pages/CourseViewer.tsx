import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { COURSES, type Course, type Lesson } from "@/data/coursesData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MediaPlayer } from "@/components/MediaPlayer";
import { toast } from "sonner";
import {
  ArrowLeft, CheckCircle2, Circle, Lock, FileText,
  Headphones, Video, ListChecks, Download, Award, ChevronRight, ChevronLeft, BookOpen, Clock, GraduationCap,
} from "lucide-react";
import { resolveCourseCover } from "@/lib/courseCovers";

interface DbLessonMedia {
  lesson_id?: string;
  title?: string;
  video_url: string | null;
  audio_url: string | null;
  transcript: string | null;
  is_locked?: boolean;
}

interface LessonProgressRow {
  lesson_id: string;
  completed: boolean;
  progress_percent: number;
  last_position_seconds: number;
}

export default function CourseViewer() {
  const { slug } = useParams<{ slug: string }>();
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const localCourse: Course | undefined = useMemo(
    () => COURSES.find((c) => c.slug === slug),
    [slug],
  );

  const [dbCourseFallback, setDbCourseFallback] = useState<Course | null>(null);

  // Si no hay curso local, intentar cargar curso completo desde BD
  useEffect(() => {
    if (localCourse || !slug) return;
    (async () => {
      const { data: dbC } = await supabase
        .from("courses").select("id,slug,title,subtitle,description,level,category,hours,price_mxn,price_usd,instructor_name,instructor_bio,learning_outcomes,prerequisites").eq("slug", slug).maybeSingle();
      if (!dbC) return;
      const { data: mods } = await supabase
        .from("course_modules").select("id,title,description,order_index,is_free_preview").eq("course_id", dbC.id).order("order_index");
      const { data: lessons } = await supabase
        .from("lessons").select("id,module_id,title,type,content,duration_minutes,order_index,is_free_preview,video_url,audio_url,transcript").eq("course_id", dbC.id).order("order_index");
      const builtMods = (mods || []).map((m) => ({
        id: m.id, title: m.title, description: m.description || "",
        learningObjectives: [], isFreePreview: m.is_free_preview,
        lessons: (lessons || []).filter((l) => l.module_id === m.id).map((l) => ({
          id: l.id, title: l.title,
          type: (["video","audio","text","quiz","exercise","live"].includes(l.type) ? l.type : "text") as Lesson["type"],
          duration: l.duration_minutes || 12,
          isFreePreview: l.is_free_preview, content: l.content || "",
        })),
      }));
      setDbCourseFallback({
        id: dbC.id, slug: dbC.slug, title: dbC.title,
        subtitle: dbC.subtitle || "", description: dbC.description || "",
        level: (dbC.level as Course["level"]) || "Diplomado", category: dbC.category || "",
        hours: dbC.hours || 0, priceMXN: Number(dbC.price_mxn) || 0, priceUSD: Number(dbC.price_usd) || 0,
        stripePriceId: "", instructorName: dbC.instructor_name || "UTAMV",
        instructorTitle: "", instructorBio: dbC.instructor_bio || "", thumbnail: "",
        isFeatured: true,
        learningOutcomes: (dbC.learning_outcomes as string[]) || [],
        prerequisites: (dbC.prerequisites as string[]) || [],
        modules: builtMods, quizzes: [],
        obeFramework: { competencies: [], evidences: [], rubrics: [] },
      });
    })();
  }, [slug, localCourse]);

  const course: Course | undefined = localCourse || dbCourseFallback || undefined;

  const allLessons: Lesson[] = useMemo(
    () => (course?.modules || []).flatMap((m) => m.lessons),
    [course],
  );

  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [progress, setProgress] = useState<Record<string, LessonProgressRow>>({});
  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || "");
  const [activeMedia, setActiveMedia] = useState<DbLessonMedia | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingCert, setGeneratingCert] = useState(false);

  // Auth gate
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth/login");
  }, [user, authLoading, navigate]);

  // Load enrollment + progress
  useEffect(() => {
    const load = async () => {
      if (!user || !course) return;
      setLoading(true);

      // Buscar curso en DB por slug
      const { data: dbCourse } = await supabase
        .from("courses").select("id").eq("slug", course.slug).maybeSingle();

      if (dbCourse) {
        const { data: enr } = await supabase
          .from("enrollments")
          .select("id, status")
          .eq("user_id", user.id)
          .eq("course_id", dbCourse.id)
          .eq("status", "active")
          .maybeSingle();
        setEnrolled(!!enr);

        const { data: prog } = await supabase
          .from("lesson_progress")
          .select("lesson_id, completed, progress_percent, last_position_seconds")
          .eq("user_id", user.id)
          .eq("course_id", dbCourse.id);

        if (prog) {
          const map: Record<string, LessonProgressRow> = {};
          prog.forEach((p) => { map[p.lesson_id] = p as LessonProgressRow; });
          setProgress(map);
        }
      }
      setLoading(false);
    };
    load();
  }, [user, course]);

  // Cargar media (video/audio/transcript) de la lección activa desde DB
  useEffect(() => {
    const loadMedia = async () => {
      if (!course || !activeLessonId) { setActiveMedia(null); return; }
      const lessonTitle = allLessons.find((l) => l.id === activeLessonId)?.title;
      if (!lessonTitle) { setActiveMedia(null); return; }
      const { data: dbCourse } = await supabase
        .from("courses").select("id").eq("slug", course.slug).maybeSingle();
      if (!dbCourse) { setActiveMedia(null); return; }
      const { data, error } = await supabase
        .from("lessons")
        .select("id,title,video_url,audio_url,transcript")
        .eq("course_id", dbCourse.id)
        .eq("title", lessonTitle)
        .maybeSingle();

      if (error) {
        console.warn("lesson media lookup:", error.message);
        setActiveMedia(null);
        return;
      }

      setActiveMedia(data ? {
        lesson_id: data.id,
        title: data.title,
        video_url: data.video_url,
        audio_url: data.audio_url,
        transcript: data.transcript,
      } : null);
    };
    loadMedia();
  }, [activeLessonId, course, allLessons]);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardHeader><CardTitle>Curso no encontrado</CardTitle></CardHeader>
          <CardContent>
            <Link to="/campus"><Button>Volver al campus</Button></Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const isLessonLocked = (lesson: Lesson | undefined): boolean => {
    if (!lesson || enrolled) return false;
    const parentModule = course.modules.find((m) => m.lessons.some((candidate) => candidate.id === lesson.id));
    return !lesson.isFreePreview && !parentModule?.isFreePreview;
  };
  const activeLessonLocked = (activeMedia?.is_locked ?? false) || isLessonLocked(activeLesson);
  const completedCount = Object.values(progress).filter((p) => p.completed).length;
  const totalLessons = allLessons.length;
  const overallPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const allCompleted = completedCount === totalLessons && totalLessons > 0;

  const markComplete = async (lessonId: string) => {
    if (!user) return;
    const targetLesson = allLessons.find((lesson) => lesson.id === lessonId);
    if (isLessonLocked(targetLesson)) {
      toast.error("Necesitas inscripción activa para completar esta lección.");
      return;
    }
    const { data: dbCourse } = await supabase
      .from("courses").select("id").eq("slug", course.slug).maybeSingle();
    if (!dbCourse) {
      // fallback local-only
      setProgress((p) => ({
        ...p,
        [lessonId]: { lesson_id: lessonId, completed: true, progress_percent: 100, last_position_seconds: 0 },
      }));
      toast.success("Lección marcada como completada");
      return;
    }

    // upsert sintético: el lesson_id de coursesData no existe en DB lessons,
    // por lo que usamos un UUID determinístico derivado del slug
    const lessonUuid = await stableUuidFromString(`${course.slug}:${lessonId}`);

    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        course_id: dbCourse.id,
        lesson_id: lessonUuid,
        completed: true,
        progress_percent: 100,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,lesson_id" as any },
    );

    if (error) {
      // si la tabla exige FK lesson_id existente, guardamos en estado local
      console.warn("lesson_progress upsert:", error.message);
    }

    setProgress((p) => ({
      ...p,
      [lessonId]: { lesson_id: lessonId, completed: true, progress_percent: 100, last_position_seconds: 0 },
    }));
    toast.success("✓ Lección completada");

    // Otorgar insignia "first_step" en la primera lección completada
    const wasFirst = Object.values(progress).filter((p) => p.completed).length === 0;
    if (wasFirst) {
      const { data: badgeRes } = await supabase.rpc("grant_badge", {
        _user_id: user.id, _badge_code: "first_step",
      });
      if (badgeRes && (badgeRes as { ok?: boolean; already?: boolean }).ok && !(badgeRes as { already?: boolean }).already) {
        toast.success("🏆 Insignia desbloqueada: Primer Paso (+10 tokens)");
      }
    }

    // Otorgar "diplomado_champion" si completó todo
    const newCompleted = Object.values(progress).filter((p) => p.completed).length + 1;
    if (newCompleted === totalLessons && totalLessons > 0 && course.slug === "diplomado-ecosistemas-digitales") {
      const { data: champRes } = await supabase.rpc("grant_badge", {
        _user_id: user.id, _badge_code: "diplomado_champion",
      });
      if (champRes && (champRes as { ok?: boolean; already?: boolean }).ok && !(champRes as { already?: boolean }).already) {
        toast.success("🏆 ¡Diplomado completado! +200 tokens UTAMV");
      }
    }
  };

  const handleGenerateCertificate = async () => {
    if (!user) return;
    setGeneratingCert(true);
    try {
      const { data: dbCourse } = await supabase
        .from("courses").select("id").eq("slug", course.slug).maybeSingle();
      if (!dbCourse) {
        toast.error("Curso no disponible para certificación.");
        return;
      }
      const { data, error } = await supabase.functions.invoke("generate-certificate", {
        body: { courseId: dbCourse.id, finalScore: 100 },
      });
      if (error) throw error;
      if (data?.certificate?.pdf_url) {
        toast.success("🎓 Certificado emitido en BlockUTAMV");
        window.open(data.certificate.pdf_url, "_blank");
      }
    } catch (e) {
      toast.error((e as Error).message || "No se pudo generar el certificado.");
    } finally {
      setGeneratingCert(false);
    }
  };

  const lessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video": return <Video size={14} />;
      case "audio": return <Headphones size={14} />;
      case "quiz": return <ListChecks size={14} />;
      case "exercise": return <BookOpen size={14} />;
      default: return <FileText size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[hsl(222_38%_4%)] border-b border-[hsl(var(--platinum)/0.08)]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/campus" className="flex items-center gap-2 text-platinum-dim hover:text-platinum text-sm font-ui">
            <ArrowLeft size={16} /> Campus
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-platinum text-sm md:text-base truncate">{course.title}</h1>
            <p className="font-ui text-[10px] text-platinum-dim truncate">{course.subtitle}</p>
          </div>
          <div className="hidden md:flex items-center gap-3 min-w-[180px]">
            <Progress value={overallPct} className="h-1.5" />
            <span className="font-ui text-[11px] text-platinum-dim whitespace-nowrap">{overallPct}%</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Main content */}
        <main className="space-y-5">
          {!enrolled && !loading && (
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-4 flex items-center gap-3">
                <Lock size={18} className="text-amber-500" />
                <div className="flex-1">
                  <p className="font-ui text-sm font-semibold text-foreground">Acceso de vista previa</p>
                  <p className="font-ui text-xs text-muted-foreground">
                    Inscríbete para acceder a todas las lecciones y obtener tu certificado.
                  </p>
                </div>
                <Link to="/campus"><Button size="sm">Inscribirse</Button></Link>
              </CardContent>
            </Card>
          )}

          {/* Lesson player */}
          <Card className="overflow-hidden bg-[hsl(222_38%_5%)] border-[hsl(var(--platinum)/0.08)]">
            <div className="p-4">
              <MediaPlayer
                videoUrl={activeMedia?.video_url}
                audioUrl={activeMedia?.audio_url}
                transcript={activeMedia?.transcript || activeLesson?.content}
                title={activeLesson?.title}
                watermarkText={`${profile?.display_name || user?.email || "UTAMV"} · ${new Date().toISOString().slice(0, 16).replace("T", " ")}`}
                onComplete={() => {
                  if (activeLessonLocked) return;
                  if (!progress[activeLessonId]?.completed) markComplete(activeLessonId);
                }}
              />
            </div>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">
                    {activeLesson?.type}
                  </Badge>
                  <h2 className="font-display text-xl text-platinum">{activeLesson?.title}</h2>
                </div>
                {activeLessonLocked ? (
                  <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 gap-1">
                    <Lock size={12} /> Vista previa
                  </Badge>
                ) : progress[activeLessonId]?.completed ? (
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 gap-1">
                    <CheckCircle2 size={12} /> Completada
                  </Badge>
                ) : (
                  <Button size="sm" disabled={activeLessonLocked} onClick={() => markComplete(activeLessonId)}>
                    Marcar como completada
                  </Button>
                )}
              </div>

              {activeLesson?.content && (
                <div className="prose prose-invert prose-sm max-w-none font-ui text-sm text-foreground/90 whitespace-pre-line">
                  {activeLesson.content}
                </div>
              )}

              {activeLesson?.resources && activeLesson.resources.length > 0 && (
                <div className="pt-3 border-t border-platinum/10">
                  <p className="font-ui text-xs uppercase tracking-wider text-platinum-dim mb-2">Recursos</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {activeLesson.resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg border border-platinum/10 hover:border-platinum/30 transition-colors text-xs font-ui"
                      >
                        <Download size={14} className="text-platinum-dim" />
                        <span className="flex-1 truncate">{r.name}</span>
                        <Badge variant="secondary" className="text-[9px]">{r.type}</Badge>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiz interactivo */}
          {course.quizzes && course.quizzes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <ListChecks size={18} /> Quizzes interactivos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {course.quizzes.map((q) => (
                  <QuizBlock key={q.id} quiz={q} />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Certificación */}
          <Card className="bg-gradient-to-br from-[hsl(222_38%_6%)] to-[hsl(222_38%_3%)] border-platinum/20">
            <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4">
              <Award size={40} className="text-platinum" />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-display text-platinum text-lg">Certificado BlockUTAMV</h3>
                <p className="font-ui text-xs text-platinum-dim">
                  Al completar el 100% del programa recibes tu certificado PDF con código QR y hash en la cadena BlockUTAMV.
                </p>
              </div>
              <Button
                disabled={!allCompleted || generatingCert || !enrolled}
                onClick={handleGenerateCertificate}
              >
                {generatingCert ? "Generando…" : allCompleted ? "Emitir certificado" : `Completa ${totalLessons - completedCount} más`}
              </Button>
            </CardContent>
          </Card>
        </main>

        {/* Sidebar de módulos */}
        <aside className="lg:sticky lg:top-20 lg:self-start space-y-3 lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto pr-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-ui text-xs uppercase tracking-[0.18em] text-platinum-dim">
                Plan de estudios
              </CardTitle>
              <Progress value={overallPct} className="h-1 mt-2" />
              <p className="font-ui text-[10px] text-platinum-dim mt-1">
                {completedCount} / {totalLessons} lecciones · {course.hours}h
              </p>
            </CardHeader>
            <CardContent className="space-y-3 px-3">
              {course.modules.map((mod, mi) => (
                <div key={mod.id}>
                  <div className="px-2 py-1.5">
                    <p className="font-ui text-[10px] uppercase tracking-wider text-platinum-dim">
                      Módulo {mi + 1}
                    </p>
                    <p className="font-display text-sm text-platinum">{mod.title}</p>
                  </div>
                  <div className="space-y-0.5">
                    {mod.lessons.map((l) => {
                      const done = progress[l.id]?.completed;
                      const active = activeLessonId === l.id;
                      const locked = !enrolled && !l.isFreePreview && !mod.isFreePreview;
                      return (
                        <button
                          key={l.id}
                          disabled={locked}
                          onClick={() => setActiveLessonId(l.id)}
                          className={`w-full flex items-start gap-2 px-2 py-2 rounded-lg text-left text-xs font-ui transition-colors
                            ${active ? "bg-platinum/10 border border-platinum/20" : "hover:bg-platinum/5"}
                            ${locked ? "opacity-40 cursor-not-allowed" : ""}`}
                        >
                          <div className="mt-0.5">
                            {locked ? <Lock size={12} /> : done ? (
                              <CheckCircle2 size={14} className="text-emerald-400" />
                            ) : (
                              <Circle size={14} className="text-platinum-dim" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              {lessonIcon(l.type)}
                              <span className={`truncate ${active ? "text-platinum font-semibold" : "text-foreground"}`}>
                                {l.title}
                              </span>
                            </div>
                            <p className="text-[10px] text-platinum-dim mt-0.5">{l.duration} min</p>
                          </div>
                          {active && <ChevronRight size={12} className="text-platinum mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

// Quiz component
function QuizBlock({ quiz }: { quiz: Course["quizzes"][number] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = quiz.questions.filter((q) => answers[q.id] === q.correct).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;

  return (
    <div className="border border-platinum/10 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-platinum text-sm">{quiz.title}</h4>
        {submitted && (
          <Badge className={passed ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-rose-500/15 text-rose-400 border-rose-500/30"}>
            {score}% · {passed ? "Aprobado" : "No aprobado"}
          </Badge>
        )}
      </div>
      <div className="space-y-4">
        {quiz.questions.map((q, qi) => (
          <div key={q.id} className="space-y-2">
            <p className="font-ui text-sm text-foreground">{qi + 1}. {q.question}</p>
            <div className="space-y-1.5">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi;
                const isCorrect = submitted && oi === q.correct;
                const isWrong = submitted && selected && oi !== q.correct;
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-ui border transition-colors
                      ${selected && !submitted ? "border-platinum/40 bg-platinum/10" : "border-platinum/10 hover:border-platinum/20"}
                      ${isCorrect ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" : ""}
                      ${isWrong ? "border-rose-500/40 bg-rose-500/10 text-rose-300" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="text-[11px] text-platinum-dim italic">→ {q.explanation}</p>
            )}
          </div>
        ))}
      </div>
      {!submitted ? (
        <Button
          size="sm"
          disabled={Object.keys(answers).length !== quiz.questions.length}
          onClick={() => setSubmitted(true)}
        >
          Calificar
        </Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); }}>
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
}

// UUID estable a partir de string (para mapear lesson_id local → UUID coherente)
async function stableUuidFromString(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const hex = Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}
