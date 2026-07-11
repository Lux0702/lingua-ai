import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MultipleChoice } from "./MultipleChoice";

import type { Exercise } from "../../types";
import { ExerciseRenderer } from "./ExerciseRenderer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface ExerciseCardProps {
  exercises: Exercise[];
}

export function ExerciseCard({
  exercises,
}: ExerciseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercises</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {exercises.map((exercise) => (
          <ExerciseRenderer key={exercise.id} exercise={exercise} />
        ))}
      </CardContent>
    </Card>
  );

}
