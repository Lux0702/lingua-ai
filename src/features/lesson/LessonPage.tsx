"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Link } from "next-view-transitions";

import { getLesson } from "@/features/lesson/services/storage";
import { Progress } from "@/components/ui/progress";
import { LessonHeader } from "./components/lessons/LessonHeader";
import { LessonTabs } from "./components/lessons/LessonTabs";
import { LessonBody } from "./components/lessons/LessonBody";
import { Button } from "@/components/ui/button";
import { TOTAL_TABS } from "./constants";
import { useTransitionRouter } from "next-view-transitions";
export function LessonPage() {
  const { lessonId } = useParams();
  const lesson = getLesson(lessonId as string);
  const router = useTransitionRouter();
  const [tab, setTab] = useState(0);

  if (!lesson) {
    return <p>Lesson not found.</p>;
  }
  const progress = ((tab + 1) / TOTAL_TABS) * 100;
  function handleNext() {
    setTab((prev) => Math.min(prev + 1, TOTAL_TABS - 1));
  }

  function handlePrevious() {
    setTab((prev) => Math.max(prev - 1, 0));
  }

  return (
    <div className="space-y-6">
      <LessonHeader title={lesson.title} overview={lesson.overview} />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Lesson Progress</span>

          <span>{Math.round(progress)}%</span>
        </div>

        <Progress value={progress} />
      </div>
      <LessonTabs value={tab} onChange={setTab} />

      <LessonBody lesson={lesson} tab={tab} />
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={tab === 0}>
          Previous
        </Button>
        {tab === 6 ? (
          <div className="flex justify-end pt-8">
            <Button onClick={() => router.push(`/quiz?lessonId=${lesson.id}`)}>
              Practice with AI →
            </Button>
          </div>
        ) : tab === TOTAL_TABS - 2 ? (
          <Button asChild>
            <Link
              href={`/courses/${lesson.courseId}/lessons/${lesson.id}/practice`}
            >
              Finish & Practice 🎉
            </Link>
          </Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
}
