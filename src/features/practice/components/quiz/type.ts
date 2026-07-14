import type { Exercise } from "@/features/lesson/types";

export type QuizDifficulty = "easy" | "medium" | "hard";

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  questions: Exercise[];
  createdAt: string;
}

export interface GenerateQuizRequest {
  lesson: string; // JSON.stringify(lesson)
  difficulty: QuizDifficulty;
  questionCount: number;
  questionTypes: ("multiple_choice" | "fill_blank")[];
}

export interface GenerateQuizResponse {
  quiz: Quiz;
}
