"use client";
import Image from "next/image";
import React, { useState } from "react";

interface VideoPlayerProps {
  video: string;
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
  videoWidth: number;
  videoHeight: number;
}

export default function VideoPlayer({
  video,
  thumb,
  thumbWidth,
  thumbHeight,
  videoWidth,
  videoHeight,
}: VideoPlayerProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="relative w-full h-full flex justify-center items-center focus:outline-none focus-visible:ring focus-visible:ring-primary rounded-3xl group"
        onClick={() => setModalOpen(true)}
        aria-label="Watch the video"
      >
        <Image
          className="rounded-3xl shadow-2xl h-full object-cover transition-shadow duration-300 ease-in-out"
          src={thumb as string}
          width={thumbWidth}
          height={thumbHeight}
          priority
          alt="Modal video thumbnail"
        />
        <svg
          className="absolute pointer-events-none group-hover:scale-110 transition-transform duration-300 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
        >
          <circle
            className="text-card"
            fill="currentColor"
            cx="36"
            cy="36"
            r="36"
            fillOpacity=".8"
          />
          <path
            className="fill-primary drop-shadow-2xl"
            d="M44 36a.999.999 0 0 0-.427-.82l-10-7A1 1 0 0 0 32 29V43a.999.999 0 0 0 1.573.82l10-7A.995.995 0 0 0 44 36V36c0 .001 0 .001 0 0Z"
          />
        </svg>
      </button>
      {modalOpen && (
        <div
          onClick={() => {
            setModalOpen(false);
          }}
          id="default-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="flex justify-center items-center backdrop-brightness-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 min-h-screen max-h-full"
        >
          <div
            aria-hidden="true"
            className="relative p-4 w-full max-w-2xl max-h-full"
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <video width={videoWidth} height={videoHeight} loop controls>
                <track kind="captions" />
                <source src={video as string} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
