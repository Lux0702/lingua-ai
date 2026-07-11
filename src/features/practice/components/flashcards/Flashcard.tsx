import { Card } from "@/components/ui/card";

import type { Vocabulary } from "@/features/lesson/types";

interface Props {
  vocabulary: Vocabulary;

  flipped: boolean;

  onFlip(): void;
}

export function Flashcard({ vocabulary, flipped, onFlip }: Props) {
  return (
    <Card
      onClick={onFlip}
      className="flex h-80 cursor-pointer items-center justify-center p-10"
    >
      {!flipped ? (
        <h2 className="text-4xl font-bold">{vocabulary.word}</h2>
      ) : (
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">{vocabulary.word}</h2>

          {vocabulary.pinyin && <p>{vocabulary.pinyin}</p>}

          <p className="text-xl">{vocabulary.meaning}</p>

          {vocabulary.example && (
            <div className="pt-4">
              <p>{vocabulary.example}</p>

              <p className="text-muted-foreground">{vocabulary.translation}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
