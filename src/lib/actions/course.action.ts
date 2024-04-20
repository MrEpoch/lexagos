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
import { auth } from "@clerk/nextjs/server";

export interface CourseProps {
  name: string;
  description: string;
  price: number;
}

interface CreateCourseProps {
  data: CourseProps;
  requestIp: string;
}

interface UpdateCourseProps {
  data: CourseProps;
  requestIp: string;
  id: string;
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
      throw new Error("too-many-requests");
    }

    const userId = auth();

    if (!userId || !userId.userId) {
      throw new Error("not-logged");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId.userId,
      },
    });

    if (!user || !user.isCourseCreator) {
      throw new Error("not-course-creator");
    }

    const parsedData = await dataSchema.safeParseAsync(data);

    const validatedImage = await imageValidation.safeParseAsync(
      image.get("image"),
    );

    if (!validatedImage.success) {
      throw new Error("invalid-image");
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
            id: user.id,
          },
        },
      },
    });

    if (!newCourse) throw new Error("failed-to-create");

    revalidatePath("/courses");
    revalidatePath("/");
    revalidatePath("/actions");
    revalidatePath("/about");

    return JSON.parse(JSON.stringify(newCourse));
  } catch (error: any) {
    console.log(error, "caught");
    if (error?.message === "too-many-requests") {
      redirect("/actions?error=too-many-requests");
    } else if (error?.message === "invalid-image") {
      redirect("/actions?error=invalid-image");
    } else if (error?.message === "not-logged") {
      redirect("/actions?error=not-logged");
    } else if (error?.message === "not-course-creator") {
      redirect("/actions?error=not-course-creator");
    }
    redirect("/actions?error=failed-to-create");
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

export async function deleteImage(publicId: string) {
  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    await cloudinary.v2.uploader.destroy(publicId, { resource_type: "image" });
  } catch (error) {
    throw new Error("Failed to delete image: " + error);
  }
}

const zodId = z.string().uuid();

export async function updateCourse(
  { data, requestIp, id }: UpdateCourseProps,
  image?: FormData,
) {
  try {
    const ipCheck = await rateLimiter(redis, requestIp, 10, 60 * 60 * 12);
    if (!ipCheck.success) {
      throw new Error("too-many-requests");
    }

    const clerkUser = auth();

    if (!clerkUser || !clerkUser.userId) {
      throw new Error("user-not-found");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.userId,
      },
    });

    if (!user || !user.isCourseCreator) {
      throw new Error("user-not-course-creator");
    }

    const parsedData = await dataSchema.safeParseAsync(data);

    if (!parsedData.success) {
      console.log(parsedData.error);
      throw new Error(parsedData.error.message);
    }

    const parsedId = zodId.safeParse(id);
    if (!parsedId.success) {
      throw new Error("invalid-id");
    }

    if (image) {
      const validatedImage = await imageValidation.safeParseAsync(
        image.get("image"),
      );
      if (!validatedImage.success) {
        throw new Error("invalid-image");
      }
      const createdImage = await createImage(validatedImage.data);
      const imageUrl = createdImage.url;
      const publicId = createdImage.public_id;
      const imageSignature = createdImage.signature;

      const course = await prisma.course.findUnique({
        where: {
          id,
        },
      });

      if (!course) {
        throw new Error("course-not-found");
      }

      await deleteImage(course.publicId as string);

      await prisma.course.update({
        where: {
          id,
        },
        data: {
          name: parsedData.data.name,
          description: parsedData.data.description,
          price: parsedData.data.price,
          imageUrl,
          publicId,
          imageSignature,
        },
      });

      revalidatePath("/courses");
      revalidatePath("/");
      revalidatePath("/actions");

      return JSON.parse(JSON.stringify(parsedData.data));
    } else {
      await prisma.course.update({
        where: {
          id,
        },
        data: {
          name: parsedData.data.name,
          description: parsedData.data.description,
          price: parsedData.data.price,
        },
      });

      revalidatePath("/courses");
      revalidatePath("/");
      revalidatePath("/actions");
      revalidatePath("/about");

      return JSON.parse(JSON.stringify(parsedData.data));
    }
  } catch (e: any) {
    console.log(e);
    if (e?.message === "too-many-requests") {
      redirect("/actions?error=too-many-requests");
    } else if (e?.message === "invalid-image") {
      redirect("/actions?error=invalid-image");
    } else if (e?.message === "user-not-found") {
      redirect("/actions?error=user-not-found");
    } else if (e?.message === "user-not-course-creator") {
      redirect("/actions?error=user-not-course-creator");
    } else if (e?.message === "invalid-id") {
      redirect("/actions?error=invalid-id");
    }
  }
}

