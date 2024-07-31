"use client";
import { useLang } from "@/providers/LangContext";
import { coursesPage } from "@/texts/Course-actions";
import React from "react";
export const CoursePageHeading = () => {
  const { isEnglish } = useLang() as { isEnglish: boolean };

  return (
    <header className="">
      <h1 className="text-3xl font-semibold text-start w-full">
        {coursesPage[(isEnglish ?? true) ? "en" : "cz"].header}:
      </h1>
      <p className="mt-4 max-w-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
        praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
        natus?
      </p>
    </header>
  );
};
