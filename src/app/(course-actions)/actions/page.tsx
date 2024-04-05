import CourseCard from "@/components/shared/courses/CourseCard";
import CustomDialog from "@/components/shared/courses/CustomDialog";
import { Button } from "@/components/ui/button";
import { dummyCardContent } from "@/lib/constant";
import { Plus } from "lucide-react";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function Page() {
  // get Ip

  const fallBack = "0.0.0.0";
  let ip = headers().get("x-forwarded-for");
  if (!ip) {
    ip = headers().get("x-real-ip") ?? fallBack;
  } else ip.split(",")[0];

  // get User Id

  const { userId } = auth();

  if (!userId) throw redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw redirect("/sign-in");
  if (!user.isCourseCreator) throw redirect("/");

  return (
    <main className="min-h-screen py-16 pt-32 relative w-full h-full">
      <div className="flex flex-col gap-8 max-w-screen-xl h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <CustomDialog userId={user.id} ip={ip}>
          <Button variant="ghost" className="w-12 h-12 self-end" size="sm">
            <Plus className="w-5 h-5 text-slate-400" />
          </Button>
        </CustomDialog>
        <h1 className="text-white font-bold text-3xl">Your courses</h1>
        <div className="flex flex-wrap gap-4 justify-center items-center w-full h-full">
          {dummyCardContent.map((item: any, index: number) => (
            <CourseCard
              userId={user.id}
              ip={ip}
              isAction={true}
              key={index}
              content={item}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
