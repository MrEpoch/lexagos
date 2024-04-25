"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActionForm from "./ActionForm";
import { useLang } from "@/providers/LangContext";
import { formCreateText, formUpdateText } from "@/texts/Course-actions";

export default function CustomDialog({
  isUpdate = false,
  children,
  ip,
  data,
}: {
  isUpdate?: boolean;
  children: React.ReactNode;
  ip: string;
  data?: {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    id: string;
  };
}) {

  const { isEnglish } = useLang() as { isEnglish: boolean };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent  role="dialog-window" className="h-full">
        <ScrollArea className="h-full">
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? (formUpdateText[(isEnglish ?? true) ? "en" : "cz"].header) : (formCreateText[(isEnglish ?? true) ? "en" : "cz"].header)}
            </DialogTitle>
            <DialogDescription>{formUpdateText[(isEnglish ?? true) ? "en" : "cz"].headerPara}</DialogDescription>
          </DialogHeader>
          <ActionForm data={data as any} userIp={ip} isUpdate={isUpdate} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
