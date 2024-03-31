import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function HomeAccordion() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-around">
      <div>
        <h3 className="text-3xl sm:text-4xl text-center font-bold mb-8">
          Frequently asked questions
        </h3>
        <Image
          src="/assets/question-mark.svg"
          alt="Question mark"
          width={500}
          height={500}
          className="shadow-2xl h-full object-cover transition-shadow duration-300 ease-in-out"
        />
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is Lexagos free?</AccordionTrigger>
          <AccordionContent>
            Partly, some of our courses are free, mainly basic ones.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Are courses new?</AccordionTrigger>
          <AccordionContent>
            Yes! Most of our courses were create in years 2022-2024, so they are
            relatively new.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            Just sign up, if you want to learn advanced subjects buy membership.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
