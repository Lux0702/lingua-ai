export function FlashcardEmpty() {
  return (
    <div className="rounded-xl border border-dashed py-16 text-center">
      <h2 className="text-xl font-semibold">No vocabulary</h2>

      <p className="mt-2 text-muted-foreground">
        This lesson doesnt contain any vocabulary.
      </p>
    </div>
  );
}
