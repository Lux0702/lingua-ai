"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Exercise } from "@/features/lesson/types";

interface Props {
  question: Exercise;

  submitted: boolean;

  onSubmit(answer: string): void;
}

export function FillBlank({ question, submitted, onSubmit }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">{question.question}</h2>
      </div>

      <Input
        value={value}
        disabled={submitted}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button disabled={submitted} onClick={() => onSubmit(value)}>
        Check
      </Button>
    </div>
  );
}
