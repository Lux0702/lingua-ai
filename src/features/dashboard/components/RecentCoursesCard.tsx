import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { recentCourses } from "../data/dashboard";
import { Badge } from "@/components/ui/badge";
import {LANGUAGES} from "@/features/course/constants";
import type { Course } from "@/features/course/types";
interface CourseCardProps {
  courses: Course[];
}
export function RecentCoursesCard({ courses }: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Courses</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {courses.map((course: Course) => (
            <li
              key={course.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{course.title}</p>
                </div>

                <Badge>{LANGUAGES[course.languageCode]}</Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
