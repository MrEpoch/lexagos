"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomField from "../CustomField";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import ImageHandler from "./ImageHandler";
import { CourseProps, createCourse } from "@/lib/actions/course.action";
import { useRouter } from "next/navigation";
import { FILE_TYPES } from "@/lib/constant";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  description: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(200, { message: "Must be 200 or fewer characters long" }),
  price: z
    .string()
    .min(1, { message: "Must be 1 or more characters long" })
    .max(4, { message: "Must be 4 or fewer characters long" }),
  image: 
    z.any(),
  isSaved: z.boolean().optional(),
});

export default function ActionForm({
  title,
  description,
  price,
  isUpdate = false,
  imageSaved,
  userIp,
  userId
}: {
  title?: string;
  description?: string;
  price?: string;
  isUpdate: boolean;
  imageSaved?: string;
  userIp: string;
  userId: string
}) {

  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: imageSaved
      ? {
          title: title,
          description: description,
          price: price,
          isSaved: true,
        }
      : {
          title: "",
          description: "",
          price: "",
        },
  });
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmitting(true);
    console.log(data);

    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      })
      setSubmitting(false);
      return;
    }

    if (!FILE_TYPES.includes(image.type) || image.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Please select a valid image",
        variant: "destructive",
      })
      setSubmitting(false);
      return;
    }

    const submitData = {
      name: data.title as string,
      description: data.description as string,
      price: parseInt(data.price) as number,
      image: image as File,
      userId: userId as string,
    } as CourseProps;
    console.log(userIp, submitData);
    console.log(form.formState.errors, form.formState.isSubmitted);

      if (isUpdate) {
        console.log("update");
      } else {
        console.log("create");
        // const course = await createCourse({ data: submitData, requestIp: userIp });
        // if (course) {
          //  form.reset();
          // router.push(`/courses`);
          //}
      }
    console.log("after create");

    setSubmitting(false);
    return;
  }

  useEffect(() => {
    if (Object.keys(form.formState.errors).length && form.formState.isSubmitted) {
      console.log(form.formState.errors);
      toast({
        title: "Wrong values",
        description: "Title 3-50, Description 3-200, Price $1-$9999",
        variant: "destructive",
      });
    }
  }, [form.formState.errors, form.formState.isSubmitted]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Title (3-50 characters)*"
          render={({ field }) => <Input value={field.value} {...field} />}
        />
        <CustomField
          control={form.control}
          name="description"
          formLabel="Description (3-200 characters)*"
          render={({ field }) => <Textarea value={field.value} {...field} />}
        />
        <CustomField
          control={form.control}
          name="price"
          formLabel="Price ($1-$9999)*"
          render={({ field }) => (
            <Input value={field.value} {...field} type="number" />
          )}
        />
        <ImageHandler
          savedImage={imageSaved}
          form={form}
          image={image}
          setImage={setImage}
        />
        <Button disabled={submitting} type="submit">
          {isUpdate ? "Update course" : "Create course"}
        </Button>
      </form>
    </Form>
  );
}
