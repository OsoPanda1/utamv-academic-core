export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  kind: "lecture" | "lab" | "assignment" | "quiz" | "project";
  slug: string;
}

export type CourseResourceKind = "reference" | "code" | "article" | "video";

export interface CourseResourceLink {
  title: string;
  url: string;
  kind: CourseResourceKind;
}

export interface CourseProject {
  id: string;
  title: string;
  repoUrl: string | null;
  description: string;
  technologies: string[];
  difficulty: CourseLevel;
}

export interface CourseDefinition {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  level: CourseLevel;
  category: string;
  estimatedHours: number;
  sections: CourseSection[];
  resources: CourseResourceLink[];
  projects: CourseProject[];
}

export interface UtamvCoursesSeed {
  courses: CourseDefinition[];
}
