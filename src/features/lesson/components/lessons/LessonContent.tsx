"use client";


import type { LessonSchema } from "@/schemas/lesson";

import { LessonHeader } from "./LessonHeader";
import { ObjectivesCard } from "../ObjectivesCard";
import { VocabularyCard } from "../vocabulary/VocabularyCard";
import { GrammarCard } from "../grammar/GrammarCard";
import { DialogueCard } from "../dialogue/DialogueCard";
import { ReadingCard } from "../reading/ReadingCard";
import { ExerciseCard } from "../exercises/ExerciseCard";

interface LessonContentProps {
  lesson: LessonSchema;
}

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <>
      <LessonHeader title={lesson.title} overview={lesson.overview} />

      <ObjectivesCard objectives={lesson.objectives} lessonId={lesson.id} />

      <VocabularyCard
        vocabulary={lesson.vocabulary}
        language={lesson.languageCode}
      />

      <GrammarCard grammar={lesson.grammar} />

      <DialogueCard dialogue={lesson.dialogue} language={lesson.languageCode} />

      <ReadingCard reading={lesson.reading} language={lesson.languageCode} />

      <ExerciseCard exercises={lesson.exercises} />
    </>
  );
}
