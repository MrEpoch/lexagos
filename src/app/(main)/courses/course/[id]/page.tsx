import AddCourseToUser from "@/components/shared/courses/AddCourseToUser";
import { getCourseById } from "@/lib/actions/course.action";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface coursePageParams {
  params: {
    id: string;
  };
}

export default async function page({ params }: coursePageParams) {
  if (!params?.id) throw redirect("/courses");
  const course = await getCourseById(params?.id);

  if (!course || !course.data || course.error) throw redirect("/courses");

  return (
    <main className="min-h-screen w-full pb-16 pt-32">
      <div className="flex flex-col gap-8 max-w-screen-xl h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <h1 className="text-3xl font-semibold">{course.data.name}</h1>
        <Image
          src={course.data.imageUrl as string}
          className="sm:w-[675px] bg-gray-300 w-full object-cover self-center h-[400px]"
          alt={course.data.name}
          width={1500}
          height={1500}
        />
        <p className="text-lg">{course.data.description}</p>
        <AddCourseToUser courseId={course.data.id} />
      </div>
    </main>
  );
}
