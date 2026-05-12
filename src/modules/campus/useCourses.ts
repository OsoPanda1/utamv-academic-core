import { useEffect, useState } from "react";
import type { CourseDefinition } from "./courseModel";
import { loadUtamvCourses } from "./loadCourses";

interface UseCoursesResult {
  courses: CourseDefinition[];
  isLoading: boolean;
  error: Error | null;
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<CourseDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const loaded = await loadUtamvCourses();
        if (isMounted) setCourses(loaded);
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
