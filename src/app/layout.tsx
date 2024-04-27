import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import ErrorHandler from "@/components/shared/ErrorHandler";
import CookieConsent from "@/components/ui/cookie-consent";
import LangContextProvider from "@/providers/LangContext";
import { prisma } from "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laxagos - E-Learning Platform",
  description: "Laxagos, E-learning platform focused on educational content.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isLogged = false;
  let isCourseCreator = false;
  const { userId } = auth();

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (user) isLogged = true;
    if (user?.isCourseCreator) isCourseCreator = true;
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#0ea5e9" },
        elements: { card: "bg-white dark:bg-secondary" },
      }}
    >
      <html suppressHydrationWarning lang="cz">
        <body className={inter.className}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
            <LangContextProvider>
              <div className="min-h-screen h-full w-full bg-black">
                <Sidebar isCreator={isCourseCreator} isLogged={isLogged} />
                {children}
                <CookieConsent />
                <Footer />
                <ErrorHandler />
              </div>
              <Toaster />
            </LangContextProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
