import type { Lesson } from "@/features/lesson/types";

import type { LanguageCode } from "./constants";
export interface Course {
  id: string;

  title: string;

  languageCode: LanguageCode;

  lessons: Lesson[];
}
