import type { Exercise } from "@/features/lesson/types";

import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";

interface Props {
  question: Exercise;

  answer: string;

  submitted: boolean;

  onSubmit(answer: string): void;
}

export function QuizQuestion(props: Props) {
  switch (props.question.type) {
    case "multiple_choice":
      return <MultipleChoice {...props} />;

    case "fill_blank":
      return <FillBlank {...props} />;

    default:
      return null;
  }
}
