import { Card, CardContent } from "@/components/ui/card";

import type { ReadingParagraph } from "../../types";

interface ReadingParagraphProps {
  paragraph: ReadingParagraph;
}

export function ReadingParagraphItem({ paragraph }: ReadingParagraphProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <p className="text-xl leading-8">{paragraph.chinese}</p>

        {paragraph.pinyin && (
          <p className="text-muted-foreground">{paragraph.pinyin}</p>
        )}

        <p>{paragraph.translation}</p>
      </CardContent>
    </Card>
  );
}
