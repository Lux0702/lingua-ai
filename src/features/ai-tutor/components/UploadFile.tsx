"use client";

import { useState } from "react";

import { LessonPreview } from "@/features/lesson";
import { UploadCard } from "@/features/upload";

import type { GenerateLessonResponse } from "@/services/ai/types";
import type { Language, Level } from "@/services/ai/contracts";
import { useTransitionRouter } from "next-view-transitions";
import { useCreateLessons } from "@/hooks/useLessons";

interface UploadRequest {
  file: File;
  language: Language;
  level: Level;
}

export function UploadPage() {
  const [loading, setLoading] = useState(false);
  const router = useTransitionRouter();
  const [courseId, setCourseId] = useState("");
  const { mutateAsync: createLessons, isPending } = useCreateLessons();

  const [lesson, setLesson] = useState<GenerateLessonResponse | null>(null);

  async function handleUpload({ file, language, level }: UploadRequest) {
    try {
      setLoading(true);
      setLesson(null);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("language", language);
      formData.append("level", level);

      const response = await fetch("/api/ai/generate-lesson", {
        method: "POST",
        body: formData,
      });

      console.log("Status:", response.status);

      // Đọc response dưới dạng text trước để debug
      const raw = await response.text();

      console.log("Response:");
      console.log(raw);

      // Nếu API lỗi
      if (!response.ok) {
        console.error("API error:", response?.status, response);
        throw new Error(`HTTP ${response.status}\n${raw}`);
      }

      // Parse JSON
      const data: GenerateLessonResponse = JSON.parse(raw);

      setLesson(data);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error ? error.message : "Failed to generate lesson.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!lesson) return;
    const payload = lesson.lesson.map(({ _id, courseId: _, ...lesson }) => ({
      ...lesson,
      ...(courseId ? { courseId: courseId } : {}),
    }));
    await createLessons(payload);
    router.push("/");

    // console.log("Save lesson", lesson.lesson);
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8 p-8">
      <UploadCard
        loading={loading}
        onUpload={handleUpload}
        onCourseChange={setCourseId}
      />

      {loading && (
        <div className="rounded-lg border p-6 text-center">
          Generating lesson...
        </div>
      )}

      {lesson && (
        <LessonPreview
          lessons={lesson.lesson}
          onSave={handleSave}
          loading={isPending}
        />
      )}
    </main>
  );
}
