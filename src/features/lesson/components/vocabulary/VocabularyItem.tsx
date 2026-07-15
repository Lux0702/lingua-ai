import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VocabularyItemProps {
  word: string;
  pronunciation?: string;
  romanization?: string;
  meaning: string;
  language: string;
}
import { useSpeech } from "@/hooks/useSpeech";
import { Volume2, Volume1 } from "lucide-react";

export function VocabularyItem({
  word,
  pronunciation,
  romanization,
  meaning,
  language,
}: VocabularyItemProps) {
  const { speak, speaking } = useSpeech(language || "zh");

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4 ">
        <section className="space-y-1 flex ">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{word}</h3>

            {pronunciation && (
              <p className="text-sm text-muted-foreground">{pronunciation}</p>
            )}
            {romanization && (
              <p className="text-sm text-muted-foreground">{romanization}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();

              speak(word);
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
        </section>

        <Badge variant="secondary">{meaning}</Badge>
      </CardContent>
    </Card>
  );
}
