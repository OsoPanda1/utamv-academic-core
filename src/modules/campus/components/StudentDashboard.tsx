import { useCoursesFromDb } from "@/modules/campus/useCoursesFromDb";
import { useStudentProgress } from "@/modules/campus/hooks/useStudentProgress";
import { useAuthSession } from "@/modules/identity/useAuthSession";
import { TelemetryConsole } from "@/modules/telemetry/components/TelemetryConsole";
import { CampusMediaShowcase } from "./CampusMediaShowcase";

export function StudentDashboard() {
  const { user } = useAuthSession();
  const { courses } = useCoursesFromDb();
  const { data: progress } = useStudentProgress({ userId: user?.id ?? "anon" });
  const totalCourses = courses.length;
  const completedCourses = progress?.filter((p) => p.completedPercentage >= 90).length ?? 0;
  const totalHours = courses.reduce((acc, c) => acc + (c.estimatedHours ?? 0), 0);
  const avgProgress = progress && progress.length ? Math.round(progress.reduce((ac, p) => ac + p.completedPercentage, 0) / progress.length) : 0;

  return <div className="space-y-6">
    <section className="rounded-2xl border border-ut-border/40 bg-black/30 p-4 md:p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">Panel de estudiante</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-50 md:text-xl">Hola {user?.displayName ?? "estudiante"}, este es tu estado actual en UTAMV.</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <DashboardStat label="Cursos activos" value={totalCourses} hint={`${completedCourses} completados`} />
        <DashboardStat label="Horas estimadas de estudio" value={totalHours} hint="Total en tu catálogo UTAMV" />
        <DashboardStat label="Progreso promedio" value={avgProgress} suffix="%" hint="Sobre tus cursos actuales" />
      </div>
    </section>
    <section className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
      <div className="rounded-2xl border border-ut-border/40 bg-black/30 p-4 md:p-5"><p className="text-xs font-medium text-slate-300">Próximas acciones</p></div>
      <TelemetryConsole />
    </section>
    <CampusMediaShowcase />
  </div>;
}

function DashboardStat({ label, value, suffix, hint }: {label:string;value:number;suffix?:string;hint?:string}) {
  return <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-3"><p className="text-[11px] text-slate-400">{label}</p><p className="mt-1 text-xl font-semibold text-slate-50">{value}{suffix && <span className="ml-1 text-sm text-slate-300">{suffix}</span>}</p>{hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}</div>;
}
