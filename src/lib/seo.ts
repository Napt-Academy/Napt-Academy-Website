import type { Metadata } from "next";
import type { ContentKey } from "@/lib/db/schema";

const PRODUCTION_SITE_URL = "https://naptacademy.com";

export type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noIndex: boolean;
  noFollow: boolean;
};

export const PUBLIC_PAGES: readonly { key: ContentKey; path: string }[] = [
  { key: "home", path: "/" },
  { key: "about", path: "/about-us" },
  { key: "services", path: "/services" },
  { key: "training-centers", path: "/our-training-centers" },
  { key: "contact", path: "/contact-us" },
];

export function emptyPageSeo(): PageSeo {
  return {
    title: "",
    description: "",
    keywords: [],
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    noIndex: false,
    noFollow: false,
  };
}

export function isIndexingAllowed() {
  return process.env["ALLOW_INDEXING"] === "true";
}

export function getSiteUrl() {
  const configured = process.env["NEXT_PUBLIC_SITE_URL"]?.trim().replace(/\/$/, "");
  return configured || PRODUCTION_SITE_URL;
}

export function absoluteUrl(path: string) {
  return new URL(path, `${getSiteUrl()}/`).href;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function readPageSeo(value: unknown): PageSeo {
  const fallback = emptyPageSeo();
  if (!value || typeof value !== "object") return fallback;
  const seo = value as Record<string, unknown>;
  const keywords = Array.isArray(seo["keywords"])
    ? seo["keywords"].filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : fallback.keywords;
  return {
    title: text(seo["title"]),
    description: text(seo["description"]),
    keywords,
    canonicalUrl: text(seo["canonicalUrl"]),
    ogTitle: text(seo["ogTitle"]),
    ogDescription: text(seo["ogDescription"]),
    ogImage: text(seo["ogImage"]),
    noIndex: seo["noIndex"] === true,
    noFollow: seo["noFollow"] === true,
  };
}

export function isDocumentNoIndex(data: unknown) {
  if (!data || typeof data !== "object") return false;
  const seo = (data as Record<string, unknown>)["seo"];
  return readPageSeo(seo).noIndex;
}

function canonicalUrl(path: string, cmsUrl: string) {
  if (cmsUrl === PRODUCTION_SITE_URL || cmsUrl.startsWith(`${PRODUCTION_SITE_URL}/`)) return cmsUrl;
  return absoluteUrl(path);
}

function imageUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("https://") || value.startsWith("http://")) return value;
  return absoluteUrl(value);
}

export function buildPageMetadata({
  path,
  fallbackTitle,
  fallbackDescription,
  seo,
}: {
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  seo?: unknown;
}): Metadata {
  const pageSeo = readPageSeo(seo);
  const title = pageSeo.title || fallbackTitle;
  const description = pageSeo.description || fallbackDescription;
  const ogTitle = pageSeo.ogTitle || title;
  const ogDescription = pageSeo.ogDescription || description;
  const canonical = canonicalUrl(path, pageSeo.canonicalUrl);
  const image = imageUrl(pageSeo.ogImage);
  const index = isIndexingAllowed() && !pageSeo.noIndex;
  const follow = isIndexingAllowed() && !pageSeo.noFollow;

  return {
    title,
    description,
    ...(pageSeo.keywords.length > 0 ? { keywords: pageSeo.keywords } : {}),
    alternates: { canonical },
    robots: {
      index,
      follow,
      googleBot: { index, follow },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      url: canonical,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function breadcrumbJsonLd(pageName: string, path: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: pageName, item: absoluteUrl(path) },
    ],
  };
}
