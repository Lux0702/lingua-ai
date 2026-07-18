import { LessonsSchema } from "@/schemas/lesson";
import { api } from "./axios";
import type { Lesson } from "@/features/lesson/types";
export async function getLessonById(lessonId: string): Promise<Lesson> {
  const { data } = await api.get<Lesson>(`/lessons/${lessonId}`);
  return data;
}

export async function getLessonsByCourseId(
  courseId: string,
): Promise<Lesson[]> {
  const { data } = await api.get<Lesson[]>(`/lessons/course/${courseId}`);
  return data;
}

export async function createLesson(lessons: LessonsSchema): Promise<Lesson[]> {
  const { data } = await api.post<Lesson[]>("/lessons", lessons);
  return data;
}
