import type { Lesson } from "@/features/lesson/types";

import { LessonHeader } from "@/features/lesson/components/lessons/LessonHeader";
import { ObjectivesCard } from "@/features/lesson/components/ObjectivesCard";
import { VocabularyCard } from "@/features/lesson/components/vocabulary/VocabularyCard";
import { GrammarCard } from "@/features/lesson/components/grammar/GrammarCard";
import { DialogueCard } from "@/features/lesson/components/dialogue/DialogueCard";
import { ReadingCard } from "@/features/lesson/components/reading/ReadingCard";

interface Props {
  lesson: Lesson;
}

export function LessonRenderer({ lesson }: Props) {
  return (
    <div className="space-y-6">
      <LessonHeader title={lesson.title} overview={lesson.overview} />

      <ObjectivesCard objectives={lesson.objectives} lessonId={lesson._id} />

      <VocabularyCard
        vocabulary={lesson.vocabulary}
        language={lesson.languageCode}
      />

      <GrammarCard grammar={lesson.grammar} />

      <DialogueCard dialogue={lesson.dialogue} language={lesson.languageCode} />

      <ReadingCard reading={lesson.reading} language={lesson.languageCode} />
    </div>
  );
}
