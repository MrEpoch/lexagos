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
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-full">
        <ScrollArea className="h-full">
          <DialogHeader>
            <DialogTitle>
              {isUpdate ? "Update course" : "Create course"}
            </DialogTitle>
            <DialogDescription>Fill in course information</DialogDescription>
          </DialogHeader>
          <ActionForm data={data as any} userIp={ip} isUpdate={isUpdate} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
