import Image from "next/image";
import Link from "next/link";
import React from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function Footer() {
  return (
    <footer className="w-full py-8 relative flex items-center justify-between px-4">
      <div className="w-full">
        <Link href="/" className="w-full flex items-center gap-4">
          <Image
            src="/assets/Logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="h-12 w-12"
          />
          <p className="text-2xl font-bold">Lexagos</p>
        </Link>
        <div
          className="flex sm:flex-row 
    justify-between items-center w-full flex-col gap-4"
        >
          <p className="text-sm text-gray-400">
          <div>
            © 2022-2024 Lexagos. All rights reserved.
          </div>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </p>
            <LanguageSwitch />
          <div className="flex gap-4 items-center">
            <p className="text-sm text-gray-400">Follow us on: </p>
            <Link href="https://twitter.com">
              <Image
                src="/social-icons/logo-white.png"
                alt="Twitter"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </Link>
            <Link href="https://www.facebook.com">
              <Image
                src="/social-icons/Facebook_Logo_Primary.png"
                alt="Facebook"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </Link>
            <Link href="https://www.instagram.com">
              <Image
                src="/social-icons/Instagram_Glyph_Gradient.png"
                alt="Instagram"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
