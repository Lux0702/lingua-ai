
import type { Lesson } from "@/features/lesson/types";

export function getDashboardData(lessons: Lesson[]) {

  const totalLessons = lessons?.length ?? 0;

  const totalVocabulary = lessons?.reduce(
    (sum, lesson) => sum + lesson.vocabulary.length,
    0,
  );

  const totalGrammar = lessons?.reduce(
    (sum, lesson) => sum + lesson.grammar.length,
    0,
  );

  return {
    stats: [
      {
        id: "lessons",
        title: "Lessons",
        value: String(totalLessons),
      },
      {
        id: "vocabulary",
        title: "Vocabulary",
        value: String(totalVocabulary),
      },
      {
        id: "grammar",
        title: "Grammar",
        value: String(totalGrammar),
      },
    ],

    recentLessons: lessons.slice(-5).reverse(),
  };
}
