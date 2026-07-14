import { Link } from "next-view-transitions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LessonSchema } from "@/schemas/lesson";

interface RecentLessonsCardProps {
  lessons: LessonSchema[];
}

export function RecentLessonsCard({ lessons }: RecentLessonsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Lessons</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/courses/${lesson.courseId}/lessons/${lesson.id}`}
                className="block rounded-lg border p-4 transition hover:bg-muted"
              >
                <h3 className="font-medium">{lesson.title}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {lesson.overview}
                </p>

                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                  <span>📖 {lesson.vocabulary.length} Vocabulary</span>
                  <span>✍️ {lesson.grammar.length} Grammar</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
