import type { LessonSchema } from "@/schemas/lesson";

const STORAGE_KEY = "polyglot-lessons";

export function getLessons(): LessonSchema[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function getLesson(id: string): LessonSchema | undefined {
  return getLessons().find((lesson) => lesson.id === id);
}

export function saveLesson(lesson: LessonSchema) {
  if (typeof window === "undefined") {
    return;
  }

  const lessons = getLessons();

  lessons.push(lesson);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
}

export function deleteLesson(id: string) {
  if (typeof window === "undefined") {
    return;
  }

  const lessons = getLessons().filter((lesson) => lesson.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
}

export function updateLesson(lesson: LessonSchema) {
  if (typeof window === "undefined") {
    return;
  }

  const lessons = getLessons().map((item) =>
    item.id === lesson.id ? lesson : item,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
}


