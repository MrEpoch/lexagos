"use client";
import React, { useEffect, useState } from "react";

export default function MapyComponent() {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(
      localStorage.getItem("showMap") !== null &&
        localStorage.getItem("showMap") === "true",
    );
  }, []);

  return (
    <>
      <div className="min-h-screen flex w-full py-8">
        {isShown ? (
          <iframe
            className="border-none w-full rounded-xl"
            src="https://en.frame.mapy.cz/s/depokobuvu"
            width={1000}
            height={680}
          />
        ) : (
          <div className="w-full min-h-full flex justify-center items-center flex-1 bg-card">
            <p className="text-white rounded-xl font-bold text-3xl">
              Please accept cookies and reload to see map
            </p>
          </div>
        )}
      </div>
    </>
  );
}
