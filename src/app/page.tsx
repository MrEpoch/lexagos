import { GlobeLoaded } from "@/components/shared/World";

export default function Home() {
  return (
    <main className="w-full h-full relative pt-36  flex flex-col items-center justify-center bg-black">
      <div className="fixed left-0 top-0 h-full w-full">
        <div className="absolute bottom-0 overflow-hidden left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
      </div>
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 flex h-full w-full items-center justify-center flex-col">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We revolutionize e-learning
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Whether you&apos;re a student, a professional seeking to upskill, or
            simply passionate about learning something new, we&apos;re here to
            help. We&apos;ve got you covered.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/80 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-card dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-card/80"
            >
              Learn more
            </a>
          </div>
        </div>
        <GlobeLoaded />
      </section>
    </main>
  );
}
