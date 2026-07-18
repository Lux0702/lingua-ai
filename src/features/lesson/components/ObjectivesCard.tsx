import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTransitionRouter } from "next-view-transitions";

interface ObjectivesCardProps {
  objectives: string[];
  lessonId?: string;
}

export function ObjectivesCard({ objectives, lessonId }: ObjectivesCardProps) {
  const router = useTransitionRouter();
  const lesson = { _id: lessonId };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectives</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="list-disc space-y-2 pl-5">
          {objectives?.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
        <Button
          variant="secondary"
          onClick={() => router.push(`/quiz?lessonId=${lesson._id}`)}
        >
          🤖 Generate AI Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
