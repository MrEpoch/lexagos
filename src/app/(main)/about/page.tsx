import AboutHeading from "@/components/shared/about/AboutHeading";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { getCourses } from "@/lib/actions/course.action";
import Image from "next/image";
import React from "react";

export default async function Page() {
  const courses = (await getCourses(16, 1, "")) || [];

  return (
    <div className="py-8 z-10">
      <HeroParallax
        products={courses.map((item) => ({
          title: item.name,
          link: "/courses/course/" + item.id,
          thumbnail: item.imageUrl as string,
        }))}
      />
      <div className="min-h-screen max-w-screen-xl items-center flex flex-col gap-1 h-full mx-auto w-full px-4 py-16 sm:px-6 lg:px-8 z-10">
        <h2 role="about-heading" className="text-2xl sm:text-4xl font-bold">
          <AboutHeading />
        </h2>
        <hr className="w-full mt-2 font-bold h-0.5 py-4" />
        <div className="h-full items-center gap-16 flex flex-col">
          <div className="flex lg:flex-row flex-col py-16 justify-between items-center gap-5">
          <div className="flex flex-col gap-5">
            <h3 role="about-heading" className="text-3xl sm:text-5xl font-bold">Friendly team</h3>
          <p
            role="about-paragraph"
            className="text-base max-w-4xl "
          >
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia.
          </p>
          </div>
          <Image
            role="about-image"
            src="/assets/team.jpg"
            alt="about"
            width={500}
            height={500}
            className="rounded"
    />
      </div>
      <div className="flex lg:flex-row flex-col py-16 justify-between items-center gap-5">
          <Image
            role="about-image"
            src="/assets/coffee.jpg"
            alt="about"
            width={500}
            height={500}
            className="rounded"
          />

        <div className="flex flex-col gap-5">
          <h3 role="about-heading" className="text-3xl sm:text-5xl font-bold">Coffee lovers collective</h3>
          <p
            role="about-paragraph"
            className="text-base max-w-4xl"
          >
            Lorem ipsum dolor sit amet, officia excepteur ex fugiat
            reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
            ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
            Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
            voluptate dolor minim nulla est proident. Nostrud officia pariatur
            ut officia.
          </p>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
