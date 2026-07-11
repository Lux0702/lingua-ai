"use client";

import { useParams } from "next/navigation";

import { getCourse } from "../services/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { LessonSchema } from "@/schemas/lesson";
import type { Lesson } from "@/features/lesson/types";
import { LANGUAGES } from "../constants";

export function CourseDetailPage() {
  const { courseId } = useParams();

  const course = getCourse(courseId as string);

  if (!course) {
    return <p>Course not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{course.title}</h1>

        <p className="text-muted-foreground">
          {LANGUAGES[course.languageCode]} • {course.lessons.length} Lessons
        </p>
      </div>

      <div className="space-y-4 gap-2 flex flex-col">
        {course.lessons
          .sort((a: Lesson, b: Lesson) => a.lessonNumber - b.lessonNumber)
          .map((lesson: LessonSchema) => (
            <Link
              key={lesson.id}
              href={`/courses/${course.id}/lessons/${lesson.id}`}
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
