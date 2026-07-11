"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PracticePage() {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice</h1>

        <p className="text-muted-foreground">Choose a practice mode.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🃏 Flashcards</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Review vocabulary with flashcards.
            </p>

            <Button asChild>
              <Link
                href={`/courses/${courseId}/lessons/${lessonId}/practice/flashcards`}
              >
                Start Flashcards
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📝 Quiz</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Test what youve learned.
            </p>

            <Button asChild>
              <Link
                href={`/courses/${courseId}/lessons/${lessonId}/practice/quiz`}
              >
                Start Quiz
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
