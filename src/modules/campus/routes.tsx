import type { ReactNode } from "react";
import { CampusLayout } from "./components/CampusLayout";

export interface CampusRoute {
  id: "campus:home" | "campus:courses" | "campus:course-detail";
  path: string;
  element: ReactNode;
}

export function getCampusRoutes(): CampusRoute[] {
  return [
    { id: "campus:home", path: "/campus", element: <CampusLayout /> },
    { id: "campus:courses", path: "/campus/cursos", element: <CampusLayout initialSection="courses" /> },
    { id: "campus:course-detail", path: "/campus/cursos/:slug", element: <CampusLayout initialSection="course-detail" /> }
  ];
}
