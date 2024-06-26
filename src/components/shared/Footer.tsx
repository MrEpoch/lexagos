import Image from "next/image";
import Link from "next/link";
import React from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function Footer() {
  return (
    <>
      <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-card" />
      <footer
        role="footer"
        className="w-full py-8 relative flex items-center justify-between px-4"
      >
        <div className="w-full">
          <Link
            role="footer-logo"
            href="/"
            className="w-full flex items-center gap-4"
          >
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
            <p role="footer-text" className="text-sm text-gray-400">
              © 2022-2024 Lexagos. All rights reserved.
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </p>
            <LanguageSwitch />
            <div className="flex gap-4 items-center">
              <p role="footer-follow" className="text-sm text-gray-400">
                Follow us on:{" "}
              </p>
              <Link href="https://twitter.com">
                <Image
                  role="footer-social"
                  src="/social-icons/logo-white.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
              <Link href="https://www.facebook.com">
                <Image
                  role="footer-social"
                  src="/social-icons/Facebook_Logo_Primary.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </Link>
              <Link href="https://www.instagram.com">
                <Image
                  role="footer-social"
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
    </>
  );
}
