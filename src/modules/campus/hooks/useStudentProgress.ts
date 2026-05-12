import { useEffect, useState } from "react";
import type { StudentProgress } from "../index";

interface UseStudentProgressOptions {
  userId: string;
}

interface UseStudentProgressResult {
  data: StudentProgress[] | null;
  isLoading: boolean;
  error: Error | null;
}

export function useStudentProgress(options: UseStudentProgressOptions): UseStudentProgressResult {
  const [data, setData] = useState<StudentProgress[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        if (!isMounted) return;
        const mock: StudentProgress[] = [];
        setData(mock);
      } catch (err) {
        if (!isMounted) return;
        setError(err as Error);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    }

    void load();
    return () => {
      isMounted = false;
    };
  }, [options.userId]);

  return { data, isLoading, error };
}
