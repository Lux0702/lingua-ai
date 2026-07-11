import type {
  GenerateLessonRequest,
  GenerateLessonResponse,
  GenerateQuizRequest,
  GenerateQuizResponse,
  EvaluateAnswerRequest,
  EvaluateAnswerResponse,
} from "./types";

export interface AgentService {
  generateLesson(
    request: GenerateLessonRequest,
  ): Promise<GenerateLessonResponse>;

  generateQuiz(request: GenerateQuizRequest): Promise<GenerateQuizResponse>;

  evaluateAnswer(
    request: EvaluateAnswerRequest,
  ): Promise<EvaluateAnswerResponse>;
}
