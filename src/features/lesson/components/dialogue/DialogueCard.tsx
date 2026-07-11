import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DialogueItem } from "./DialogueItem";
import type { Dialogue } from "../../types";

interface DialogueCardProps {
  dialogue: Dialogue;
}

export function DialogueCard({ dialogue }: DialogueCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{dialogue.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {dialogue.lines.map((line) => (
          <DialogueItem key={line.id} line={line} />
        ))}
      </CardContent>
    </Card>
  );
}
