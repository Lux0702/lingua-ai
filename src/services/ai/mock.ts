import { lesson } from "@/mocks/lesson";

import { AgentService } from "./agent.service";
import type {} from "./types";

export const mockAgent: AgentService = {
  async generateLesson(_request) {
    console.log(_request);
    return { lesson };
  },

  async generateQuiz(_request) {
    console.log(_request);

    return { quiz: [] };
  },

  async evaluateAnswer(_request) {
    console.log(_request);

    return {
      correct: true,
      score: 100,
      explanation: "Correct answer.",
      feedback: "Great job!",
    };
  },
};
