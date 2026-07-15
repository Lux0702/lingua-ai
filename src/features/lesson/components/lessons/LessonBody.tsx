"use client"
import type { LessonSchema } from "@/schemas/lesson";

import { ObjectivesCard } from "../ObjectivesCard";
import { VocabularyCard } from "../vocabulary/VocabularyCard";
import { GrammarCard } from "../grammar/GrammarCard";
import { DialogueCard } from "../dialogue/DialogueCard";
import { ReadingCard } from "../reading/ReadingCard";
import { ExerciseCard } from "../exercises/ExerciseCard";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/useSpeech";
import { useEffect } from "react";

interface LessonBodyProps {
  lesson: LessonSchema;

  tab: number;
}
export function LessonBody({ lesson, tab }: LessonBodyProps) {
  const { stop } = useSpeech(lesson.languageCode || "zh");
  useEffect(()=>{
    return ()=>{
      stop()
    }
  },[tab])
  switch (tab) {
    case 0:
      return (
        <ObjectivesCard objectives={lesson.objectives} lessonId={lesson.id} />
      );

    case 1:
      return (
        <VocabularyCard
          vocabulary={lesson.vocabulary}
          language={lesson.languageCode}
        />
      );

    case 2:
      return <GrammarCard grammar={lesson.grammar} />;

    case 3:
      return (
        <DialogueCard
          dialogue={lesson.dialogue}
          language={lesson.languageCode}
        />
      );

    case 4:
      return (
        <ReadingCard reading={lesson.reading} language={lesson.languageCode} />
      );

    case 5:
      return <ExerciseCard exercises={lesson.exercises} />;

    default:
      return null;
  }
}
