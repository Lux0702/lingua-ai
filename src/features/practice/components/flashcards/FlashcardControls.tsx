import { Button } from "@/components/ui/button";

interface FlashcardControlsProps {
  flipped: boolean;

  isFirst: boolean;

  isLast: boolean;

  onPrevious(): void;

  onNext(): void;

  onFlip(): void;

  onRestart(): void;

}
export function FlashcardControls({
  flipped,
  isFirst,
  isLast,
  onPrevious,
  onFlip,
  onNext,
  onRestart,
}: FlashcardControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button variant="outline" disabled={isFirst} onClick={onPrevious}>
        Previous
      </Button>

      <Button variant="secondary" onClick={onFlip}>
        {flipped ? "Hide" : "Reveal"}
      </Button>

      <Button disabled={isLast} onClick={onNext}>
        Next
      </Button>

      <Button variant="outline" onClick={onRestart}>
        Restart
      </Button>

     
    </div>
  );
}
