import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans_SC,
  Noto_Sans_JP,
  Noto_Sans_KR,
} from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ReactQueryProvider } from "@/lib/react-query/provider";

import "./globals.css";

import { MainLayout } from "@/components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-cjk",
});
const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-cjk",
});
const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-cjk",
});

export const metadata: Metadata = {
  title: "Polyglot AI",
  description: "AI-powered language learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  ${notoSC.variable} ${notoJP.variable} ${notoKR.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <ReactQueryProvider>
          <ViewTransitions>
            <MainLayout>{children}</MainLayout>
          </ViewTransitions>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