export async function deleteCourse(id: string) {
  try {
    const clerkUser = auth();

    if (!clerkUser || !clerkUser.userId) {
      throw new Error("User not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.userId,
      },
    });

    if (!user || !user.isCourseCreator) {
      throw new Error("User is not a course creator");
    }

    const parsedId = zodId.safeParse(id);
    if (!parsedId.success) {
      throw new Error("Invalid id");
    }

    const deletedCourse = await prisma.course.delete({
      where: {
        id,
        courseCreatorId: user.id,
      },
    });

    if (!deletedCourse) throw new Error("failed-to-delete");

    await deleteImage(deletedCourse.publicId as string);

    revalidatePath("/courses");
    revalidatePath("/");
    revalidatePath("/actions");
    revalidatePath("/about");

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

export async function getCourses(
  limit = 12,
  page = 1,
  searchQuery = "",
  belongsTo?: string,
) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
        courseCreatorId: belongsTo,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    return courses;
  } catch (e) {
    console.log(e);
  }
}

export async function getPageCount(pageSize = 12, searchQuery = "") {
  try {
    const count = await prisma.course.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });
    return Math.ceil(count / pageSize);
  } catch (e) {
    console.log(e);
  }
}

export async function addCourseToUser(courseId: string) {
  try {
    const parsedCourseId = zodId.safeParse(courseId);
    if (!parsedCourseId.success) {
      throw new Error("invalid-course-id");
    }

    const user = auth();

    if (!user || !user.userId) {
      throw new Error("user-not-found");
    }

    const userDb = await prisma.user.findUnique({
      where: {
        clerkId: user.userId,
      },
    });

    if (!userDb) {
      throw new Error("user-not-found");
    }

    const course = await prisma.course.findUnique({
      where: {
        id: parsedCourseId.data,
      },
    });

    if (!course) {
      throw new Error("course-not-found");
    }

    // check if already user has that course

    if (userDb.coursesJoined.some((c) => c === course.id)) {
      throw new Error("course-already-joined");
    }

    await prisma.user.update({
      where: {
        id: userDb.id,
      },
      data: {
        coursesJoined: {
          push: course.id,
        },
      },
    })

    return { error: false };
  } catch (error: any) {
    console.log(error);
    if (error?.message === "user-not-found") {
      redirect("/sign-in");
    } else if (error?.message === "course-not-found" || error?.message === "invalid-course-id") {
      redirect("/courses");
    } else if (error?.message === "course-already-joined") {
      redirect("/account");
    }

    return { error: true };
  }
}

export async function getUserCoursePages(pageSize = 12, searchQuery = "") {
  try {
    const courses = await prisma.course.count({
      where: {
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    return Math.ceil(courses / pageSize);
  } catch (error: any) {
  }
}

export async function getUserCourses({ limit = 12, page = 1, searchQuery = "" }) {
  try {
    const user = auth();

    if (!user || !user.userId) {
      throw new Error("user-not-found");
    }

    const userDb = await prisma.user.findUnique({
      where: {
        clerkId: user?.userId,
      },
    });

    if (!userDb) {
      throw new Error("user-not-found");
    }

    const courses = await prisma.course.findMany({
      where: {
        id: {
          in: userDb.coursesJoined,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      }
    })

    return courses;
  } catch (error) {
    
  }
}
