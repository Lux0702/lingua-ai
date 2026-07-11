import { NextResponse } from "next/server";

import { AI_TASKS, Language, Level } from "@/services/ai";
import { googleStudioAgent } from "@/services/ai/google-studio";

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
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64"); // Lấy chuỗi base64

    const language = formData.get("language") as Language;
    const level = formData.get("level") as Level;

    const result = await googleStudioAgent.generateLesson({
      task: AI_TASKS.GENERATE_LESSON,
      language,
      level,
      fileName: file.name,
      mimeType: file.type,
      data: base64Data, // 2. TRUYỀN CHUỖI BASE64 THAY VÌ FILE OBJECT
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
