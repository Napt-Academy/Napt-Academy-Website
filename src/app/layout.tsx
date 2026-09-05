import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Playfair_Display } from "next/font/google";
import { siteData } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NAPT Academy | Defence, Police & Paramilitary Coaching in Kerala",
    template: "%s",
  },
  description: siteData.description,
  authors: [{ name: siteData.name }],
  openGraph: {
    type: "website",
    siteName: siteData.name,
    title: "NAPT Academy | Defence, Police & Paramilitary Coaching in Kerala",
    description: siteData.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "NAPT Academy | Defence, Police & Paramilitary Coaching in Kerala",
    description: siteData.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
