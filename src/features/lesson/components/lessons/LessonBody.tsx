import type { LessonSchema } from "@/schemas/lesson";

import { ObjectivesCard } from "../ObjectivesCard";
import { VocabularyCard } from "../vocabulary/VocabularyCard";
import { GrammarCard } from "../grammar/GrammarCard";
import { DialogueCard } from "../dialogue/DialogueCard";
import { ReadingCard } from "../reading/ReadingCard";
import { ExerciseCard } from "../exercises/ExerciseCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LessonBodyProps {
  lesson: LessonSchema;

  tab: number;
}
export function LessonBody({ lesson, tab }: LessonBodyProps) {
  const router = useRouter();
  switch (tab) {
    case 0:
      return (
        <ObjectivesCard objectives={lesson.objectives} lessonId={lesson.id} />
      );

    case 1:
      return <VocabularyCard vocabulary={lesson.vocabulary} />;

    case 2:
      return <GrammarCard grammar={lesson.grammar} />;

    case 3:
      return <DialogueCard dialogue={lesson.dialogue} />;

    case 4:
      return <ReadingCard reading={lesson.reading} />;

    case 5:
      return <ExerciseCard exercises={lesson.exercises} />;
    // case 6:
    //   return router.push(`/quiz?lessonId=${lesson.id}`);

    default:
      return null;
  }
}
