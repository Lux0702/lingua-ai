import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import type { LessonSchema } from "@/schemas/lesson";

interface ContinueLearningCardProps {
  lesson: LessonSchema | null;
}

export function ContinueLearningCard({ lesson }: ContinueLearningCardProps) {
  if (!lesson) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            No lessons yet. Import your first lesson.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{lesson.title}</p>

          <p className="text-muted-foreground">{lesson.overview}</p>
        </div>

        <Button className="w-full">
          <Link href={`/local/${lesson.id}`}>Continue</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
