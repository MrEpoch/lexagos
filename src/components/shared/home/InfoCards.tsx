"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { homePageCards } from "@/lib/constant";
import { useLang } from "@/providers/LangContext";
import { section2Home } from "@/texts/Home";
import React from "react";

export default function InfoCards() {
  const { isEnglish } = useLang() as { isEnglish: boolean };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen h-full w-full mt-8">
      <h1 className="text-3xl sm:text-4xl text-center font-bold mb-8">
        {section2Home[isEnglish ?? true ? "en" : "cz"].heading.split1}{" "}
        <span className="bg-gradient-to-br from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">
          {section2Home[isEnglish ?? true ? "en" : "cz"].heading.split2}
        </span>{" "}
        {section2Home[isEnglish ?? true ? "en" : "cz"].heading.split3}
      </h1>
      <HoverEffect
        className="h-full w-full"
        items={homePageCards[isEnglish ?? true ? "en" : "cz"]}
      />
    </div>
  );
}
