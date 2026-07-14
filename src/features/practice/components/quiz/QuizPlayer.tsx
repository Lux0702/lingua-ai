"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

import { useQuiz } from "../../hooks/useQuiz";

import { QuizQuestion } from "./QuizQuestion";
import { QuizProgress } from "./QuizProgress";
import { QuizResult } from "./QuizResult";
import { QuizEmpty } from "./QuizEmpty";

import {
  getLessonProgress,
  saveLessonProgress,
} from "@/features/progress/services/storage";

import type { Exercise } from "@/features/lesson/types";

interface QuizPlayerProps {
  title: string;

  exercises: Exercise[];

  courseId?: string;

  lessonId?: string;

  saveProgress?: boolean;

  onFinish?(score: number): void;
}

export function QuizPlayer({
  title,
  exercises,
  courseId,
  lessonId,
  saveProgress = false,
  onFinish,
}: QuizPlayerProps) {
  const quiz = useQuiz(exercises);

  useEffect(() => {
    if (!quiz.finished) return;

    onFinish?.(quiz.score);

    if (!saveProgress || !lessonId) return;

    const old = getLessonProgress(lessonId);

    saveLessonProgress({
      lessonId,

      flashcardsCompleted: old?.flashcardsCompleted ?? false,

      quizCompleted: true,

      quizScore: quiz.score,

      completed: old?.flashcardsCompleted ?? false,

      lastStudiedAt: new Date().toISOString(),
    });
  }, [quiz.finished]);

  if (exercises.length === 0) {
    return <QuizEmpty />;
  }

  if (!quiz.currentQuestion) {
    return <QuizEmpty />;
  }

  if (quiz.finished) {
    return (
      <QuizResult
        score={quiz.score}
        total={quiz.totalQuestions}
        courseId={courseId ?? ""}
        lessonId={lessonId ?? ""}
        onRestart={quiz.restart}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Quiz</h1>

        <p className="text-muted-foreground">{title}</p>
      </div>

      <QuizProgress
        current={quiz.currentIndex + 1}
        total={quiz.totalQuestions}
      />

      <QuizQuestion
        question={quiz.currentQuestion}
        answer={quiz.answer}
        submitted={quiz.submitted}
        onSubmit={quiz.submit}
      />

      {quiz.submitted && (
        <>
          <div className="rounded-lg border bg-muted/40 p-4">
            <h3 className="font-medium">Explanation</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {quiz.currentQuestion.explanation}
            </p>
          </div>

          <div className="flex justify-end">
            <Button onClick={quiz.next}>
              {quiz.currentIndex === quiz.totalQuestions - 1
                ? "Finish"
                : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
