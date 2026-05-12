import { useEffect, type ReactNode } from "react";
import { useAuthSession } from "@/modules/identity/useAuthSession";
import { logTelemetryEvent } from "@/modules/telemetry";
import { useCoursesFromDb } from "../useCoursesFromDb";
import { CampusCourseLibrary } from "./CampusCourseLibrary";
import { StudentDashboard } from "./StudentDashboard";
import { UtamvAppShell } from "@/components/layout/UtamvAppShell";

interface CampusLayoutProps {
  initialSection?: "home" | "courses" | "course-detail";
  children?: ReactNode;
}

export function CampusLayout({ initialSection = "home", children }: CampusLayoutProps) {
  const { user } = useAuthSession();
  const { courses, isLoading: isLoadingCourses, error: coursesError } = useCoursesFromDb();

  useEffect(() => {
    void logTelemetryEvent({ eventType: "campus.visit", userId: user?.id, metadata: { section: initialSection } });
  }, [initialSection, user?.id]);

  return (
    <UtamvAppShell title="Campus UTAMV" subtitle="Rutas formativas y progreso académico">
      {children ?? (initialSection === "courses" ? (
        <section>
          <h1 className="text-2xl font-semibold">Catálogo UTAMV</h1>
          {isLoadingCourses && <p className="mt-4 text-sm text-muted-foreground">Cargando cursos…</p>}
          {coursesError && <p className="mt-4 text-sm text-destructive">No se pudo cargar el catálogo de cursos.</p>}
          {!isLoadingCourses && !coursesError && <div className="mt-4"><CampusCourseLibrary courses={courses} /></div>}
        </section>
      ) : <StudentDashboard />)}
    </UtamvAppShell>
  );
}
