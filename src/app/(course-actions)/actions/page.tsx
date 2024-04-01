import CourseCard from "@/components/shared/courses/CourseCard";
import CustomDialog from "@/components/shared/courses/CustomDialog";
import { Button } from "@/components/ui/button";
import { dummyCardContent } from "@/lib/constant";
import { Plus } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen py-16 pt-32 relative w-full h-full">
      <div className="flex flex-col gap-8 max-w-screen-xl h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <CustomDialog>
          <Button variant="ghost" className="w-12 h-12 self-end" size="sm">
            <Plus className="w-5 h-5 text-slate-400" />
          </Button>
        </CustomDialog>
        <h1 className="text-white font-bold text-3xl">Your courses</h1>
        <div className="flex flex-wrap gap-4 justify-center items-center w-full h-full">
          {dummyCardContent.map((item: any, index: number) => (
            <CourseCard isAction={true} key={index} content={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
