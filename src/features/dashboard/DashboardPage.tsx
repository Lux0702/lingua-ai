"use client";

import { WelcomeCard } from "./components/WelcomeCard";
import { StatCard } from "./components/StatCard";
import { ContinueLearningCard } from "./components/ContinueLearningCard";
import { RecentCoursesCard } from "./components/RecentCoursesCard";
import { RecentLessonsCard } from "./components/RecentLessonsCard";

import { useDashboard } from "./hooks/useDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export function DashboardPage() {
  const { stats, recentLessons, continueLesson, recentCourses } =
    useDashboard();

  // 👇 Đặt ở đây
  if (recentLessons.length === 0) {
    return (
      <div className="space-y-8">
        <WelcomeCard />

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No lessons yet.</p>

            <Button asChild className="mt-4">
              <Link href="/import">Import Lesson</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeCard />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ContinueLearningCard lesson={continueLesson} />
        <RecentCoursesCard courses={recentCourses} />
      </div>

      <RecentLessonsCard lessons={recentLessons} />
    </div>
  );
}
