"use client";
import React from "react";
import CourseCard from "@/components/shared/courses/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { Course } from "@prisma/client";

export default function CoursesContent({
  totalPages,
  page,
  courses,
  isAction = false,
  ip,
  id
}: {
  totalPages: number;
  page: number;
  courses: Course[];
  isAction?: boolean;
  ip?: string;
  id?: string
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onPageChange(action: string) {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
    window.location.reload();
  }

  return (
    <div className="w-full">
      <div className="min-h-screen flex flex-wrap gap-4 justify-center items-center w-full h-full">
        {courses.map((item: Course, index: number) => (
          <CourseCard isAction={isAction} userId={id} ip={ip} key={index} content={item} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="px-6 py-4 flex items-center justify-center gap-3 rounded-full text-sm font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent
        w-32 bg-gradient bg-cover text-white
      "
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white"></PaginationPrevious>
            </Button>
            <p className="flex items-center justify-center text-sm font-medium w-fit flex-1">
              {page} / {totalPages}
            </p>
            <Button
              className="px-6 py-4 flex items-center justify-center gap-3 rounded-full text-sm font-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent
      w-32 bg-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
