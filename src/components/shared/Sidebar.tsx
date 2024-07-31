"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSidebarData } from "@/lib/constant";
import Image from "next/image";
import { Menu } from "lucide-react";
import { FloatingNav } from "../ui/floating-navbar";
import Link from "next/link";
import { useLang } from "@/providers/LangContext";

export default function Sidebar({
  isLogged,
  isCreator = true,
}: {
  isLogged: boolean;
  isCreator?: boolean;
}) {
  const { isEnglish } = useLang() as { isEnglish: boolean };
  const sidebarData = getSidebarData((isEnglish ?? true) ? "en" : "cz");

  return (
    <Sheet>
      <FloatingNav logoInfo={{ logoName: "Lexagos", logo: "/assets/Logo.png" }}>
        <SheetTrigger role="sheet-trigger" className="">
          <Menu />
        </SheetTrigger>
      </FloatingNav>
      <SheetContent
        role="sidebar"
        className="h-full overflow-y-auto"
        side={"left"}
      >
        <SheetHeader className="h-full">
          <SheetTitle
            role="sidebar-heading"
            className="flex items-center gap-2"
          >
            <Image src="/assets/Logo.png" alt="Logo" width={80} height={80} />
            <span className="text-2xl font-bold">Lexagos</span>
          </SheetTitle>
          <div className="flex h-full flex-col ">
            <ul className="flex flex-col text-gray-400 gap-4">
              {sidebarData
                .slice(0, isLogged ? 4 : 6)
                .concat(isLogged ? sidebarData[7] : [])
                .concat(isLogged && isCreator ? sidebarData[6] : [])
                .map((item, i) => (
                  <li key={i} role="sidebar-link">
                    <Link
                      href={item.link}
                      className="flex items-center space-x-2 hover:text-white hover:bg-primary py-3 px-4 rounded-lg gap-4 text-md font-semibold"
                    >
                      <item.icon role="sidebar-link-icon" className="h-6 w-6" />
                      <span role="sidebar-link-text">{item.text}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
