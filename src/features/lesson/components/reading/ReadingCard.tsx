import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReadingParagraphItem } from "./ReadingParagraph";

import type { Reading } from "../../types";

interface ReadingCardProps {
  reading: Reading;
  language: string;
}

export function ReadingCard({ reading, language }: ReadingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{reading.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {reading.paragraphs.map((paragraph) => (
          <ReadingParagraphItem key={paragraph.id} paragraph={paragraph} language={language} />
        ))}
      </CardContent>
    </Card>
  );
}
