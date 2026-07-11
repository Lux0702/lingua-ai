export const LANGUAGES = {
  zh: "Chinese",
  en: "English",
  ja: "Japanese",
  ko: "Korean",
} as const;

export type LanguageCode = keyof typeof LANGUAGES;
export type LanguageName = typeof LANGUAGES[LanguageCode];
