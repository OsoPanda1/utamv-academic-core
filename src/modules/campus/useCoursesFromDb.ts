import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CourseDefinition, CourseLevel, CourseProject, CourseSection } from "./courseModel";

interface UseCoursesResult {
  courses: CourseDefinition[];
  isLoading: boolean;
  error: Error | null;
}

export function useCoursesFromDb(): UseCoursesResult {
  const [courses, setCourses] = useState<CourseDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const { data: courseRows, error: courseError } = await supabase.from("courses").select("*").order("title", { ascending: true });
        if (courseError) throw courseError;
        const { data: sectionRows, error: sectionError } = await supabase.from("course_sections").select("*").order("order", { ascending: true });
        if (sectionError) throw sectionError;
        const { data: projectRows, error: projectError } = await supabase.from("course_projects").select("*");
        if (projectError) throw projectError;
        if (!isMounted) return;

        const sectionsByCourse = new Map<string, CourseSection[]>();
        for (const row of sectionRows ?? []) {
          const list = sectionsByCourse.get(row.course_id) ?? [];
          list.push({ id: row.id, title: row.title, order: row.order, kind: row.kind, slug: row.slug });
          sectionsByCourse.set(row.course_id, list);
        }

        const projectsByCourse = new Map<string, CourseProject[]>();
        for (const row of projectRows ?? []) {
          const list = projectsByCourse.get(row.course_id) ?? [];
          list.push({
            id: row.id,
            title: row.title,
            repoUrl: row.repo_url,
            description: row.description,
            technologies: row.technologies ?? [],
            difficulty: row.difficulty as CourseLevel,
          });
          projectsByCourse.set(row.course_id, list);
        }

        const definitions = (courseRows ?? []).map((course) => ({
          id: course.id,
          title: course.title,
          slug: course.slug,
          shortDescription: course.short_description,
          level: course.level as CourseLevel,
          category: course.category,
          estimatedHours: course.estimated_hours ?? 0,
          sections: sectionsByCourse.get(course.id) ?? [],
          resources: [],
          projects: projectsByCourse.get(course.id) ?? [],
        }));

        setCourses(definitions);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { courses, isLoading, error };
}
