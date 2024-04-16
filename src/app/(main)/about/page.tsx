import AboutHeading from "@/components/shared/about/AboutHeading";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { getCourses } from "@/lib/actions/course.action";
import Image from "next/image";
import React from "react";

export default async function Page() {
  const courses = (await getCourses(16, 1, "")) || [];

  return (
    <div className="py-8">
      <HeroParallax
        products={courses.map((item) => ({
          title: item.name,
          link: "/courses/course/" + item.id,
          thumbnail: item.imageUrl as string,
        }))}
      />
      <div className="min-h-screen max-w-screen-xl items-center flex flex-col gap-1 h-full mx-auto w-full px-4 py-16 sm:px-6 lg:px-8 z-10">
        <h3 role="about-heading" className="text-2xl sm:text-4xl font-bold">
          <AboutHeading />
        </h3>
        <hr className="w-full mt-2 border-2 font-bold" />
        <div className="h-full items-center flex flex-col">
          <p role="about-paragraph" className="text-base max-w-4xl md:text-xl mt-8">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia.
          </p>
          <Image
            role="about-image"
            src="/assets/team.jpg"
            alt="about"
            width={500}
            height={500}
            className="mt-8 rounded-xl"
          />
          <p role="about-paragraph" className="text-base max-w-4xl md:text-xl mt-8">
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia.
          </p>

          <Image
            role="about-image"
            src="/assets/coffee.jpg"
            alt="about"
            width={500}
            height={500}
            className="mt-8 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
