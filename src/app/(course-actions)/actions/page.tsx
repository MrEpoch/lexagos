import CustomDialog from "@/components/shared/courses/CustomDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCourses, getPageCount } from "@/lib/actions/course.action";
import CoursesContent from "@/components/shared/courses/CoursesContent";
import { AddCourseCreatorForm } from "@/components/shared/AddCourseCreatorForm";
import { RemoveCourseCreatorForm } from "@/components/shared/RemoveCourseCreatorForm";
import {
  CourseActionsHeader1,
  CourseActionsHeader2,
} from "@/components/shared/courses/CourseActionsHeader";
import { authCheck } from "@/lib/VerifyAuth";

export default async function Page({ searchParams }: { searchParams: any }) {
  // get Ip

  const fallBack = "0.0.0.0";
  let ip = headers().get("x-forwarded-for");
  if (!ip) {
    ip = headers().get("x-real-ip") ?? fallBack;
  } else ip.split(",")[0];

  // get User Id

  const { userId } = auth();

  if (!userId) throw redirect("/sign-in");

  const user = await authCheck(userId);

  const page = Number(searchParams?.page) || 1;
  const courses = (await getCourses(12, page, "", user.id)) || [];
  const pageCount = (await getPageCount(12)) || 1;

  return (
    <main className="min-h-screen py-16 pt-32 relative w-full h-full">
      <div className="flex flex-col gap-8 max-w-screen-xl h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <CustomDialog ip={ip}>
          <Button role="modal-btn-add" variant="ghost" className="w-12 h-12 self-end" size="sm">
            <Plus className="w-5 h-5 text-slate-400" />
          </Button>
        </CustomDialog>
        <CourseActionsHeader1 />
        <div className="flex flex-wrap gap-4 justify-center items-center w-full h-full">
          <CoursesContent
            page={page}
            totalPages={pageCount}
            courses={courses}
            ip={ip}
            isAction={true}
          />
        </div>
        <div className="w-full gap-8 py-16 flex flex-col">
          <CourseActionsHeader2 />
          <AddCourseCreatorForm ip={ip} />
          <RemoveCourseCreatorForm ip={ip} />
        </div>
      </div>
    </main>
  );
}
