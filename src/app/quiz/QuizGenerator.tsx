"use client";

import { useState } from "react";

import { getLessons } from "@/features/lesson/services/storage";

import { QuizPlayer } from "@/features/practice/components/quiz/QuizPlayer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GenerateQuizResponse } from "@/services/ai/types";
import { getCourses } from "@/features/course/services/storage";
import { useSearchParams } from "next/navigation";

export  function QuizGeneratorPage() {
  const searchParams = useSearchParams();

  const initialLessonId = searchParams.get("lessonId");
  const lessons = getLessons();
  const courses = getCourses();

  const [courseId, setCourseId] = useState(() => {
    if (initialLessonId) {
      return lessons.find((l) => l.id === initialLessonId)?.courseId ?? "";
    }

    return courses[0]?.id ?? "";
  });

  const filteredLessons = lessons.filter(
    (lesson) => lesson.courseId === courseId,
  );

  const [lessonId, setLessonId] = useState(() => {
    if (initialLessonId) {
      return initialLessonId;
    }

    return filteredLessons[0]?.id ?? "";
  });

  const [difficulty, setDifficulty] = useState("medium");

  const [questionCount, setQuestionCount] = useState(20);

  const [loading, setLoading] = useState(false);

  const [quiz, setQuiz] = useState<GenerateQuizResponse | null>(null);

  function handleCourseChange(id: string) {
    setCourseId(id);

    const firstLesson = lessons.find((lesson) => lesson.courseId === id);

    setLessonId(firstLesson?.id ?? "");
  }
  async function handleGenerate() {
    const lesson = lessons.find((lesson) => lesson.id === lessonId);

    if (!lesson) return;

    try {
      setLoading(true);

      const response = await fetch("/api/ai/generate-quiz", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          courseId: lesson.courseId,
          lessons: [lesson],
          difficulty,
          questionCount,
          questionTypes: ["multiple_choice", "fill_blank"],
        }),
      });

      const result: GenerateQuizResponse = await response.json();

      if (!response.ok) {
        throw new Error("Failed to generate quiz!.");
      }

      setQuiz(result);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to generate quiz!!.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (quiz) {
    return (
      <QuizPlayer
        title="AI Generated Quiz"
        exercises={quiz.exercises}
        onFinish={(score) => {
          console.log("Score:", score);
        }}
        courseId={courseId}
        lessonId={lessonId}
      />
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Generate AI Quiz</h1>

        <p className="text-muted-foreground">
          Generate a new quiz from your lesson.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course</CardTitle>
        </CardHeader>

        <CardContent>
          <Select value={courseId} onValueChange={handleCourseChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select course" />
            </SelectTrigger>

            <SelectContent position="popper" align="start">
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lesson</CardTitle>
        </CardHeader>

        <CardContent>
          <Select value={lessonId} onValueChange={setLessonId}>
            <SelectTrigger>
              <SelectValue placeholder="Select lesson" />
            </SelectTrigger>

            <SelectContent position="popper" align="start">
              {filteredLessons.map((lesson) => (
                <SelectItem key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Difficulty</CardTitle>
        </CardHeader>

        <CardContent>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent position="popper" align="start">
              <SelectItem value="easy">Easy</SelectItem>

              <SelectItem value="medium">Medium</SelectItem>

              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Number of Questions</CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            type="number"
            min={5}
            max={100}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />
        </CardContent>
      </Card>

      <Button className="w-full" disabled={loading} onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate Quiz"}
      </Button>
    </div>
  );
}
