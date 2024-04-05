"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { errorKinds } from "@/lib/constant";

export default function ErrorHandler() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get("error") && toast) {
      const error =
        errorKinds[searchParams.get("error") as keyof typeof errorKinds];
      toast({
        title: "Unknown Error",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast]);

  return <></>;
}
