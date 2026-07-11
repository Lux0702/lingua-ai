import type { LessonSchema } from "@/schemas/lesson";
import { Button } from "@/components/ui/button";

import { LessonHeader } from "./LessonHeader";
import { ObjectivesCard } from "../ObjectivesCard";
import { VocabularyCard } from "../vocabulary/VocabularyCard";
import { GrammarCard } from "../grammar/GrammarCard";
import { DialogueCard } from "../dialogue/DialogueCard";
import { ReadingCard } from "../reading/ReadingCard";
import { ExerciseCard } from "../exercises/ExerciseCard";
import { LessonContent } from "./LessonContent";

interface LessonPreviewProps {
  lesson: LessonSchema;

  onSave?(): void;

  onBack?(): void;
}

export function LessonPreview({ lesson, onSave, onBack }: LessonPreviewProps) {
  return (
    <div className="space-y-6">
      <LessonContent lesson={lesson} />

      <div className="flex justify-end gap-3">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        )}

        {onSave && <Button onClick={onSave}>Save Lesson</Button>}
      </div>
    </div>
  );
}
