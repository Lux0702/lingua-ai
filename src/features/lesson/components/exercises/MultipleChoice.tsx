import { CheckCircle2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import type { Exercise } from "../../types";

interface MultipleChoiceProps {
  exercise: Exercise;

  answer: string;

  onAnswer(answer: string): void;
}

export function MultipleChoice({
  exercise,
  answer,
  onAnswer,
}: MultipleChoiceProps) {
  const answered = answer !== "";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{exercise.question}</h3>

      <div className="space-y-3">
        {exercise.options?.map((option) => {
          const isSelected = option.text === answer;

          const isCorrect = option.text === exercise.answer;

          return (
            <Button
              key={option.id}
              variant="outline"
              disabled={answered}
              onClick={() => onAnswer(option.text)}
              className={cn(
                "h-auto w-full justify-between py-4",

                answered &&
                  isCorrect &&
                  "border-green-500 bg-green-100 text-green-700",

                answered &&
                  isSelected &&
                  !isCorrect &&
                  "border-red-500 bg-red-100 text-red-700",
              )}
            >
              <span>{option.text}</span>

              {answered && isCorrect && <CheckCircle2 className="h-5 w-5" />}

              {answered && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
