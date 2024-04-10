import { Button } from "@/components/ui/button";
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
          className="sm:w-[675px] w-full object-cover self-center"
          alt={course.data.name}
          width={2000}
          height={2000}
        />
        <p className="text-lg">{course.data.description}</p>
        <Button type="button" variant="secondary" className="w-full">
          Enroll
        </Button>
      </div>
    </main>
  );
}
