"use client";
import { Button } from "@/components/ui/button";
import { addCourseToUser } from "@/lib/actions/course.action";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddCourseToUser({ courseId }: { courseId: string }) {
  const router = useRouter();

  async function addCourse() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await addCourseToUser(courseId);
    if (res?.error === false) {
      router.push("/account");
    }
  }

  return (
    <Button
      onClick={addCourse}
      type="button"
      variant="secondary"
      className="w-fit"
    >
      Enroll
    </Button>
  );
}
