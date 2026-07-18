import { Card, CardContent } from "@/components/ui/card";

import type { Grammar } from "../../types";

interface GrammarItemProps {
  grammar: Grammar;
}

export function GrammarItem({ grammar }: GrammarItemProps) {
  const renderExplanation = (text :string) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h4 key={index} className="font-bold mt-4">
            {line.replace(/\*\*/g, "")}
          </h4>
        );
      }

      return <p key={index}>{line}</p>;
    });
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <h3 className="text-lg font-semibold">{grammar.title}</h3>

        <div>{renderExplanation(grammar.explanation)}</div>

        {grammar.example && (
          <blockquote className="rounded bg-muted p-3 italic">
            {grammar.example}
          </blockquote>
        )}

        {grammar.translation && (
          <p className="text-sm text-muted-foreground">{grammar.translation}</p>
        )}
      </CardContent>
    </Card>
  );
}
