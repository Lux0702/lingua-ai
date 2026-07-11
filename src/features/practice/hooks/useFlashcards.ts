"use client";

import { useMemo, useState } from "react";

import type { Vocabulary } from "@/features/lesson/types";

export function useFlashcards(cards: Vocabulary[]) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCard = useMemo(() => cards[index] ?? null, [cards, index]);

  const progress = useMemo(() => {
    if (cards.length === 0) return 0;

    return ((index + 1) / cards.length) * 100;
  }, [cards.length, index]);

  function flip() {
    setFlipped((prev) => !prev);
  }

  function next() {
    if (index >= cards.length - 1) return;

    setIndex((prev) => prev + 1);
    setFlipped(false);
  }

  function previous() {
    if (index <= 0) return;

    setIndex((prev) => prev - 1);
    setFlipped(false);
  }

  function restart() {
    setIndex(0);
    setFlipped(false);
  }

  return {
    currentCard,
    currentIndex: index,
    totalCards: cards.length,
    progress,
    flipped,
    isFirst: index === 0,
    isLast: index === cards.length - 1,
    flip,
    next,
    previous,
    restart,
  };
}
