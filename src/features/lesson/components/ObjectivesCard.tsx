import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ObjectivesCardProps {
  objectives: string[];
}

export function ObjectivesCard({ objectives }: ObjectivesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectives</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="list-disc space-y-2 pl-5">
          {objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
