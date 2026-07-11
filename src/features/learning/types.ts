import type { Lesson } from "../lesson/types";

export interface LearningContent {
  lesson: Lesson;
}
import  type { LanguageCode } from "@/features/course/constants";
export interface LearningSession {
  id: string;
  languageCode: LanguageCode;
  course: string;
  module: string;
  lesson: LearningContent;
}
