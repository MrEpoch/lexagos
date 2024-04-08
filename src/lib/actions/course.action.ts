"use server";

import { revalidatePath } from "next/cache";
import cloudinary from "cloudinary";
import { prisma } from "../db";
import { z } from "zod";
import DataURIParser from "datauri/parser";
import path from "path";
import { rateLimiter } from "../rateLimiter";
import { redis } from "../redis";
import { redirect } from "next/navigation";
import { FILE_TYPES } from "../constant";

export interface CourseProps {
  name: string;
  description: string;
  price: number;
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
  userId: z
    .string()
    .uuid()
    .min(1, { message: "Must be 1 or more characters long" }),
});

const imageValidation = z
  .any()
  .refine((img: File) => img?.size <= 5 * 1024 * 1024, `Max image size is 5MB.`)
  .refine(
    (img: File) => FILE_TYPES.includes(img?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported.",
  );


export async function createCourse(
  { data, requestIp }: CreateCourseProps,
  image: FormData,
) {
  try {

    const ipCheck = await rateLimiter(redis, requestIp, 10, 60 * 60 * 12);

    if (!ipCheck.success) {
      redirect("/?error=too-many-requests");
    }

    const parsedData = await dataSchema.safeParseAsync(data);

    const validatedImage = await imageValidation.safeParseAsync(
      image.get("image"),
    );

    if (!validatedImage.success) {
      redirect("/actions?error=invalid-image");
    }

    if (!parsedData.success) {
      console.log(parsedData.error);
      throw new Error(parsedData.error.message);
    }

    const createdImage = await createImage(validatedImage.data);
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
    console.log(error, "caught");
    throw new Error("Failed to create course: " + error);
  }
}

export async function createImage(imgBase64: any) {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const parser = new DataURIParser();
    const parsed = parser.format(
      path.extname(imgBase64.name).toString(),
      await imgBase64.arrayBuffer(),
    );

    const uploadedImageResponse = await cloudinary.v2.uploader.upload(
      parsed.content as string,
      { resource_type: "image" },
    );
    return uploadedImageResponse;
  } catch (error) {
    throw new Error("Failed to create image: " + error);
  }
}

const zodId = z.string().uuid();

export async function deleteCourse(id: string) {
  try {
    const parsedId = zodId.safeParse(id);
    if (!parsedId.success) {
      throw new Error("Invalid id");
    }

    const deletedCourse = await prisma.course.delete({
      where: {
        id,
      },
    });

    if (!deletedCourse) throw new Error("failed-to-delete");

    return JSON.parse(JSON.stringify(deletedCourse));
  } catch (error) {
    redirect("/actions?error=invalid-course");
  }
}

export async function getCourseById(id: string) {
  try {
    const parsedId = zodId.safeParse(id);
    
    if (!parsedId.success) {
      throw new Error("Invalid id");
    }

    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });
    return { data: course, error: false };
  } catch (error) {
    console.log(error);
    return { data: null, error: true };
  }
}

export async function getCourses(limit=12, page=1, searchQuery="") {
  try {
    const courses = await prisma.course.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return courses
  } catch (e) {
    console.log(e)
  }
}

export async function getPageCount(pageSize=12, searchQuery="") {
  try {
    const count = await prisma.course.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });
    return Math.ceil(count / pageSize)
  } catch (e) {
    console.log(e)
  }
}
