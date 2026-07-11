export interface Vocabulary {
  id: string;
  word: string;
  pinyin?: string;
  pronunciation?: string;
  meaning: string;
  example?: string;
  translation?: string;
  notes?: string;
}

export interface Grammar {
  id: string;
  title: string;
  explanation: string;
  example?: string;
  translation?: string;
}
import type { LanguageCode } from "@/features/course/constants";
export interface Lesson {
  id: string;

  languageCode: LanguageCode;

  courseId: string;

  courseTitle: string;

  lessonNumber: number;

  title: string;

  overview: string;

  objectives: string[];

  vocabulary: Vocabulary[];

  grammar: Grammar[];

  dialogue: Dialogue;

  reading: Reading;

  exercises: Exercise[];
}

export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  translation?: string;
}

export interface Dialogue {
  title: string;
  lines: DialogueLine[];
}

export interface ReadingParagraph {
  id: string;
  chinese: string;
  pinyin?: string;
  translation: string;
}

export interface Reading {
  title: string;
  paragraphs: ReadingParagraph[];
}

export type ExerciseType = "multiple_choice" | "fill_blank";

export interface ExerciseOption {
  id: string;
  text: string;
}

export interface Exercise {
  id: string;

  type: ExerciseType;

  question: string;

  options?: ExerciseOption[];

  answer: string;

  explanation: string;
}
