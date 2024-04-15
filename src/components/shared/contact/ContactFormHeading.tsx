"use client";
import { useLang } from "@/providers/LangContext";
import { sectionContact } from "@/texts/Contact";
import React from "react";

export default function ContactFormHeading() {
  const { isEnglish } = useLang() as { isEnglish: boolean };

  return (
    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-300 sm:text-xl">
      {sectionContact[isEnglish ?? true ? "en" : "cz"].content2}
    </p>
  );
}
