"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import CustomDialog from "./CustomDialog";
import { Course } from "@prisma/client";
import { deleteCourse } from "@/lib/actions/course.action";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CourseCard({
  content,
  isAction = false,
  ip,
}: {
  userId?: string;
  content: Course;
  isAction?: boolean;
  ip?: string;
}) {
  const data = {
    title: content.name,
    description: content.description,
    price: content.price,
    imageUrl: content.imageUrl,
    id: content.id,
  };

  const router = useRouter();

  async function handleDelete() {
    const deleted = await deleteCourse(content.id);
    if (deleted) router.push("/actions");
  }

  return (
    <>
      {!(isAction && ip) ? (
        <Link role="course-card" href={isAction ? "#" : `/courses/course/${content.id}`}>
          <Card className="hover:scale-105 transition-all duration-300 py-4 sm:w-[375px] w-[300px] max-[375px]:w-full">
            <CardContent className="flex flex-col gap-2 h-full">
              <Image
        role="course-card-image"
                src={content.imageUrl as string}
                alt={content.name}
                width={500}
                height={500}
                className="w-full h-72 rounded-xl object-cover"
              />
              <h1 role="course-card-title" className="text-white font-bold text-lg">
                {content.name.length > 30
                  ? content.name.slice(0, 30).concat("...")
                  : content.name}
              </h1>
              <h3 className="font-medium text-gray-600">Overview</h3>
              <p role="course-card-description" className="text-gray-400">
                {content.description.length > 100
                  ? content.description.slice(0, 100).concat("...")
                  : content.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <Card role="course-card" className="hover:scale-105 transition-all duration-300 py-4 sm:w-[375px] w-[300px] max-[375px]:w-full">
          <CardContent className="flex flex-col gap-2 h-full">
            <Image
              src={content.imageUrl as string}
              alt={content.name}
              width={500}
              height={500}
              className="w-full h-72 rounded-xl object-cover"
            />
            <h1 className="text-white font-bold text-lg">
              {content.name.length > 30
                ? content.name.slice(0, 30).concat("...")
                : content.name}
            </h1>
            <h3 className="font-medium text-gray-600">Overview</h3>
            <p className="text-gray-400 h-14">
              {content.description.length > 100
                ? content.description.slice(0, 100).concat("...")
                : content.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CustomDialog data={data as any} ip={ip} isUpdate={true}>
              <Button role="course-action-update" variant="ghost" size="sm">
                <Pencil className="w-5 h-5 text-slate-400" />
              </Button>
            </CustomDialog>
            <AlertDialog>
              <AlertDialogTrigger role="course-action-delete" asChild>
                <Button variant="ghost" size="sm">
                  <Trash className="w-5 h-5 text-slate-400" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this course from our database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
