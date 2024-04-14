"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/providers/LangContext";
import { section4Home } from "@/texts/Home";

export function AccordionClient() {
  const { isEnglish } = useLang();
  return (
    <>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {section4Home[isEnglish ?? true ? "en" : "cz"].accordion1.heading}
        </AccordionTrigger>
        <AccordionContent>
          {section4Home[isEnglish ?? true ? "en" : "cz"].accordion1.content}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          {section4Home[isEnglish ?? true ? "en" : "cz"].accordion2.heading}
        </AccordionTrigger>
        <AccordionContent>
          {section4Home[isEnglish ?? true ? "en" : "cz"].accordion2.content}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          {section4Home[isEnglish ?? true ? "en" : "cz"].accordion3.heading}
        </AccordionTrigger>
        <AccordionContent>
          {section4Home[isEnglish ?? true ? "en" : "cz"].accordion3.content}
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export function HeadingSection() {
  const { isEnglish } = useLang();

  return (
    <h3 className="text-3xl sm:text-4xl text-center font-bold mb-8">
      {section4Home[isEnglish ?? true ? "en" : "cz"].heading}
    </h3>
  );
}
