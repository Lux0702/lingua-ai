import { Card, CardContent } from "@/components/ui/card";

import type { Grammar } from "../../types";

interface GrammarItemProps {
  grammar: Grammar;
}

export function GrammarItem({ grammar }: GrammarItemProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <h3 className="text-lg font-semibold">{grammar.title}</h3>

        <p>{grammar.explanation}</p>

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
