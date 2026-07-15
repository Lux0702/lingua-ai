import { z } from "zod";

export const vocabularySchema = z.object({
  id: z.string(),
  word: z.string(),
  pronunciation: z.string().optional(),
  romanization: z.string().optional(),
  meaning: z.string(),
  example: z.string().optional(),
  translation: z.string().optional(),
  notes: z.string().optional(),
});

export const grammarSchema = z.object({
  id: z.string(),
  title: z.string(),
  explanation: z.string(),
  example: z.string().optional(),
  translation: z.string().optional(),
});

export const dialogueLineSchema = z.object({
  id: z.string(),
  speaker: z.string(),
  text: z.string(),
  translation: z.string().optional(),
});

export const dialogueSchema = z.object({
  title: z.string(),
  lines: z.array(dialogueLineSchema),
});

export const readingParagraphSchema = z.object({
  id: z.string(),

  text: z.string(),

  pronunciation: z.string().optional(),

  romanization: z.string().optional(),

  translation: z.string(),
});

export const readingSchema = z.object({
  title: z.string(),
  paragraphs: z.array(readingParagraphSchema),
});

export const exerciseOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const exerciseSchema = z.object({
  id: z.string(),
  type: z.enum(["multiple_choice", "fill_blank"]),
  question: z.string(),
  options: z.array(exerciseOptionSchema).optional(),
  answer: z.string(),
  explanation: z.string(),
});
import type { LanguageCode } from "@/features/course/constants";

export const lessonSchema = z.object({
  id: z.string(),

  languageCode: z.enum(["zh", "en", "ja", "ko"]),
  courseId: z.string(),

  courseTitle: z.string(),

  lessonNumber: z.number(),

  title: z.string(),

  overview: z.string(),

  objectives: z.array(z.string()),

  vocabulary: z.array(vocabularySchema),

  grammar: z.array(grammarSchema),

  dialogue: dialogueSchema,

  reading: readingSchema,

  exercises: z.array(exerciseSchema),
});

export type LessonSchema = z.infer<typeof lessonSchema>;
