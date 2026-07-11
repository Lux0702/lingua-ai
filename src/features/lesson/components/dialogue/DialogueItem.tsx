import { Card, CardContent } from "@/components/ui/card";
import type { DialogueLine } from "../../types";

interface DialogueItemProps {
  line: DialogueLine;
}

export function DialogueItem({ line }: DialogueItemProps) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary">{line.speaker}</span>

          <span className="text-lg">{line.text}</span>
        </div>

        {line.translation && (
          <p className="text-sm text-muted-foreground">{line.translation}</p>
        )}
      </CardContent>
    </Card>
  );
}
