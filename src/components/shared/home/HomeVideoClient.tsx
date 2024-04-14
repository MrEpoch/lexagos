"use client";
import { useLang } from "@/providers/LangContext";
import { section3Home } from "@/texts/Home";
import React from "react";

export default function HomeVideoClient() {
  const { isEnglish } = useLang();

  return (
    <h1 className="text-3xl sm:text-4xl text-center font-bold mb-8">
      {section3Home[isEnglish ?? true ? "en" : "cz"].heading.split1}
      <span className="bg-gradient-to-br h-full from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">
        {section3Home[isEnglish ?? true ? "en" : "cz"].heading.split2}
      </span>{" "}
      {section3Home[isEnglish ?? true ? "en" : "cz"].heading.split3}
    </h1>
  );
}
