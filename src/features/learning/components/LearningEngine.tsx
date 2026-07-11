import type { LearningSession } from "../types";
import { LessonRenderer } from "./LessonRenderer";

interface Props {
  session: LearningSession;
}

export function LearningEngine({ session }: Props) {
  return <LessonRenderer lesson={session.lesson.lesson} />;
}
