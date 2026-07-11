import { getLessons } from "@/features/lesson/services/storage";
import type { Course } from "../types";

export function getCourses(): Course[] {
  const lessons = getLessons();

  const map = new Map<string, Course>();

  for (const lesson of lessons) {
    const key = lesson.courseId;

    if (!map.has(key)) {
      map.set(key, {
        id: key,
        title: lesson.courseTitle,
        languageCode: lesson.languageCode,
        lessons: [],
      });
    }

    map.get(key)!.lessons.push(lesson);
  }

  return Array.from(map.values());
}
export function getCourse(id: string) {
  return getCourses().find((course) => course.id === id);
}
