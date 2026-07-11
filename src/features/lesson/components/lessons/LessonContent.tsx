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

      <ObjectivesCard objectives={lesson.objectives} />

      <VocabularyCard vocabulary={lesson.vocabulary} />

      <GrammarCard grammar={lesson.grammar} />

      <DialogueCard dialogue={lesson.dialogue} />

      <ReadingCard reading={lesson.reading} />

      <ExerciseCard exercises={lesson.exercises} />
    </>
  );
}
