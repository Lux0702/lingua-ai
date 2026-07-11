import type { DashboardCard, DashboardStat } from "../types";

export const dashboardCards: DashboardCard[] = [
  {
    id: "continue",
    title: "Continue Learning",
    description: "Continue your latest lesson.",
  },
  {
    id: "courses",
    title: "Courses",
    description: "Browse your learning courses.",
  },
];

export const dashboardStats: DashboardStat[] = [
  {
    id: "courses",
    title: "Courses",
    value: "3",
  },
  {
    id: "lessons",
    title: "Lessons",
    value: "18",
  },
  {
    id: "vocabulary",
    title: "Vocabulary",
    value: "526",
  },
  {
    id: "streak",
    title: "Learning Streak",
    value: "12 Days",
  },
];
export const continueLearning = {
  course: "A Course in Contemporary Chinese",
  lesson: "Lesson 5",
  progress: 68,
};
export const recentCourses = [
  {
    id: "1",
    title: "A Course in Contemporary Chinese",
    level: "Book 1",
  },
  {
    id: "2",
    title: "HSK Standard Course",
    level: "HSK 3",
  },
  {
    id: "3",
    title: "English Grammar in Use",
    level: "Intermediate",
  },
];

export const recentLessons = [
  {
    id: "1",
    title: "Lesson 5",
    course: "A Course in Contemporary Chinese",
    progress: 68,
  },
  {
    id: "2",
    title: "Lesson 12",
    course: "HSK Standard Course",
    progress: 100,
  },
  {
    id: "3",
    title: "Unit 4",
    course: "English Grammar in Use",
    progress: 35,
  },
];