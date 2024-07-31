"use client";
import { useLang } from "@/providers/LangContext";
import { courseActionText } from "@/texts/Course-actions";
import React from "react";

export function CourseActionsHeader1() {
  const { isEnglish } = useLang() as { isEnglish: boolean };

  return (
    <h1 role="course-action-header" className="text-white font-bold text-3xl">
      {courseActionText[(isEnglish ?? true) ? "en" : "cz"].header1}:
    </h1>
  );
}

export function CourseActionsHeader2() {
  const { isEnglish } = useLang() as { isEnglish: boolean };
  return (
    <h2 role="course-action-header" className="text-white font-bold text-3xl">
      {courseActionText[(isEnglish ?? true) ? "en" : "cz"].header2}:
    </h2>
  );
}
