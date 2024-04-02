"use server";

import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import { prisma } from "../db";
import { z } from "zod";
import DataURIParser from "datauri/parser";
import { FILE_TYPES } from "../constant";
import path from "path";
import { rateLimiter } from "../rateLimiter";
import { redis } from "../redis";

export interface CourseProps {
  name: string;
  description: string;
  price: number;
  image: File;
  userId: string;
}

interface CreateCourseProps {
  data: CourseProps;
  requestIp: string;
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

export async function createCourse({ data, requestIp }: CreateCourseProps) {
  'use server';
  try {
  console.log("before limiter");
  await rateLimiter(redis, requestIp, 10, 60 * 60 * 24);
  console.log("after limiter");

  const parsedData = dataSchema.safeParse(data);

  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error(parsedData.error.message);
  }

  const image = parsedData.data.image;

  if (!data.image) {
    console.log("No image provided");
    throw new Error("No image provided");
  }

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
    console.log("before end");

    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    console.log(error, "caught");
    throw new Error("Failed to create course: " + error);
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
