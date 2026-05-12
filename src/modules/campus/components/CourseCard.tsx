import type { CourseSummary } from "../index";

interface CourseCardProps {
  course: CourseSummary;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="rounded-lg border p-4">
      <h2 className="text-lg font-semibold">{course.title}</h2>
      <p className="text-sm text-muted-foreground">{course.shortDescription}</p>
    </article>
  );
}
