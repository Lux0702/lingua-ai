import type { LessonSchema } from "@/schemas/lesson";
import { AI_TASKS } from "./tasks";
import type { Language, Level } from "./contracts";

export interface GenerateLessonRequest {
  task: typeof AI_TASKS.GENERATE_LESSON;

  language: Language;

  level: Level;

  content: string;
}

export interface GenerateLessonResponse {
  lesson: LessonSchema;
}
import type { Lesson } from "@/features/lesson/types";

export interface GenerateQuizRequest {
  courseId: string;

  lessons: LessonSchema[];

  difficulty: "easy" | "medium" | "hard";

  questionCount: number;

  questionTypes: ("multiple_choice" | "fill_blank")[];
}
import type { Exercise } from "@/features/lesson/types";

export interface GenerateQuizResponse {
  exercises: Exercise[];

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
