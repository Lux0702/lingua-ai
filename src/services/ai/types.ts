import type { LessonSchema } from "@/schemas/lesson";
import { AI_TASKS } from "./tasks";
import type { Language, Level } from "./contracts";

export interface GenerateLessonRequest {
  task: typeof AI_TASKS.GENERATE_LESSON;

  language: Language;

  level: Level;

  fileName: string;

  mimeType: string;

  data: string;
}

export interface GenerateLessonResponse {
  lesson: LessonSchema;
}

export interface GenerateQuizRequest {
  task: typeof AI_TASKS.GENERATE_QUIZ;

  lessonId: string;
}

export interface GenerateQuizResponse {
  quiz: unknown;
}

export interface EvaluateAnswerRequest {
  task: typeof AI_TASKS.EVALUATE_ANSWER;

  lessonId: string;

  questionId: string;

  answer: string;
}

export interface EvaluateAnswerResponse {
  correct: boolean;

  score: number;

  explanation: string;

  feedback: string;
}
