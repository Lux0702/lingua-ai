import { getLessons } from "@/features/lesson/services/storage";

export function getDashboardData() {
  const lessons = getLessons();

  const totalLessons = lessons.length;

  const totalVocabulary = lessons.reduce(
    (sum, lesson) => sum + lesson.vocabulary.length,
    0,
  );

  const totalGrammar = lessons.reduce(
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
