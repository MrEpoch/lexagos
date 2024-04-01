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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laxagos - E-Learning Platform",
  description: "Laxagos, E-learning platform focused on educational content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isLogged = false;
  const { userId } = auth();

  if (userId) isLogged = true;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#0ea5e9" },
        elements: { card: "bg-white dark:bg-secondary" },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
            <div className="min-h-screen h-full w-full bg-black">
              <Sidebar isLogged={isLogged} />
              {children}
              <Footer />
              <ErrorHandler />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
