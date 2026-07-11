interface GenerateButtonProps {
  loading: boolean;

  onGenerate(): void;
}

export function GenerateButton({ loading, onGenerate }: GenerateButtonProps) {
  return (
    <button
      onClick={onGenerate}
      disabled={loading}
      className="rounded-lg bg-black px-4 py-2 text-white"
    >
      {loading ? "Generating..." : "Generate Lesson"}
    </button>
  );
}
