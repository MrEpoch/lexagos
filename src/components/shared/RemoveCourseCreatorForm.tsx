"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { courseCreatorRemove } from "@/lib/actions/user.action";
import { useLang } from "@/providers/LangContext";
import { formCreatorManage } from "@/texts/Course-actions";

const formSchema = z.object({
  email: z.string().email(),
});

export function RemoveCourseCreatorForm({ ip }: { ip: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { isEnglish } = useLang() as { isEnglish: boolean };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    try {
      const creatorAdd = await courseCreatorRemove(values.email, ip);
      if (creatorAdd) {
        toast({
          title: "Success",
          description: "Creator removed successfully",
          variant: "default",
        });
        form.reset();
      }
    } catch (e) {}
    setSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="project@mail.com" {...field} />
              </FormControl>
              <FormDescription>
                {formCreatorManage[isEnglish ?? true ? "en" : "cz"].para2}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={submitting} type="submit">
          {formCreatorManage[isEnglish ?? true ? "en" : "cz"].btn2}
        </Button>
      </form>
    </Form>
  );
}
