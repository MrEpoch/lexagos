import HomeAccordion from "@/components/shared/home/HomeAccordion";
import HomeVideo from "@/components/shared/home/HomeVideo";
import InfoCards from "@/components/shared/home/InfoCards";
import Landing from "@/components/shared/home/Landing";

export default function Home() {
  return (
    <main className="w-full h-full relative py-16  flex flex-col items-center justify-center bg-black">
      <div className="fixed left-0 top-0 h-full w-full">
        <div className="absolute bottom-0 overflow-hidden left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
      </div>
      <section className="max-w-screen-xl flex items-center flex-col gap-1 justify-between h-full mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
        <Landing />
        <InfoCards />
        <HomeVideo />
        <HomeAccordion />
      </section>
    </main>
  );
}
