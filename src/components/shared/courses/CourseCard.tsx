"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ content }: any) {
  return (
    <Link href={content.link}>
      <Card className="hover:scale-105 transition-all duration-300 py-4 sm:w-[375px] w-[300px] max-[375px]:w-full">
        <CardContent className="flex flex-col gap-2">
          <Image
            src={content.imgSrc}
            alt={content.name}
            width={500}
            height={500}
            className="w-full rounded-xl object-cover"
          />
          <h1 className="text-white font-bold text-lg">{content.title}</h1>
          <h3 className="font-medium text-gray-600">{content.type}</h3>
          <p className="text-gray-400">
            {content.description.slice(0, 70).concat("...")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
