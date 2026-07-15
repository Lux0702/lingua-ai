import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DialogueItem } from "./DialogueItem";
import type { Dialogue } from "../../types";

interface DialogueCardProps {
  dialogue: Dialogue;
  language: string;
}

export function DialogueCard({ dialogue, language }: DialogueCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dialogue.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {dialogue.lines.map((line) => (
          <DialogueItem key={line.id} line={line} language={language} />
        ))}
      </CardContent>
    </Card>
  );
}
