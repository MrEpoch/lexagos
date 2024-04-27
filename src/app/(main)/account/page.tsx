import CoursesContent from "@/components/shared/courses/CoursesContent";
import {
  getUserCoursePages,
  getUserCourses,
} from "@/lib/actions/course.action";
import { Course } from "@prisma/client";

export default async function Page({ searchParams }: { searchParams: any }) {
  const courses = ((await getUserCourses({})) as Course[]) ?? [];
  const coursePageCount = (await getUserCoursePages()) ?? 0;
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="min-h-screen w-full pt-32 pb-16">
      <div className="max-w-screen-xl h-full flex flex-col mx-auto w-full">
        <h1 role="account-heading" className="text-3xl font-bold">
          Your courses:
        </h1>
        <hr className="my-4" />
        {courses.length > 0 ? (
          <CoursesContent
            page={page}
            totalPages={coursePageCount}
            courses={courses}
          />
        ) : (
          <p role="no-courses">No courses</p>
        )}
      </div>
    </div>
  );
}
