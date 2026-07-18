// import { getLesson } from "@/features/lesson/services/storage";
// import { useLessons } from "@/hooks/useLessons";
import type { GenerateQuizRequest } from "./types";

export function buildQuizPrompt({
  courseId,
  lessons,
  difficulty,
  questionCount,
  questionTypes,
}: GenerateQuizRequest) {
  // const lessons = lessonIds
  //   .map((id) => getLesson(id))
  //   .filter((lesson): lesson is NonNullable<typeof lesson> => lesson !== null);

  const lessonContent = lessons
    .map((lesson) => JSON.stringify(lesson, null, 2))
    .join("\n\n");

  return `
Course:
${courseId}

Difficulty:
${difficulty}

Question Count:
${questionCount}

Question Types:
${questionTypes.join(", ")}

Selected Lessons:

${lessonContent}

Generate ${questionCount} NEW questions.

- Use only the selected lessons.
- Avoid duplicating existing exercises.
- Mix vocabulary, grammar, dialogue and reading.
- Return ONLY valid JSON.
`;
}
