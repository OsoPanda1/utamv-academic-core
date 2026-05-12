import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import type { UtamvCoursesSeed } from "../src/modules/campus/courseModel";

async function main() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error("SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY deben estar definidos");

  const supabase = createClient(url, serviceKey);
  const seed = JSON.parse(readFileSync("supabase/seed/utamv_courses.json", "utf8")) as UtamvCoursesSeed;

  for (const course of seed.courses) {
    const { error: courseError } = await supabase.from("courses").upsert({
      id: course.id, title: course.title, slug: course.slug, short_description: course.shortDescription,
      level: course.level, category: course.category, estimated_hours: course.estimatedHours,
    }, { onConflict: "id" });
    if (courseError) continue;

    if (course.sections.length) await supabase.from("course_sections").upsert(
      course.sections.map((s) => ({ id: s.id, course_id: course.id, title: s.title, order: s.order, kind: s.kind, slug: s.slug })),
      { onConflict: "id" }
    );

    if (course.projects.length) await supabase.from("course_projects").upsert(
      course.projects.map((p) => ({ id: p.id, course_id: course.id, title: p.title, repo_url: p.repoUrl, description: p.description, technologies: p.technologies, difficulty: p.difficulty })),
      { onConflict: "id" }
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
