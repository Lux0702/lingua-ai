import { agent } from "./provider";
import { AI_TASKS } from "./tasks";
import type {
  GenerateLessonRequest,
  GenerateQuizRequest,
  EvaluateAnswerRequest,
} from "./types";

export const aiClient = {
  generateLesson(request: Omit<GenerateLessonRequest, "task">) {
    return agent.generateLesson({
      ...request,
      task: AI_TASKS.GENERATE_LESSON,
    });
  },

  generateQuiz(request: Omit<GenerateQuizRequest, "task">) {
    return agent.generateQuiz({
      ...request,
      task: AI_TASKS.GENERATE_QUIZ,
    });
  },

  evaluateAnswer(request: Omit<EvaluateAnswerRequest, "task">) {
    return agent.evaluateAnswer({
      ...request,
      task: AI_TASKS.EVALUATE_ANSWER,
    });
  },
};
