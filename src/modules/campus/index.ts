export * from "./routes";
export * from "./hooks/useStudentProgress";
export * from "./components/CampusLayout";
export * from "./components/CourseCard";

export type CampusRouteId = "campus:home" | "campus:courses" | "campus:course-detail";

export interface CourseSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverUrl?: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface StudentProgress {
  courseId: string;
  completedPercentage: number;
  lastAccessedAt: string;
}

export * from "./courseModel";
export * from "./components/CampusCourseLibrary";
export * from "./components/StudentDashboard";
export * from "./loadCourses";
export * from "./useCourses";
export * from "./useCoursesFromDb";
