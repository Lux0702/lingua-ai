export interface LessonProgress {
  lessonId: string;

  flashcardsCompleted: boolean;

  quizCompleted: boolean;

  quizScore: number;

  completed: boolean;

  lastStudiedAt: string;
}
