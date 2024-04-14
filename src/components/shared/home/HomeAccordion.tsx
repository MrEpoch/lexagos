import React from "react";
import { Accordion } from "@/components/ui/accordion";
import Image from "next/image";
import { AccordionClient, HeadingSection } from "./HomeAccordionClient";

export default function HomeAccordion() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-around">
      <div className="flex items-center flex-col">
        <HeadingSection />
        <Image
          src="/assets/question-mark.svg"
          alt="Question mark"
          width={500}
          height={500}
          className="h-full w-64 self-center sm:w-[400px] object-cover  duration-300 ease-in-out"
        />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionClient />
      </Accordion>
    </div>
  );
}
