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
        <section className="text-gray-300 body-font overflow-hidden">
          <div className="flex gap-4 md:flex-row flex-col">
            <Image
              alt={course.data.name}
              className="w-full  h-auto aspect-square object-cover object-center rounded"
              src={course.data.imageUrl || ""}
              width={1000}
              height={1000}
            />
            <div className="min-h-full w-full flex flex-col gap-2 justify-center">
              <h1 className="text-gray-100 text-3xl title-font font-medium mb-1">
                {course.data.name}
              </h1>
              <p className="leading-relaxed">{course.data.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-900 mb-5">
                <div className="flex justify-between w-full">
                  <span className="title-font font-medium w-fit text-2xl text-gray-100">
                    ${course.data.price}
                  </span>
                  <AddCourseToUser courseId={course.data.id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
