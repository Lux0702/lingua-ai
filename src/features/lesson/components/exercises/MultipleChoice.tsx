import { Button } from "@/components/ui/button";
import type { Exercise } from "../../types";

interface MultipleChoiceProps {
  exercise: Exercise;
}

export function MultipleChoice({ exercise }: MultipleChoiceProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{exercise.question}</h3>

      {exercise.options?.map((option) => (
        <Button
          key={option.id}
          variant="outline"
          className="w-full justify-start"
        >
          {option.text}
        </Button>
      ))}
    </div>
  );
}
