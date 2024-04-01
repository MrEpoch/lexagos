"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { errorKinds } from "@/lib/constant";

export default function ErrorHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get("error")) {
      const error =
        errorKinds[searchParams.get("error") as keyof typeof errorKinds];
      toast({
        title: error.title || "Unknown Error",
        description: error.description || "Please try again later.",
      });
    }
  }, []);

  return <></>;
}
