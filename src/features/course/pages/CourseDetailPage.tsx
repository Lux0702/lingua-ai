"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "next-view-transitions";
import type { LessonSchema } from "@/schemas/lesson";
import type { Lesson } from "@/features/lesson/types";
import { LANGUAGES } from "../constants";
import { useEffect, useState } from "react";
import { getCourse } from "@/lib/api/course.api";
import { getLessonsByCourseId } from "@/lib/api/lesson.api";
export function CourseDetailPage() {
  const { courseId } = useParams();

  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    async function fetchCourse() {
      try {
        if (!courseId) return;

        const lessons = await getLessonsByCourseId(courseId as string);
        setLessons(lessons);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (!lessons) {
    return <p>Course not found.</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{lessons[0]?.courseTitle}</h1>

        <p className="text-muted-foreground">
          {LANGUAGES[lessons[0]?.languageCode]} • {lessons.length} Lessons
        </p>
      </div>

      <div className="space-y-4 gap-2 flex flex-col">
        {lessons
          .sort((a, b) => a.lessonNumber - b.lessonNumber)
          .map((lesson: LessonSchema) => (
            <Link
              key={lesson._id}
              href={`/courses/${courseId}/lessons/${lesson._id}`}
            >
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>Lesson {lesson.lessonNumber}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="font-medium">{lesson.title}</p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {lesson.overview}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
