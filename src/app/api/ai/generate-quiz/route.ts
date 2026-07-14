import { NextResponse } from "next/server";

import { googleStudioAgent } from "@/services/ai/google-studio";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.courseId) {
      return NextResponse.json(
        { message: "Course is required." },
        { status: 400 },
      );
    }

    if (!Array.isArray(body.lessons) || body.lessons.length === 0) {
      return NextResponse.json(
        { message: "At least one lesson is required." },
        { status: 400 },
      );
    }

    const result = await googleStudioAgent.generateQuiz(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate quiz error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to generate quiz.!!!",
      },
      {
        status: 500,
      },
    );
  }
}
