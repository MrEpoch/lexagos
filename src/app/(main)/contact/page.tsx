import ContactForm from "@/components/shared/ContactForm";
import ContactsTable from "@/components/shared/ContactsTable";
import MapyComponent from "@/components/shared/MapyComponent";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <section className="min-h-screen w-full pt-24 py-16">
      <div className="max-w-screen-xl h-full py-16 flex flex-col px-4 mx-auto w-full">
        <div className="w-full h-full max-w-screen-xl mx-auto rounded-lg p-4">
          <div className="z-50 h-full w-full flex md:flex-row flex-col items-center justify-around gap-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col gap-4 items-center md:items-start">
              <h1 className="font-extrabold text-4xl lg:text-6xl">
                <span className="bg-gradient-to-br from-primary to-red-900 bg-clip-text text-transparent box-decoration-clone">
                  Contact Us
                </span>
              </h1>
              <p className="max-w-sm text-xl mt-3 text-gray-100">
                We&apos;d love to hear from you. Send us a message and
                we&apos;ll get back to you as soon as possible.
              </p>
              <Image
                src="/assets/Customer-support.svg"
                alt="contact-us"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-300 sm:text-xl">
                Got a technical issue? Want to send feedback about a beta
                feature? Need details about our Business plan? Let us know.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
        <ContactsTable />
        <MapyComponent />
      </div>
    </section>
  );
}
