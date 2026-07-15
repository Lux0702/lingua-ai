import { Card, CardContent } from "@/components/ui/card";
import type { DialogueLine } from "../../types";
import { Volume2, Volume1 } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import { Button } from "@/components/ui/button";

interface DialogueItemProps {
  line: DialogueLine;
  language: string;
}

export function DialogueItem({ line, language }: DialogueItemProps) {
  const { speak, speaking } = useSpeech(language || "zh");

  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-primary">{line.speaker}</span>

          <span className="text-lg">{line.text}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();

              speak(line.text);
            }}
            className="h-16 w-16 [&_svg]:size-12 cursor-pointer hover:bg-transparent"
          >
            {speaking ? (
              <Volume2
                style={{ fontSize: "50px", width: "40px", height: "40px" }}
              />
            ) : (
              <Volume1
                style={{ fontSize: "50px", width: "40px", height: "40px" }}
              />
            )}
          </Button>
        </div>

        {line.translation && (
          <p className="text-sm text-muted-foreground">{line.translation}</p>
        )}
      </CardContent>
    </Card>
  );
}
