'use server';
import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import { prisma } from "../db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { FILE_TYPES } from "@/components/shared/courses/ActionForm";
import DataURIParser from "datauri/parser";
import path from "path";

export interface CourseProps {
  name: string;
  description: string;
  price: number;
  image: File;
  userId: string;
}

interface CreateCourseProps {
  data: CourseProps;
  userId: string;
  requestOrigin: string;
}

const dataSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  description: z
    .string()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(200, { message: "Must be 200 or fewer characters long" }),
  price: z.number(),
  image: z
    .custom<File>((val) => val instanceof File, { message: "Must be an image" })
    .refine((file) => FILE_TYPES.includes(file.type), {
      message: "Must be an image",
    }),
  userId: z
    .string()
    .uuid()
    .min(1, { message: "Must be 1 or more characters long" }),
});

export async function createCourse({ data, requestOrigin }: CreateCourseProps) {
  const parsedData = dataSchema.safeParse(data);

  if (!parsedData.success) {
    return redirect(requestOrigin + "/actions?error=invalid-data");
  }

  const image = parsedData.data.image;

  if (!data.image) {
    return redirect(requestOrigin + "/actions?error=invalid-image");
  }

  try {
    const createdImage = await createImage(image);
    const imageUrl = createdImage.url;
    const publicId = createdImage.public_id;
    const imageSignature = createdImage.signature;

    const newCourse = await prisma.course.create({
      data: {
        name: parsedData.data.name,
        description: parsedData.data.description,
        price: parsedData.data.price,
        imageUrl,
        publicId,
        imageSignature,
        courseCreator: {
          connect: {
            id: parsedData.data.userId,
          },
        },
      },
    });

    if (!newCourse) throw new Error("failed-to-create");

    revalidatePath("/courses");
    revalidatePath("/");
    revalidatePath("/actions");

    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    redirect("/course-actions?error=course-create-failed");
  }
}

export async function createImage(img: any) {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const parser = new DataURIParser();
    const base64Image = parser.format(
      path.extname(img.name).toString(),
      await img.arrayBuffer(),
    );
    const uploadedImageResponse = await cloudinary.v2.uploader.upload(
      base64Image.content as string,
      { resource_type: "image" },
    );
    return uploadedImageResponse;
  } catch (error) {
    throw new Error("Failed to create image: " + error);
  }
}
