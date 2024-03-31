"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { dark } from "@clerk/themes";

export const FloatingNav = ({
  logoInfo,
  className,
  children,
}: {
  logoInfo: {
    logoName: string;
    logo: string;
  };
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollYProgress, scrollY } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05 && scrollY.get() > 0) {
        setVisible(false);
      } else {
        if (direction < 0 || scrollY.get() === 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 px-6 py-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[50]  items-center justify-center space-x-4",
          className,
        )}
      >
        <Link
          href={"/"}
          className={cn(
            "relative dark:text-neutral-50 justify-center items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
          )}
        >
          <Image
            src={logoInfo.logo}
            alt="Logo"
            className="h-8 w-8"
            width={32}
            height={32}
          />
          <span className="hidden sm:block text-sm">{logoInfo.logoName}</span>
        </Link>
        <UserButton
          afterSignOutUrl="/"
          userProfileProps={{
            appearance: { baseTheme: dark },
          }}
          appearance={{ baseTheme: dark }}
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
};
