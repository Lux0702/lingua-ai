"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { VocabularyItem } from "./VocabularyItem";
import type { Vocabulary } from "../../types";
import type { Language } from "@/services/ai/contracts";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { useParams } from "next/navigation";
interface VocabularyCardProps {
  vocabulary: Vocabulary[];
  language: Language;
}

export function VocabularyCard({ vocabulary, language }: VocabularyCardProps) {
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          Vocabulary
          <Button className="max-w-[200px] " disabled={courseId === undefined || lessonId === undefined}>
            <Link
              href={`/courses/${courseId}/lessons/${lessonId}/practice/flashcards`}
            >
              FlashCards 🎉
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 grid grid-cols-2 gap-4">
        {vocabulary.map((item) => (
          <VocabularyItem
            key={item.id}
            word={item.word}
            pronunciation={item.pronunciation}
            romanization={item.romanization}
            meaning={item.meaning}
            language={language}
          />
        ))}
      </CardContent>
    </Card>
  );
}
