"use client";

import { useParams } from "next/navigation";

import { getLesson } from "@/features/lesson/services/storage";

import { Flashcard } from "../components/flashcards/Flashcard";
import { FlashcardControls } from "../components/flashcards/FlashcardControls";
import { FlashcardEmpty } from "../components/flashcards/FlashcardEmpty";
import { FlashcardProgress } from "../components/flashcards/FlashcardProgress";

import { useFlashcards } from "../hooks/useFlashcards";
import { useEffect } from "react";

export function FlashcardsPage() {
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

  if (!lesson) {
    return <p>Lesson not found.</p>;
  }

  if (!flashcards.currentCard) {
    return <FlashcardEmpty />;
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
      />
    </div>
  );
}
