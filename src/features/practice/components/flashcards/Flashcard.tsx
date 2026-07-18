import { Card } from "@/components/ui/card";

import type { Vocabulary } from "@/features/lesson/types";
import { Volume2, Volume1 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSpeech } from "@/hooks/useSpeech";
interface FlashcardProps {
  vocabulary: Vocabulary;
  flipped: boolean;
  onFlip(): void;
}

export function Flashcard({ vocabulary, flipped, onFlip }: FlashcardProps) {
  const { speak, speaking } = useSpeech(vocabulary?.language ?? "zh");
  

  return (
    <div
      className="mx-auto h-96 w-full max-w-xl cursor-pointer [perspective:1000px] hover:scale-[1.02] transition-transform"
      onClick={onFlip}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <Card className="absolute inset-0  shadow-xl flex items-center justify-center rounded-2xl [backface-visibility:hidden]">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold">
              {vocabulary.word}
          <br/>
              <span className="text-2xl font-medium">
                {vocabulary.pronunciation}
              </span>
            </h1>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();

                speak(vocabulary.word);
              }}
              className="h-16 w-16 [&_svg]:size-12 cursor-pointer"
            >
              {speaking ? (
                <Volume2
                  size={50}
                  style={{ fontSize: "50px", width: "50px", height: "50px" }}
                />
              ) : (
                <Volume1
                  style={{ fontSize: "50px", width: "50px", height: "50px" }}
                />
              )}
            </Button>
            <p className="text-muted-foreground">
              {" "}
              Click or press Space to reveal
            </p>
          </div>
        </Card>

        {/* Back */}
        <Card className="bg-gray-200 absolute inset-0 shadow-xl rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex h-full flex-col justify-center space-y-6 p-8 text-center">
            <h1 className="text-4xl font-bold">{vocabulary.word}</h1>

            {vocabulary.pronunciation && (
              <p className="text-xl text-muted-foreground">
                {vocabulary.pronunciation}
              </p>
            )}
            {vocabulary.romanization && (
              <p className="text-xl text-muted-foreground">
                {vocabulary.romanization}
              </p>
            )}

            <p className="text-2xl font-semibold">{vocabulary.meaning}</p>

            {vocabulary.example && (
              <div className="space-y-2 border-t pt-6">
                <p>{vocabulary.example}</p>

                {vocabulary.translation && (
                  <p className="text-muted-foreground">
                    {vocabulary.translation}
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
