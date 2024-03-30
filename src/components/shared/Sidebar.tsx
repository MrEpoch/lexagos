"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarData } from "@/lib/constant";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger className="fixed bg-black p-8 top-0 right-0">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="">
          <SheetTitle className="flex items-center gap-2">
            <Image src="/assets/Logo.png" alt="Logo" width={80} height={80} />
            <span className="text-2xl font-bold">Lexagos</span>
          </SheetTitle>
          <ul className="flex flex-col text-gray-400 gap-4">
            {sidebarData.map((item) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  className="flex items-center space-x-2 hover:text-white hover:bg-primary py-3 px-4 rounded-lg gap-4 text-md font-semibold"
                >
                  <item.icon className="h-6 w-6" />
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
