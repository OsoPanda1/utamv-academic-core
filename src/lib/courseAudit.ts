import { Course } from '@/data/coursesData';

export const getCourseCompleteness = (course: Course) => {
  const moduleCount = course.modules.length;
  const lessonCount = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  const hasOutcomes = course.learningOutcomes.length > 0;
  const hasPrereqs = course.prerequisites.length > 0;
  const hasQuizzes = course.quizzes.length > 0;
  const score = [moduleCount >= 3, lessonCount >= 12, hasOutcomes, hasPrereqs, hasQuizzes].filter(Boolean).length;
  const status = score >= 5 ? 'Completo' : score >= 3 ? 'Parcial' : 'Incompleto';
  return { status, score, moduleCount, lessonCount };
};

export const listIncompleteCourses = (catalog: Course[]) => catalog.filter((c) => getCourseCompleteness(c).status !== 'Completo');
