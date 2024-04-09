import CoursesContent from "@/components/shared/courses/CoursesContent";
import { getCourses, getPageCount } from "@/lib/actions/course.action";
import React from "react";

export default async function Page({ searchParams }: { searchParams: any }) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const courses = (await getCourses(12, page)) || [];
  const pageCount = (await getPageCount(12, searchQuery)) || 1;

  return (
    <main className="w-full py-16 md:py-32 h-full min-h-screen">
      <div className="max-w-screen-xl flex items-center flex-col gap-1 justify-between h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <CoursesContent page={page} totalPages={pageCount} courses={courses} />
      </div>
    </main>
  );
}
