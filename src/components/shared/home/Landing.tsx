import React from "react";
import { GlobeLoaded } from "../World";
import HomeLandingTextClient from "./HomeLandingTextClient";

export default function Landing() {
  return (
    <div className="min-h-screen w-full">
      <div className="flex pt-32 text-center h-full w-full items-center justify-around flex-col">
        <HomeLandingTextClient />
      </div>
      <GlobeLoaded />
    </div>
  );
}
