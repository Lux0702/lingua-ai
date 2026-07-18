"use client";

import { useState } from "react";

import type { LessonsSchema } from "@/schemas/lesson";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LessonContent } from "./LessonContent";

interface LessonPreviewProps {
  lessons: LessonsSchema;

  onSave?(): void;

  onBack?(): void;
  loading?: boolean;
}

export function LessonPreview({ lessons, onSave, onBack, loading }: LessonPreviewProps) {
  const [selected, setSelected] = useState(lessons[0]._id ?? "");
  
  return (
    <>
      <Tabs defaultValue={selected} onValueChange={setSelected}>
        <TabsList>
          {lessons.map((lesson) => (
            <TabsTrigger key={lesson._id} value={lesson._id}>
              Lesson {lesson.lessonNumber}
            </TabsTrigger>
          ))}
        </TabsList>

        {lessons.map((lesson) => (
          <TabsContent key={lesson._id} value={lesson._id}>
            <LessonContent lesson={lesson} />
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>

        <Button onClick={onSave}>
          {loading ? "Saving..." : "Save"}
          </Button>
      </div>
    </>
  );
}
