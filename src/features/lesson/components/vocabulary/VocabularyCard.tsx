import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { VocabularyItem } from "./VocabularyItem";
import type { Vocabulary } from "../../types";

interface VocabularyCardProps {
  vocabulary: Vocabulary[];
}

export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vocabulary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {vocabulary.map((item) => (
          <VocabularyItem
            key={item.id}
            word={item.word}
            pinyin={item.pinyin}
            meaning={item.meaning}
          />
        ))}
      </CardContent>
    </Card>
  );
}
