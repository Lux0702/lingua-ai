"use client";

import { useState } from "react";

import { UploadCard } from "@/features/upload";
// import { aiClient } from "@/services/ai";
import type { GenerateLessonResponse } from "@/services/ai/types";
import { LessonPreview } from "@/features/lesson";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<GenerateLessonResponse | null>(null);

  async function handleUpload(file: File) {
    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append("language", "zh");

    formData.append("level", "beginner");

    const response = await fetch("/api/ai/generate-lesson", {
      method: "POST",
      body: formData,
    });
    const lesson = await response.json();
    setLesson(lesson);
    console.log(lesson);

    setLoading(false);
  }
  async function handleSave() {
    console.log("Save lesson");
  }

  return (
    <main className="mx-auto max-w-3xl p-10">
      <UploadCard onUpload={handleUpload} />

      {loading && <p>Generating lesson...</p>}
      {lesson && <LessonPreview lesson={lesson.lesson} onSave={handleSave} />}
    </main>
  );
}
