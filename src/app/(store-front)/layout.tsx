import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Layout } from "@/components/craft";
import SiteFooter from "@/components/Footer";
import CategoriesSection from "@/components/Categories-Badge";
import Header from "@/components/Header";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Amirai",
  description: "The Amirai store",
  icons: [
    {
      url: "/logo_mark.png",
      rel: "icon",
      type: "img/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Suspense fallback={<Skeleton className="min-w-8 h-3 rounded-sm" />}>
          <CategoriesSection />
        </Suspense>
        <SiteFooter />
      </body>
    </Layout>
  );
}
