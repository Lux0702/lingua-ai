import { NextResponse } from "next/server";

import { AI_TASKS, Language, Level } from "@/services/ai";
import { googleStudioAgent } from "@/services/ai/google-studio";
import { extractText } from "@/services/extractor";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "File is required." },
        { status: 400 },
      );
    }

    // 1. CHUYỂN ĐỔI FILE THÀNH BASE64
    const content = await extractText(file);

    const language = formData.get("language") as Language;
    const level = formData.get("level") as Level;

    const result = await googleStudioAgent.generateLesson({
      task: AI_TASKS.GENERATE_LESSON,
      language,
      level,
      content,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate lesson error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
