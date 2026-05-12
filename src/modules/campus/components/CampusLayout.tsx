import type { ReactNode } from "react";
import { useStudentProgress } from "../hooks/useStudentProgress";

interface CampusLayoutProps {
  initialSection?: "home" | "courses" | "course-detail";
  children?: ReactNode;
}

export function CampusLayout({ initialSection = "home", children }: CampusLayoutProps) {
  const { data: progress, isLoading } = useStudentProgress({ userId: "placeholder" });

  return (
    <div className="flex min-h-screen bg-background text-foreground" data-section={initialSection}>
      <main className="flex-1 px-4 py-6 md:px-8">
        {children ?? (
          <section>
            <h1 className="text-2xl font-semibold">UTAMV Campus Online</h1>
            {isLoading && <p className="mt-4 text-sm text-muted-foreground">Cargando progreso…</p>}
            {!isLoading && progress && progress.length === 0 && (
              <p className="mt-4 text-sm text-muted-foreground">Aún no tienes cursos activos. Explora el catálogo.</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
