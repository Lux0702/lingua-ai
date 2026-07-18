"use client";

import { useEffect, useState } from "react";

import { CourseCard } from "../components/CourseCard";

import { useCourses } from "@/hooks/useCourses";
export function CoursePage() {
  const { data: courses = [], isLoading, error } = useCourses();
     if (isLoading) {
       return <p>Loading...</p>;
     }
      

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Courses</h1>

        <p className="text-muted-foreground">
          Choose a course to start learning.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-lg font-semibold">No courses found</h2>

          <p className="mt-2 text-muted-foreground">
            Import a lesson to create your first course.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
