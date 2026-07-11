export const AI_CONFIG = {
  provider: "google-ai-studio",

  model: "gemini-2.5-pro",

  output: "json",

  temperature: 0.2,

  maxTokens: 8192,
} as const;

export type AIConfig = (typeof AI_CONFIG)[keyof typeof AI_CONFIG];