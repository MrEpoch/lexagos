import { getCourses } from "@/lib/actions/course.action";
import { Course } from "@prisma/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = (await getCourses()) ?? [];
  return [
    {
      url: "https://lexagos.vercel.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://lexagos.vercel.com/courses",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://lexagos.vercel.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://lexagos.vercel.com/contact",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://lexagos.vercel.com/account",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://lexagos.vercel.com/actions",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://lexagos.vercel.com/sign-in",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
    {
      url: "https://lexagos.vercel.com/sign-up",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
    ...courses.map((course: Course) => ({
      url: "https://lexagos.vercel.com/courses/" + course.id,
      lastModified: course.updatedAt,
      changeFrequency: "monthly" as any,
      priority: 0.5,
    })),
  ];
}
