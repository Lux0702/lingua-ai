import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

import { getLessonById, getLessonsByCourseId, createLesson, getLessons } from "@/lib/api/lesson.api";
import { queryKeys } from "@/lib/react-query/query-keys";
import type { Lesson } from "@/features/lesson/types";

export function useLesson(lessonId: string) {
  return useQuery<Lesson>({
    queryKey: queryKeys.lesson(lessonId),
    queryFn: () => getLessonById(lessonId),
    enabled: !!lessonId,
  });
}
export function useLessons() {
  return useQuery<Lesson[]>({
    queryKey: queryKeys.lessons,
    queryFn: () => getLessons(),
  });
}

export function useLessonsByCourseId(courseId: string) {
  return useQuery<Lesson[]>({
    queryKey: queryKeys.lessonsByCourse(courseId),
    queryFn: () => getLessonsByCourseId(courseId),
    enabled: !!courseId,
  });
}
export function useCreateLessons() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLesson,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses","lessons"],
      });
    },
  });
}
