"use client"
import type { Exercise } from "../../types";

import { MultipleChoice } from "./MultipleChoice";
import { FillBlank } from "./FillBlank";
import { useState } from "react";

interface Props {
  exercise: Exercise;
}

export function ExerciseRenderer({ exercise }: Props) {
  const [answer, setAnswer] = useState("");
  switch (exercise.type) {
    case "multiple_choice":
      return (
        <MultipleChoice
          exercise={exercise}
          answer={answer}
          onAnswer={setAnswer}
        />
      );

    case "fill_blank":
      return <FillBlank exercise={exercise} />;

    default:
      return <p>Unsupported exercise type.</p>;
  }
}
