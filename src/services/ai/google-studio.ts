import { GoogleGenAI } from "@google/genai";
import type { Exercise } from "@/features/lesson/types";
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
import { buildQuizPrompt } from "./buildQuizPrompt";
import { parseJson } from "./parser";
import type { LessonSchema } from "@/schemas/lesson";
import { ai } from "./google";

async function generateContent(prompt: string) {
  try {
    return await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  } catch (error) {
    console.error(error);

    throw new Error("Failed to generate lesson.");
  }
}
export const googleStudioAgent: AgentService = {
  async generateLesson({
    language,
    level,
    content,
  }: GenerateLessonRequest): Promise<GenerateLessonResponse> {
    const prompt = buildLessonPrompt({
      language,
      level,
      content,
    });

    const response = await generateContent(prompt);
    console.log("===== RAW GEMINI =====");
    console.log(response.text);
    const lesson = parseJson<LessonSchema>(response.text);

    return {
      lesson,
    };
  },

  async generateQuiz({
    courseId,
    lessons,
    difficulty,
    questionCount,
    questionTypes,
  }: GenerateQuizRequest): Promise<GenerateQuizResponse> {
    const prompt = buildQuizPrompt({
      courseId,
      lessons,
      difficulty,
      questionCount,
      questionTypes,
    });

    const response = await generateContent(prompt);

    const exercises = parseJson<Exercise[]>(response.text);

    return {
      exercises,
    };
  },

  async evaluateAnswer(
    request: EvaluateAnswerRequest,
  ): Promise<EvaluateAnswerResponse> {
    throw new Error("Not implemented");
  },
};
