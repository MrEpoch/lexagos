import CoursesContent from "@/components/shared/courses/CoursesContent";
import { dummyCardContent } from "@/lib/constant";
import React from "react";


export default async function Page({ searchParams }: { searchParams: any }) {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  return (
    <main className="w-full py-16 md:py-32 h-full min-h-screen">
      <div className="max-w-screen-xl flex items-center flex-col gap-1 justify-between h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <CoursesContent
          page={page}
          totalPages={10}
          courses={dummyCardContent}
        />
      </div>
    </main>
  );
}
