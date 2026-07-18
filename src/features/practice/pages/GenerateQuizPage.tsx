"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { QuizPlayer } from "@/features/practice/components/quiz/QuizPlayer";
import { useLesson } from "@/hooks/useLessons";

import type { GenerateQuizResponse } from "@/services/ai/types";

export function GenerateQuizPage() {
  const { lessonId } = useParams<{
    lessonId: string;
  }>();

  const {data:lesson} = useLesson(lessonId)


  const [loading, setLoading] = useState(false);

  const [quiz, setQuiz] = useState<GenerateQuizResponse | null>(null);

  if (!lesson) {
    return <div className="py-20 text-center">Lesson not found.</div>;
  }

  async function handleGenerate() {
    try {
      setLoading(true);

      const response = await fetch("/api/ai/generate-quiz", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          courseId: lesson?.courseId,
          lessons: [lesson],
          difficulty: "medium",
          questionCount: 20,
          questionTypes: ["multiple_choice", "fill_blank"],
        }),
      });

      const result: GenerateQuizResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to generate quiz.");
      }

      setQuiz(result);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to generate quiz.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (quiz) {
    return (
      <QuizPlayer
        title={`AI Quiz • ${lesson.title}`}
        exercises={quiz.exercises}
        onFinish={(score) => {
          console.log(score);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Quiz Generator</h1>

        <p className="text-muted-foreground">
          Generate a new quiz from this lesson.
        </p>
      </div>

      <div className="rounded-lg border p-6 space-y-3">
        <p>
          <strong>Lesson:</strong> {lesson.title}
        </p>

        <p>
          <strong>Difficulty:</strong> Medium
        </p>

        <p>
          <strong>Questions:</strong> 20
        </p>

        <p>
          <strong>Types:</strong> Multiple Choice + Fill Blank
        </p>
      </div>

      <Button className="w-full" disabled={loading} onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Quiz"}
      </Button>
    </div>
  );
}
