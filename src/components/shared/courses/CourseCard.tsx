"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import CustomDialog from "./CustomDialog";
import { Course } from "@prisma/client";

export default function CourseCard({
  userId,
  content,
  isAction = false,
  ip,
}: {
  userId?: string;
  content: Course;
  isAction?: boolean;
  ip?: string
}) {
  return (
    <Link href={isAction ? "#" : `/courses/course/${content.id}`}>
      <Card className="hover:scale-105 transition-all duration-300 py-4 sm:w-[375px] w-[300px] max-[375px]:w-full">
        <CardContent className="flex flex-col gap-2 h-full">
          <Image
            src={content.imageUrl}
            alt={content.name}
            width={500}
            height={500}
            className="w-full h-72 rounded-xl object-cover"
          />
          <h1 className="text-white font-bold text-lg">{content.name}</h1>
          <h3 className="font-medium text-gray-600">Overview</h3>
          <p className="text-gray-400">
            {content.description.slice(0, 70).concat("...")}
          </p>
        </CardContent>
        {isAction && userId && ip && (
          <CardFooter className="flex justify-between">
            <form action="/update" method="get">
              <CustomDialog userId={userId} ip={ip} isUpdate={true}>
                <Button variant="ghost" size="sm">
                  <Pencil className="w-5 h-5 text-slate-400" />
                </Button>
              </CustomDialog>
            </form>
            <form action="/delete" method="get">
              <Button variant="ghost" size="sm">
                <Trash className="w-5 h-5 text-slate-400" />
              </Button>
            </form>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
