import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";

interface Props {
  courseId: string;
  lessonId: string;
  onRestart(): void;
}

export function FlashcardFinished({ courseId, lessonId, onRestart }: Props) {
  return (
    <div className="rounded-xl border p-10 text-center space-y-6">
      <div>
        <h1 className="text-4xl font-bold">🎉 Great Job!</h1>

        <p className="mt-2 text-muted-foreground">
          You have finished reviewing this lesson.
        </p>
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

        <Button asChild>
          <Link href={`/courses/${courseId}/lessons/${lessonId}/practice/quiz`}>
            Start Quiz
          </Link>
        </Button>
      </div>
    </div>
  );
}
