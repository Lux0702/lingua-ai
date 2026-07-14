import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";

interface QuizResultProps {
  score: number;
  total: number;

  courseId: string;
  lessonId: string;

  onRestart(): void;
}

export function QuizResult({
  score,
  total,
  courseId,
  lessonId,
  onRestart,
}: QuizResultProps) {
  const percent = Math.round((score / total) * 100);

  return (
    <div className="mx-auto max-w-xl rounded-xl border p-10 text-center space-y-6">
      <div>
        <h1 className="text-4xl font-bold">🎉 Quiz Completed</h1>

        <p className="mt-3 text-2xl">
          {score} / {total}
        </p>

        <p className="text-muted-foreground">{percent}%</p>
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onRestart}>
          Restart
        </Button>

        <Button asChild>
          <Link href={`/courses/${courseId}/lessons/${lessonId}`}>
            Back to Lesson
          </Link>
        </Button>
      </div>
    </div>
  );
}
