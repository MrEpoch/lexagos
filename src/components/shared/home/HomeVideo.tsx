import React from "react";
import VideoPlayer from "../VideoPlayer";
import Image from "next/image";
import HomeVideoClient from "./HomeVideoClient";

export default function HomeVideo() {
  return (
    <div role="home-video" className="min-h-screen h-full w-full flex items-center relative">
      <div className="w-full items-center gap-4 lg:flex-row flex-col justify-between flex h-full">
        <div className="w-full flex flex-col items-center h-full justify-between">
          <HomeVideoClient />
          <p role="art-paragraph" className="h-full max-w-lg">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui
            minim labore adipisicing minim sint cillum sint consectetur
            cupidatat.
          </p>
          <Image
            src="/assets/tools.svg"
            alt="Art"
            width={500}
            height={500}
            className="shadow-2xl h-full w-40 object-cover transition-shadow duration-300 ease-in-out"
          />
        </div>
        <VideoPlayer
          video="/assets/intro-video.mp4"
          thumb="/assets/book.jpg"
          videoWidth={1920}
          videoHeight={1080}
          thumbWidth={1920}
          thumbHeight={1080}
        />
      </div>
    </div>
  );
}
