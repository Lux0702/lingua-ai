"use client";

import { useParams } from "next/navigation";

import { getLesson } from "@/features/lesson/services/storage";

import { Flashcard } from "../components/flashcards/Flashcard";
import { FlashcardControls } from "../components/flashcards/FlashcardControls";
import { FlashcardEmpty } from "../components/flashcards/FlashcardEmpty";
import { FlashcardProgress } from "../components/flashcards/FlashcardProgress";

import { useFlashcards } from "../hooks/useFlashcards";
import { useEffect } from "react";
import { FlashcardFinished } from "../components/flashcards/FlashcardFinished";
import { useState } from "react";
import { getLessonProgress, saveLessonProgress } from "@/features/progress/services/storage";

export function FlashcardsPage() {
  const [finished, setFinished] = useState(false);
  const { lessonId } = useParams<{
    lessonId: string;
  }>();

  const lesson = getLesson(lessonId);

  const flashcards = useFlashcards(lesson?.vocabulary ?? []);

  

useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        flashcards.flip();
        break;

      case "ArrowRight":
        flashcards.next();
        break;

      case "ArrowLeft":
        flashcards.previous();
        break;
    }
  }

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [flashcards.flip, flashcards.next, flashcards.previous]);

useEffect(() => {
  if (!finished || !lesson) return;

  const old = getLessonProgress(lesson.id);

  saveLessonProgress({
    lessonId: lesson.id,

    flashcardsCompleted: true,

    quizCompleted: old?.quizCompleted ?? false,

    quizScore: old?.quizScore ?? 0,

    completed: old?.quizCompleted ?? false,

    lastStudiedAt: new Date().toISOString(),
  });
}, [finished, lesson]);
  if (!lesson) {
    return <p>Lesson not found.</p>;
  }

  if (!flashcards.currentCard) {
    return <FlashcardEmpty />;
  }
  if (finished) {
    return (
      <FlashcardFinished
        courseId={lesson.courseId}
        lessonId={lesson.id}
        onRestart={() => {
          flashcards.restart();
          setFinished(false);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Flashcards</h1>

        <p className="text-muted-foreground">{lesson.title}</p>
      </div>

      <FlashcardProgress
        current={flashcards.currentIndex + 1}
        total={flashcards.totalCards}
        progress={flashcards.progress}
      />

      <Flashcard
        vocabulary={flashcards.currentCard}
        flipped={flashcards.flipped}
        onFlip={flashcards.flip}
      />

      <FlashcardControls
        flipped={flashcards.flipped}
        isFirst={flashcards.isFirst}
        isLast={flashcards.isLast}
        onPrevious={flashcards.previous}
        onFlip={flashcards.flip}
        onNext={flashcards.next}
        onRestart={flashcards.restart}
        onFinish={() => setFinished(true)}
      />
    </div>
  );
}
