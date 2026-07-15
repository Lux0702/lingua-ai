import { Card, CardContent } from "@/components/ui/card";

import type { ReadingParagraph } from "../../types";
import { useSpeech } from "@/hooks/useSpeech";
import { Volume2, Volume1 } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ReadingParagraphProps {
  paragraph: ReadingParagraph;
  language: string;
}

export function ReadingParagraphItem({ paragraph, language }: ReadingParagraphProps) {
    const { speak, speaking } = useSpeech(language || "zh");

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <p className="text-xl leading-8">
          {paragraph.text}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();

              speak(paragraph.text);
            }}
            className="[&_svg]:size-12 cursor-pointer hover:bg-transparent"
          >
            {speaking ? (
              <Volume2
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              <Volume1
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </Button>
        </p>

        {paragraph.pronunciation && (
          <p className="text-muted-foreground">{paragraph.pronunciation}</p>
        )}

        {paragraph.romanization && (
          <p className="text-sm italic text-muted-foreground">
            {paragraph.romanization}
          </p>
        )}

        <p>{paragraph.translation}</p>
      </CardContent>
    </Card>
  );
}
