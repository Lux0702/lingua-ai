import type { Course } from "../types"
import type { Module } from "../types";
export const courses: Course[] = [
  {
    id: "acc",
    title: "A Course in Contemporary Chinese",
    language: "Chinese",
    level: "Book 1",
    lessons: 15,
  },
  {
    id: "hsk3",
    title: "HSK Standard Course",
    language: "Chinese",
    level: "HSK 3",
    lessons: 20,
  },
  {
    id: "egu",
    title: "English Grammar in Use",
    language: "English",
    level: "Intermediate",
    lessons: 145,
  },
];

export const courseLessons = {
  acc: [
    { id: "l1", title: "Lesson 1" },
    { id: "l2", title: "Lesson 2" },
    { id: "l3", title: "Lesson 3" },
  ],

  hsk3: [
    { id: "1", title: "Lesson 1" },
    { id: "2", title: "Lesson 2" },
  ],

  egu: [
    { id: "1", title: "Unit 1" },
    { id: "2", title: "Unit 2" },
  ],
};

export const modules: Module[] = [
  {
    id: "module-1",
    title: "Module 1",

    lessons: [
      {
        id: "lesson-1",
        title: "Greetings",
      },
      {
        id: "lesson-2",
        title: "Numbers",
      },
      {
        id: "lesson-3",
        title: "Self Introduction",
      },
    ],
  },

  {
    id: "module-2",
    title: "Module 2",

    lessons: [
      {
        id: "lesson-4",
        title: "Family",
      },
      {
        id: "lesson-5",
        title: "School",
      },
    ],
  },
];
