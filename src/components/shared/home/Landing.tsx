import React from "react";
import HomeLandingTextClient from "./HomeLandingTextClient";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="min-h-screen w-full flex justify-between flex-col items-center gap-8">
      <div className="flex pt-32 text-center h-full w-full items-center justify-around flex-col">
        <HomeLandingTextClient />
      </div>
      <Image src="/assets/world.svg" alt="World" width={500} height={500} />
    </div>
  );
}
