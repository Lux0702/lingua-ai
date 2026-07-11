import { GoogleGenAI } from "@google/genai";

import type { AgentService } from "./agent.service";
import type {
  GenerateLessonRequest,
  GenerateLessonResponse,
  GenerateQuizRequest,
  GenerateQuizResponse,
  EvaluateAnswerRequest,
  EvaluateAnswerResponse,
} from "./types";
import { buildLessonPrompt } from "./prompt-builder";
import { parseJson } from "./parser";
import type { LessonSchema } from "@/schemas/lesson";
import { ai } from "./google";

async function generateContentWithRetry(
  prompt: string,
  mimeType: string,
  data: string,
) {
  const maxRetries = 1;

  for (let i = 0; i < maxRetries; i++) {
    try {
      // const uploadedFile = await ai.files.upload({
      //   file: data,
      //   config: {
      //     mimeType,
      //   },
      // });

      // Gọi API chuẩn của @google/genai
      return await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  data: data,
                  mimeType: "application/pdf", // "image/png" sẽ được truyền vào đây
                },
              },
              {
                // Key bắt buộc phải là "text"
                text: prompt,
              },
            ],
          },
        ],
      });
    } catch (error: any) {
      console.error("===== GEMINI ERROR =====");
      console.dir(error, { depth: null });

      const status =
        error?.status ?? error?.response?.status ?? error?.error?.code;

      console.log("Status:", status);
      console.log("Message:", error?.message);

      if (![429, 500, 502, 503, 504].includes(status)) {
        throw error;
      }

      if (i === maxRetries - 1) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000 * (i + 1)));
    }
  }

  throw new Error("Failed to generate content.");
};
export const googleStudioAgent: AgentService = {
  async generateLesson({
    language,
    level,
    mimeType,
    data,
  }: GenerateLessonRequest): Promise<GenerateLessonResponse> {
    const prompt = buildLessonPrompt({
      language,
      level,
    });

    const response = await generateContentWithRetry(prompt, mimeType, data);

    const lesson = parseJson<LessonSchema>(response.text);

    return {
      lesson,
    };
  },

  async generateQuiz(
    request: GenerateQuizRequest,
  ): Promise<GenerateQuizResponse> {
    throw new Error("Not implemented");
  },

  async evaluateAnswer(
    request: EvaluateAnswerRequest,
  ): Promise<EvaluateAnswerResponse> {
    throw new Error("Not implemented");
  },
};
