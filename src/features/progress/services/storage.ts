import type { LessonProgress } from "../types";

const STORAGE_KEY = "polyglot-progress";

export function getProgress(): LessonProgress[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}
export function getLessonProgress(
  lessonId: string,
): LessonProgress | undefined {
  return getProgress().find((item) => item.lessonId === lessonId);
}
export function saveLessonProgress(progress: LessonProgress) {
  const data = getProgress();

  const index = data.findIndex((item) => item.lessonId === progress.lessonId);

  if (index === -1) {
    data.push(progress);
  } else {
    data[index] = progress;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}