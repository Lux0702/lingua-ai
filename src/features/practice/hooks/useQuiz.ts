"use client";

import { useState } from "react";

import type { Exercise } from "@/features/lesson/types";

export function useQuiz(exercises: Exercise[]) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = exercises[index] ?? null;

  function submit(value: string) {
    if (!currentQuestion || submitted) return;

    setAnswer(value);
    setSubmitted(true);

    if (
      value.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase()
    ) {
      setScore((prev) => prev + 1);
    }
  }

  function next() {
    if (index >= exercises.length - 1) {
      setFinished(true);
      return;
    }

    setIndex((prev) => prev + 1);
    setAnswer("");
    setSubmitted(false);
  }

  function restart() {
    setIndex(0);
    setAnswer("");
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  }

  return {
    currentQuestion,
    currentIndex: index,
    totalQuestions: exercises.length,

    answer,
    submitted,

    score,
    finished,

    submit,
    next,
    restart,
  };
}
