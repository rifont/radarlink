import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/shared/theme-provider"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RadarLink - Building blocks for your Next.js project",
  description:
    "RadarLink is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
  twitter: {
    card: "summary_large_image",
    title: "RadarLink - Building blocks for your Next.js project",
    description:
      "RadarLink is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    creator: "@richard_fontein",
  },
  metadataBase: new URL("https://radarlink.tech"),
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cx(sfPro.variable, inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-indigo-900 dark:via-black dark:to-cyan-900" />
          <Suspense fallback="...">
            {/* @ts-expect-error Server Component */}
            <Nav />
          </Suspense>
          <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
