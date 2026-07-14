"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import type { Course } from "../types";
import { Link } from "next-view-transitions";
import { LANGUAGES } from "../constants";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full cursor-pointer transition-all hover:shadow-md hover:border-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{course.title}</CardTitle>

            <Badge variant="secondary">{LANGUAGES[course.languageCode]}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {course.lessons.length} Lessons
          </p>
          <p className="text-sm">
            Start with Lesson {course.lessons[0]?.lessonNumber}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
