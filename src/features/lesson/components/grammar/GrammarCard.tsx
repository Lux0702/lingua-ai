import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GrammarItem } from "./GrammarItem";

import type { Grammar } from "../../types";

interface GrammarCardProps {
  grammar: Grammar[];
}

export function GrammarCard({ grammar }: GrammarCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grammar</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {grammar.map((item) => (
          <GrammarItem key={item.id} grammar={item} />
        ))}
      </CardContent>
    </Card>
  );
}
