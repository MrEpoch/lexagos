import ContactForm from "@/components/shared/contact/ContactForm";
import ContactFormHeading from "@/components/shared/contact/ContactFormHeading";
import ContactHeader from "@/components/shared/contact/ContactHeader";
import ContactsTable from "@/components/shared/contact/ContactsTable";
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
              <ContactHeader />
              <Image
    role="customer-support-svg"
                src="/assets/Customer-support.svg"
                alt="contact-us"
                width={500}
                height={500}
                className="rounded-xl"
              />
            </div>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <ContactFormHeading />
              <ContactForm />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <ContactsTable />
        <hr className="my-4" />
        <MapyComponent />
      </div>
    </section>
  );
}
