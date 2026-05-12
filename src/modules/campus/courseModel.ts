export interface CourseSection {
  id: string;
  title: string;
  order: number;
  kind: "lecture" | "lab" | "assignment" | "quiz" | "project";
  slug: string;
}

export interface CourseResourceLink {
  title: string;
  url: string;
  kind: "reference" | "code" | "article" | "video";
}

export interface CourseProject {
  id: string;
  title: string;
  repoUrl?: string;
  description: string;
  technologies: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface CourseDefinition {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  sections: CourseSection[];
  resources: CourseResourceLink[];
  projects?: CourseProject[];
}
