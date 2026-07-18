"use client";

import { useParams } from "next/navigation";

import { useLesson } from "@/hooks/useLessons";

import { QuizPlayer } from "@/features/practice/components/quiz/QuizPlayer";


export function QuizPage() {
  const { lessonId } = useParams<{
    lessonId: string;
  }>();

  const {data:lesson} =useLesson(lessonId)


  if (!lesson) {
    return <div className="py-20 text-center">Lesson not found.</div>;
  }

  

  return (
    <QuizPlayer
      title={lesson.title}
      exercises={lesson.exercises}
      lessonId={lesson._id}
      courseId={lesson.courseId}
      saveProgress
    />
  );
}
