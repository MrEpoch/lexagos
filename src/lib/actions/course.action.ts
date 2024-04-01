import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { redirect } from "next/navigation";

export interface CourseProps {
  name: string
  description: string
  price: number
  imageUrl: string
  imageSignature: string
  publicId: string
}

interface CreateCourseProps {
  data: CourseProps
  userId: string
}

export async function createCourse({ data, userId }: CreateCourseProps) {
  try {
    const newCourse = await prisma.course.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        imageSignature: data.imageSignature,
        publicId: data.publicId,
        courseCreator: {
          connect: {
            id: userId,
          },
        }
      },
    });

    if (!newCourse) throw new Error("Database error");

    revalidatePath("/courses");
    revalidatePath("/");
    revalidatePath("/actions");

    return JSON.parse(JSON.stringify(newCourse));
  } catch (error) {
    redirect("/course-actions?error=course-create-failed");
  }
}
