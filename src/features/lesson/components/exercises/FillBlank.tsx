import { Input } from "@/components/ui/input";

import type { Exercise } from "../../types";

interface Props {
  exercise: Exercise;
}

export function FillBlank({ exercise }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{exercise.question}</h3>

      <Input placeholder="Your answer..." />
    </div>
  );
}
