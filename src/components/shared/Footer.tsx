import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 relative flex items-center justify-between px-4">
      <div className="">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/assets/Logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="h-12 w-12"
          />
          <p className="text-2xl font-bold">Lexagos</p>
        </Link>
        <p className="text-sm text-gray-400">
          © 2022-2024 Lexagos. All rights reserved.
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </footer>
  );
}
