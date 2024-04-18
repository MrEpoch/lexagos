'use server';
import { prisma } from "./db";
import { redirect } from "next/navigation";

export async function authCheck(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) throw redirect("/sign-in");
  if (!user.isCourseCreator) throw redirect("/");

  return user;
}
