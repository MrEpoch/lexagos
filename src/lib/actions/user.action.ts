"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

interface UserCreate {
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  clerkId: string;
  photo: string;
}

interface UserUpdate {
  username: string;
  lastName: string;
  firstName: string;
  photo: string;
}

export async function createUser(user: UserCreate) {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    throw new Error("Failed to create user: " + error);
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    if (!user) throw new Error("");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error("Failed to get user: " + error);
  }
}

export async function updateUser(clerkId: string, user: UserUpdate) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        clerkId,
      },
      data: {
        ...user,
      },
    });

    if (!updatedUser) throw new Error("");

    return JSON.parse(JSON.stringify(updateUser));
  } catch (e) {
    throw new Error("Failed to update user: " + e);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!user) throw new Error("User not found");

    const deletedUser = await prisma.user.delete({
      where: {
        clerkId,
      },
    });

    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (e) {
    throw new Error("Failed to delete user: " + e);
  }
}

export async function courseCreatorAdd(userEmail: string) {
  try {
    const userRequesterId = auth();
    if (!userRequesterId || !userRequesterId.userId) throw new Error("User not found");
    const userRequester = await prisma.user.findUnique({
      where: {
        clerkId: userRequesterId.userId
      }
    })

    if (!userRequester) throw new Error("User not found")
    if (!userRequester.isCourseCreator) throw new Error("User is not a course creator")

    const zodMail = z.string().email();
    const parsedMail = zodMail.safeParse(userEmail);

    if (!parsedMail.success) {
      throw new Error("Invalid email");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      }
    })

    if (!user) throw new Error("User not found")

    if (!user.isCourseCreator) {
      await prisma.user.update({
        where: {
          clerkId: user.clerkId
        },
        data: {
          isCourseCreator: true
        }
      })
    }

  } catch (e) {
    redirect("/actions?error=invalid-email")
  }
}
