"use client";
import { useLang } from "@/providers/LangContext";
import { sectionContact } from "@/texts/Contact";
import React from "react";

export default function ContactFormButton() {
  const { isEnglish } = useLang();
  return (
    <button
      type="submit"
      className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-primary to-red-900 sm:w-fit hover:from-primary/90 hover:to-red-900 transition focus:ring-4 focus:outline-none focus:ring-primary"
    >
      {sectionContact[isEnglish ?? true ? "en" : "cz"].btn}
    </button>
  );
}
