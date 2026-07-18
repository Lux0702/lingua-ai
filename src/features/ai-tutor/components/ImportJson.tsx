"use client";

import { useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { LessonPreview } from "@/features/lesson";
import { lessonSchema, lessonsSchema ,type LessonSchema } from "@/schemas/lesson";
import { useCourses } from "@/hooks/useCourses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateLessons } from "@/hooks/useLessons";

export function ImportPage() {
  const [json, setJson] = useState("");
  const { data: courses } = useCourses();
  const [courseId, setCourseId] = useState<string>("");
  const { mutateAsync: createLessons, isPending } = useCreateLessons();

  const [lesson, setLesson] = useState<LessonSchema[] | null>(null);
  const [error, setError] = useState("");
  const router = useTransitionRouter();
  function handlePreview() {
    try {
      const parsed = lessonsSchema.parse(JSON.parse(json));

      setLesson(parsed);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Invalid lesson JSON.");
    }
  }

  async function handleSave() {
    if (!lesson) return;
    const payload = lesson.map(({ _id, ...lesson }) => ({
      ...lesson,
      ...(courseId ? { courseId: courseId } : {}),
    }));
    await createLessons(payload).then(() => {
      router.push("/");
    });

    // console.log("Save lesson", lesson.lesson);
  }

  function handleBack() {
    setLesson(null);
    setJson("");
  }

  if (lesson) {
    return (
      <main className="mx-auto max-w-6xl p-8">
        <LessonPreview
          lessons={lesson}
          onSave={handleSave}
          loading={isPending}
          onBack={handleBack}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Import Lesson</h1>
      <div className="py-2">
        <label className="mb-2 block text-sm font-medium">
          Choose course(Optional)
        </label>

        <Select
          value={courseId}
          onValueChange={(value) => {
            setCourseId(value);
          }}
        >
          <SelectTrigger className="min-w-[300px]">
            <SelectValue placeholder="Select a course to add a lesson." />
          </SelectTrigger>

          <SelectContent position="popper" align="start">
            {courses?.map((course) => (
              <SelectItem key={course._id} value={course._id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
