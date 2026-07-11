import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VocabularyItemProps {
  word: string;
  pinyin?: string;
  meaning: string;
}

export function VocabularyItem({ word, pinyin, meaning }: VocabularyItemProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{word}</h3>

          {pinyin && <p className="text-sm text-muted-foreground">{pinyin}</p>}
        </div>

        <Badge variant="secondary">{meaning}</Badge>
      </CardContent>
    </Card>
  );
}
