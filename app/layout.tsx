import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { MobileThemeToggle } from "@/components/ui/mobile-theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidros.vercel.app"),
  title: "David Ros | Full Stack Developer Portfolio",
  description:
    "Professional portfolio of David Ros, a passionate full stack developer with 6+ years of experience building scalable web applications using React, Next.js, and modern technologies.",
  keywords: [
    "full stack developer",
    "React",
    "Next.js",
    "web development",
    "portfolio",
    "JavaScript",
    "TypeScript",
  ],
  authors: [{ name: "David Ros" }],
  creator: "David Ros",
  openGraph: {
    title: "David Ros | Full Stack Developer Portfolio",
    description:
      "Passionate full stack developer crafting scalable web applications with React, Next.js, and modern technologies.",
    url: "https://davidros.vercel.app", // Replace with your actual domain
    siteName: "David Ros Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "David Ros - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Ros | Full Stack Developer Portfolio",
    description:
      "Passionate full stack developer crafting scalable web applications with React, Next.js, and modern technologies.",
    images: [
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=630&fit=crop",
    ], // Same image as Open Graph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased pb-20 md:pb-0`}>
        <ThemeProvider>
          <ScrollProgressIndicator />
          <MobileThemeToggle />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
