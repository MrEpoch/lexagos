"use client";
import { useLang } from "@/providers/LangContext";
import { sectionContact } from "@/texts/Contact";
import React from "react";

export default function ContactHeader() {
  const { isEnglish } = useLang();

  return (
    <>
      <h1 className="font-extrabold text-4xl lg:text-6xl">
        <span className="bg-gradient-to-br from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">
          {sectionContact[isEnglish ?? true ? "en" : "cz"].header}
        </span>
      </h1>
      <p className="max-w-sm text-xl mt-3 text-gray-100">
        {sectionContact[isEnglish ?? true ? "en" : "cz"].content1}
      </p>
    </>
  );
}
