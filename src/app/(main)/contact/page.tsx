import { ImagesSlider } from "@/components/ui/images-slider";
import Image from "next/image";
import React from "react";

export default function Page() {
  const images = [
    "/assets/team.jpg",
    "/assets/coffee.jpg"
  ]

  return (
<section className="min-h-screen w-full pt-24 py-16">
    <ImagesSlider images={images} className="w-full h-full max-w-screen-xl mx-auto rounded-lg p-4">
  <div className="z-50 h-full w-full max-w-screen-xl mx-auto flex md:flex-row flex-col items-center justify-around gap-8 px-4 sm:px-6 lg:px-8">
    <div className="w-full flex flex-col gap-4 items-center md:items-start">
      <h1 className="font-extrabold text-4xl lg:text-6xl">
        <span className="bg-gradient-to-br from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">
    Contact Us
  </span>
  </h1>
  <p className="max-w-sm text-xl mt-3 text-gray-100">We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you as soon as possible.</p>
      <Image src="/assets/Customer-support.svg" alt="contact-us" width={500} height={500} className="rounded-xl"/>
    </div>
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-300 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form action="#" className="space-y-8">
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" className="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="mail@lexagos.com" required />
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Contact for help" required />
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-card dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Main message ..."></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-primary to-red-900 sm:w-fit hover:from-primary/90 hover:to-red-900 transition focus:ring-4 focus:outline-none focus:ring-primary">Send message</button>
      </form>
    </div>
</div>
  </ImagesSlider>
</section>
  );
}
