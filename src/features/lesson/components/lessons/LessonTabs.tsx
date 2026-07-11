"use client";

import { Button } from "@/components/ui/button";

import { LESSON_TABS } from "../../constants";

interface LessonTabsProps {
  value: number;

  onChange(index: number): void;
}

export function LessonTabs({ value, onChange }: LessonTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {LESSON_TABS.map((tab, index) => (
        <Button
          key={tab}
          variant={value === index ? "default" : "outline"}
          onClick={() => onChange(index)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
