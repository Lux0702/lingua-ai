import type { Lesson } from "@/features/lesson/types";

import type { LanguageCode } from "./constants";
export interface Course {
  _id: string;

  title: string;

  languageCode: LanguageCode;

  lessons: Lesson[];
  lessonCount?: number;
}
