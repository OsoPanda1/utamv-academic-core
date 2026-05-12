import type { CourseDefinition, UtamvCoursesSeed } from "./courseModel";

export async function loadUtamvCourses(): Promise<CourseDefinition[]> {
  const response = await fetch("/utamv_courses.json", {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
  });

  if (!response.ok) {
    throw new Error(`Failed to load UTAMV courses seed: ${response.status}`);
  }

  const data = (await response.json()) as UtamvCoursesSeed;
  return data.courses.sort((a, b) => a.title.localeCompare(b.title));
}
