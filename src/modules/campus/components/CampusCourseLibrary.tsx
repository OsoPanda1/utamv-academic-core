import type { CourseDefinition } from "../courseModel";

interface CampusCourseLibraryProps {
  courses: CourseDefinition[];
  onSelectCourse: (course: CourseDefinition) => void;
}

export function CampusCourseLibrary({ courses, onSelectCourse }: CampusCourseLibraryProps) {
  if (!courses.length) {
    return <p className="text-sm text-muted-foreground">No hay cursos disponibles aún.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <button
          key={course.id}
          type="button"
          className="flex flex-col rounded-lg border bg-card p-4 text-left shadow-sm transition-shadow hover:shadow-md"
          onClick={() => onSelectCourse(course)}
        >
          <h2 className="text-base font-semibold">{course.title}</h2>
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{course.shortDescription}</p>
        </button>
      ))}
    </div>
  );
}
