import type { Exercise } from "../../types";

import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";

interface Props {
  exercise: Exercise;
}

export function ExerciseRenderer({ exercise }: Props) {
  switch (exercise.type) {
    case "multiple_choice":
      return <MultipleChoice exercise={exercise} />;

    case "fill_blank":
      return <FillBlank exercise={exercise} />;

    default:
      return <p>Unsupported exercise type.</p>;
  }
}
