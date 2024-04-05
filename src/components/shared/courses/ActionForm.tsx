"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomField from "../CustomField";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useTransition } from "react";
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
  image: z.any(),
  isSaved: z.boolean().optional(),
});

const imageValidation = z
  .any()
  .refine((img: File) => img?.size <= 5 * 1024 * 1024, `Max image size is 5MB.`)
  .refine(
    (img: File) => FILE_TYPES.includes(img?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported.",
  );

export default function ActionForm({
  title,
  description,
  price,
  isUpdate = false,
  imageSaved,
  userIp,
  userId,
}: {
  title?: string;
  description?: string;
  price?: string;
  isUpdate: boolean;
  imageSaved?: string;
  userIp: string;
  userId: string;
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
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    form.trigger();
    setSubmitting(true);

    const validatedImage = await imageValidation.safeParseAsync(image);

    if (!validatedImage.success) {
      toast({
        title: "Error",
        description: "Invalid image input",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", validatedImage.data);

    const submitData = {
      name: data.title as string,
      description: data.description as string,
      price: parseInt(data.price) as number,
      userId: userId as string,
    } as CourseProps;

    if (isUpdate) {
      console.log("update");
    } else {
      const course = await createCourse(
        { data: submitData, requestIp: userIp },
        formData,
      );
      if (course) {
        form.reset();
        router.push(`/courses`);
      }
    }
    setSubmitting(false);
    return;
  }

  useEffect(() => {
    if (
      Object.keys(form.formState.errors).length &&
      form.formState.isSubmitted
    ) {
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
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full"
      >
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
