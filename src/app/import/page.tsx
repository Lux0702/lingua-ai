"use client";

import { useState } from "react";
import { saveLesson } from "@/features/lesson/services/storage";
import { useRouter } from "next/navigation";
import { LessonPreview } from "@/features/lesson";
import { lessonSchema, type LessonSchema } from "@/schemas/lesson";
export default function ImportPage() {
  const [json, setJson] = useState("");
  const [lesson, setLesson] = useState<LessonSchema | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  function handlePreview() {
    try {
      const parsed = lessonSchema.parse(JSON.parse(json));

      setLesson(parsed);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Invalid lesson JSON.");
    }
  }

  function handleSave() {
    if (!lesson) return;

    saveLesson(lesson);

    router.push("/");
  }
  function handleBack() {
    setLesson(null);
    setJson("");
  }

  if (lesson) {
    return (
      <main className="mx-auto max-w-6xl p-8">
        <LessonPreview
          lesson={lesson}
          onSave={handleSave}
          onBack={handleBack}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Import Lesson</h1>

      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className="h-[500px] w-full rounded-xl border p-4 font-mono"
        placeholder="Paste lesson JSON here..."
      />

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <button
        onClick={handlePreview}
        className="mt-4 rounded-xl bg-black px-6 py-3 text-white"
      >
        Preview
      </button>
    </main>
  );
}
