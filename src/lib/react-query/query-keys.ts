import type { Lesson } from "@/features/lesson/types";

export const queryKeys = {
  courses: ["courses"] as const,

  course: (id: string) => ["courses", id] as const,

  lessons: ["lessons"] as const,

  lessonsByCourse: (courseId: string) =>
    ["courses", courseId, "lessons"] as const,

  lesson: (id: string) => ["lessons", id] as const,

  importLesson: (lessons: Lesson[])=> ["lessons", lessons] as const,
};
