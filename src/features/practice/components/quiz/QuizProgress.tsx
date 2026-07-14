import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>
          Question {current} / {total}
        </span>

        <span>{Math.round(progress)}%</span>
      </div>

      <Progress value={progress} />
    </div>
  );
}
