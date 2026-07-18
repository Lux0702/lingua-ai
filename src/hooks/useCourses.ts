import { useQuery } from "@tanstack/react-query";

import { getCourses, getCourse } from "@/lib/api/course.api";
import { queryKeys } from "@/lib/react-query/query-keys";
import type { Course } from "@/features/course/types";

export function useCourses() {
  return useQuery<Course[]>({
    queryKey: queryKeys.courses,
    queryFn: getCourses,
  });
}
export function useCourse(id: string) {
    return useQuery<Course>({
        queryKey: queryKeys.course(id),
        queryFn: () => getCourse(id),
        enabled:!!id
    })
}
