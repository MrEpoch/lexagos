import CoursesContent from "@/components/shared/courses/CoursesContent";
import { getUserCoursePages, getUserCourses } from "@/lib/actions/course.action";
import { Course } from "@prisma/client";

export default async function Page({ searchParams }: { searchParams: any }) {
  const courses = await getUserCourses({}) as Course[] ?? [];
  const coursePageCount = await getUserCoursePages() ?? 0;
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="min-h-screen w-full pt-32 pb-16">
      <div className="max-w-screen-xl h-full flex flex-col mx-auto w-full">
        <h1>Account</h1>
        {courses.length > 0 ? <CoursesContent page={page} totalPages={coursePageCount} courses={courses} /> : <p>No courses</p>}
      </div>
    </div>
  )
}
