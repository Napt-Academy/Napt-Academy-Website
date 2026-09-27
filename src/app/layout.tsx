import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Playfair_Display } from "next/font/google";
import { siteData } from "@/data/site";
import { buildPageMetadata, getSiteUrl } from "@/lib/seo";
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

const defaultTitle = "NAPT Academy | Defence, Police & Paramilitary Coaching in Kerala";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  ...buildPageMetadata({
    path: "/",
    fallbackTitle: defaultTitle,
    fallbackDescription: siteData.description,
  }),
  title: {
    default: defaultTitle,
    template: "%s",
  },
  authors: [{ name: siteData.name }],
  openGraph: {
    type: "website",
    siteName: siteData.name,
    title: defaultTitle,
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
