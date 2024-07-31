"use client";
import { useLang } from "@/providers/LangContext";
import { section1Home } from "@/texts/Home";
import Link from "next/link";
import React from "react";

export default function HomeLandingTextClient() {
  const { isEnglish } = useLang() as {
    isEnglish: boolean;
  };
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {section1Home[(isEnglish ?? true) ? "en" : "cz"].heading}
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
        {section1Home[(isEnglish ?? true) ? "en" : "cz"].para}
      </p>
      <div className="flex flex-col gap-6 space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <Link
          href="/courses"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          {section1Home[(isEnglish ?? true) ? "en" : "cz"].btnStart}
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <Link
          href="/about"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          {section1Home[(isEnglish ?? true) ? "en" : "cz"].btnMore}
        </Link>
      </div>
    </>
  );
}
