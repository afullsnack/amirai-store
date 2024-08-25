import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Layout } from "@/components/craft";
import SiteFooter from "@/components/Footer";
import CategoriesSection from "@/components/Categories-Badge";
import Header from "@/components/Header";

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
        <CategoriesSection />
        <SiteFooter />
      </body>
    </Layout>
  );
}
