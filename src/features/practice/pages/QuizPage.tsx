"use client";

import { useParams } from "next/navigation";

import { getLesson } from "@/features/lesson/services/storage";

import { QuizPlayer } from "@/features/practice/components/quiz/QuizPlayer";


export function QuizPage() {
  const { lessonId } = useParams<{
    lessonId: string;
  }>();

  const lesson = getLesson(lessonId);


  if (!lesson) {
    return <div className="py-20 text-center">Lesson not found.</div>;
  }

  

  return (
    <QuizPlayer
      title={lesson.title}
      exercises={lesson.exercises}
      lessonId={lesson.id}
      courseId={lesson.courseId}
      saveProgress
    />
  );
}
