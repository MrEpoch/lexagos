"use client";
import { useLang } from "@/providers/LangContext";
import { section2About } from "@/texts/About";
import React from "react";

export default function AboutHeading() {
  const { isEnglish } = useLang();

  return (
    <span className="bg-gradient-to-br from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">
      {section2About[isEnglish ?? true ? "en" : "cz"].heading}
    </span>
  );
}
