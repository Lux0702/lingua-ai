import { googleStudioAgent } from "@/services/ai/google-studio";
import { AI_TASKS } from "@/services/ai";

export default async function TestAIPage() {
  const result = await googleStudioAgent.generateLesson({
    task: AI_TASKS.GENERATE_LESSON,
    language: "zh",
    level: "beginner",
    materials: "Generate a lesson about Greetings in Chinese.",
  });

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
