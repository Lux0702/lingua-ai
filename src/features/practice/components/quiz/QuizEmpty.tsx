export function QuizEmpty() {
  return (
    <div className="rounded-xl border border-dashed py-16 text-center">
      <h2 className="text-xl font-semibold">No Exercises</h2>

      <p className="mt-2 text-muted-foreground">
        This lesson doesnt contain any exercises.
      </p>
    </div>
  );
}
