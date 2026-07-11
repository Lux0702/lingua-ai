interface LessonHeaderProps {
  title: string;
  overview: string;
}

export function LessonHeader({ title, overview }: LessonHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-muted-foreground">{overview}</p>
    </div>
  );
}
