import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { VocabularyItem } from "./VocabularyItem";
import type { Vocabulary } from "../../types";
import type { Language } from "@/services/ai/contracts";

interface VocabularyCardProps {
  vocabulary: Vocabulary[];
  language: Language;
}

export function VocabularyCard({ vocabulary, language }: VocabularyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vocabulary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 grid grid-cols-2 gap-4">
        {vocabulary.map((item) => (
          <VocabularyItem
            key={item.id}
            word={item.word}
            pronunciation={item.pronunciation}
            romanization={item.romanization}
            meaning={item.meaning}
            language={language}
          />
        ))}
      </CardContent>
    </Card>
  );
}
