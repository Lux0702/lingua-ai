import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Exercise } from "@/features/lesson/types";

interface Props {
  question: Exercise;

  answer: string;

  submitted: boolean;

  onSubmit(answer: string): void;
}

export function MultipleChoice({
  question,
  answer,
  submitted,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="space-y-2 text-center">

        <h2 className="text-2xl font-semibold">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="grid gap-4">
        {question.options!.map((option) => {
          const isSelected = answer === option.text;
          const isCorrect = option.text === question.answer;

          return (
            <Card
              key={option.id}
              onClick={() => !submitted && onSubmit(option.text)}
              className={`
                cursor-pointer
                p-4
                transition-all
                hover:border-primary

                ${submitted && isCorrect ? "border-green-500 bg-green-50" : ""}

                ${
                  submitted && isSelected && !isCorrect
                    ? "border-red-500 bg-red-50"
                    : ""
                }
              `}
            >
              {option.text}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
