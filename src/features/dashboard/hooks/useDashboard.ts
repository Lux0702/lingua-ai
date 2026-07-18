"use client";

import { use, useEffect, useMemo, useState } from "react";

// import { getCourses } from "@/lib/api/course.api";
// import { getLessonsByCourseId } from "@/lib/api/lesson.api";

import type { Lesson } from "@/features/lesson/types";
// import type { Course } from "@/features/course/types";
import { useCourses } from "@/hooks/useCourses";
import { useLessonsByCourseId } from "@/hooks/useLessons";

export function useDashboard() {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: lessons, isLoading: lessonsLoading } = useLessonsByCourseId(
    courses?.[0]?._id ?? "",
  );

  const loading = coursesLoading || ( lessonsLoading);

  const stats = useMemo(
    () => [
      {
        id: "courses",
        title: "Courses",
        value: String(courses?.length ?? 0),
      },
      {
        id: "lessons",
        title: "Lessons",
        value: String(lessons?.length ?? 0),
      },
      {
        id: "vocabulary",
        title: "Vocabulary",
        value: String(
          lessons?.reduce((sum, lesson) => sum + lesson.vocabulary.length, 0) ??
            0,
        ),
      },
      {
        id: "languages",
        title: "Languages",
        value: String(
          new Set((lessons ?? []).map((lesson) => lesson.languageCode)).size,
        ),
      },
    ],
    [courses, lessons],
  );

  const recentLessons = useMemo(() => {
    if (!lessons) return [];

    const map = new Map<string, Lesson>();

    [...lessons]
      .sort((a, b) => b.lessonNumber - a.lessonNumber)
      .forEach((lesson) => {
        if (!map.has(lesson.courseId ?? "")) {
          map.set(lesson.courseId ?? "", lesson);
        }
      });

    return Array.from(map.values());
  }, [lessons]);

  return {
    loading,

    stats,

    recentLessons,

    continueLesson: recentLessons[0] ?? null,

    recentCourses: courses ?? [],
  };
}
