"use client";

import { useEffect, useMemo, useState } from "react";

import { getLessons } from "@/features/lesson/services/storage";
import { getCourses } from "@/features/course/services/storage";

import type { Lesson } from "@/features/lesson/types";
import type { Course } from "@/features/course/types";

export function useDashboard() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setLessons(getLessons());
    setCourses(getCourses());
  }, []);

  const stats = useMemo(
    () => [
      {
        id: "courses",
        title: "Courses",
        value: String(courses.length),
      },
      {
        id: "lessons",
        title: "Lessons",
        value: String(lessons.length),
      },
      {
        id: "vocabulary",
        title: "Vocabulary",
        value: String(
          lessons.reduce((sum, lesson) => sum + lesson.vocabulary.length, 0),
        ),
      },
      {
        id: "languages",
        title: "Languages",
        value: String(
          new Set(lessons.map((lesson) => lesson.languageCode)).size,
        ),
      },
    ],
    [courses, lessons],
  );

  const recentLessons = useMemo(() => {
    const map = new Map<string, Lesson>();

    [...lessons]
      .sort((a, b) => b.lessonNumber - a.lessonNumber)
      .forEach((lesson) => {
        if (!map.has(lesson.courseId)) {
          map.set(lesson.courseId, lesson);
        }
      });

    return Array.from(map.values());
  }, [lessons]);

  return {
    stats,

    recentLessons,

    continueLesson: recentLessons[0] ?? null,

    recentCourses: courses,
  };
}
