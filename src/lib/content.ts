/**
 * Content repository.
 *
 * Priority: Neon Postgres content_documents → Vercel Blob JSON → local src/data.
 */
import { unstable_noStore as noStore } from "next/cache";
import * as aboutData from "@/data/about";
import * as contactData from "@/data/contact";
import * as homeData from "@/data/home";
import * as servicesData from "@/data/services";
import * as centersData from "@/data/trainingCenters";
import { siteData } from "@/data/site";
import { getJson } from "@/lib/blob";
import { getDocumentData } from "@/lib/db/queries";
import type { ContentKey } from "@/lib/db/schema";

function normalizeContent<T>(content: T): T {
  if (Array.isArray(content)) {
    return content.map(normalizeContent) as T;
  }
  if (content && typeof content === "object") {
    const normalized = Object.fromEntries(
      Object.entries(content).flatMap(([key, value]) => {
        if (key === "mobileSrc" && (typeof value !== "string" || !value.trim())) return [];
        return [[key, normalizeContent(value)]];
      }),
    );
    return normalized as T;
  }
  return content;
}

export function mergeContentData<T>(fallback: T, incoming: unknown): T {
  if (
    fallback &&
    incoming &&
    typeof fallback === "object" &&
    typeof incoming === "object" &&
    !Array.isArray(fallback) &&
    !Array.isArray(incoming)
  ) {
    const base = fallback as Record<string, unknown>;
    const override = incoming as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys({ ...base, ...override }).map((key) => [
        key,
        key in override ? mergeContentData(base[key], override[key]) : base[key],
      ]),
    ) as T;
  }
  return (typeof incoming === "undefined" ? fallback : incoming) as T;
}

async function loadContent<T>(key: ContentKey, fallback: T): Promise<T> {
  noStore();

  try {
    const fromDb = await getDocumentData<T>(key);
    if (fromDb) return normalizeContent(mergeContentData(fallback, fromDb));
  } catch {
    // Fall through
  }

  try {
    const remote = await getJson<T>(`napt/content/${key}.json`);
    if (remote) return normalizeContent(mergeContentData(fallback, remote));
  } catch {
    // Fall through to local typed data
  }

  return normalizeContent(fallback);
}

export type SiteContent = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  supportPhone: string;
  email: string;
  headOffice: string;
  address: string;
  social: {
    facebook: string;
    whatsapp: string;
    instagram: string;
  };
  nav: { label: string; to: string }[];
  credit: string;
  footerBrand: {
    name: string;
    description: string;
    social: {
      facebook: string;
      whatsapp: string;
      instagram: string;
    };
  };
  footerQuickLinks: {
    heading: string;
    links: { label: string; to: string }[];
  };
  footerReachUs: {
    heading: string;
    phone: string;
    supportPhone: string;
    email: string;
    address: string;
  };
  footerHeadOffice: {
    heading: string;
    body: string;
  };
  footerLegal: {
    credit: string;
  };
};

export const getSiteContent = () =>
  loadContent<SiteContent>("site", {
    name: siteData.name,
    tagline: siteData.tagline,
    description: siteData.description,
    phone: siteData.phone,
    supportPhone: siteData.supportPhone,
    email: siteData.email,
    headOffice: siteData.headOffice,
    address: siteData.address,
    social: { ...siteData.social },
    nav: siteData.nav.map((item) => ({ ...item })),
    credit: siteData.credit,
    footerBrand: {
      name: siteData.footerBrand.name,
      description: siteData.footerBrand.description,
      social: { ...siteData.footerBrand.social },
    },
    footerQuickLinks: {
      heading: siteData.footerQuickLinks.heading,
      links: siteData.footerQuickLinks.links.map((item) => ({ ...item })),
    },
    footerReachUs: { ...siteData.footerReachUs },
    footerHeadOffice: { ...siteData.footerHeadOffice },
    footerLegal: { ...siteData.footerLegal },
  });

export const getHomeContent = () =>
  loadContent("home", {
    hero: homeData.heroContent,
    trainingIntro: homeData.trainingIntro,
    serviceCategories: homeData.serviceCategories,
    valuesIntro: homeData.valuesIntro,
    values: homeData.missionVisionValues,
    career: homeData.careerSection,
    gallery: homeData.gallery,
    testimonials: homeData.testimonials,
    testimonialsIntro: homeData.testimonialsIntro,
    cta: homeData.homeCta,
  });

export const getAboutContent = () =>
  loadContent("about", {
    hero: aboutData.aboutHero,
    missionVision: aboutData.missionVision,
    expertTeamIntro: aboutData.expertTeamIntro,
    credentials: aboutData.credentials,
    teamSection: aboutData.teamSection,
    team: aboutData.teamMembers,
    cta: aboutData.aboutCta,
  });

export const getServicesContent = () =>
  loadContent("services", {
    hero: servicesData.servicesHero,
    servicesIntro: servicesData.servicesIntro,
    services: servicesData.services,
    commitment: servicesData.commitment,
    opportunities: servicesData.opportunities,
    eligibility: servicesData.eligibility,
    eligibilityIntro: servicesData.eligibilityIntro,
    faqs: servicesData.faqs,
    faqIntro: servicesData.faqIntro,
    cta: servicesData.servicesCta,
  });

export const getTrainingCentersContent = () =>
  loadContent("training-centers", {
    hero: centersData.centersHero,
    intro: centersData.centersIntro,
    locationsIntro: centersData.locationsIntro,
    centers: centersData.trainingCenters,
    feature: centersData.centerFeature,
    opportunities: servicesData.opportunities,
    cta: centersData.centersCta,
  });

export const getTrainingCenters = async () => {
  const content = await getTrainingCentersContent();
  return content.centers;
};

export const getContactContent = () =>
  loadContent("contact", {
    hero: contactData.contactHero,
    channels: contactData.contactChannels,
    form: contactData.contactForm,
    cta: contactData.contactCta,
  });

export function localFallbacks() {
  return {
    site: {
      name: siteData.name,
      tagline: siteData.tagline,
      description: siteData.description,
      phone: siteData.phone,
      supportPhone: siteData.supportPhone,
      email: siteData.email,
      headOffice: siteData.headOffice,
      address: siteData.address,
      social: { ...siteData.social },
      nav: siteData.nav.map((item) => ({ ...item })),
      credit: siteData.credit,
      footerBrand: {
        name: siteData.footerBrand.name,
        description: siteData.footerBrand.description,
        social: { ...siteData.footerBrand.social },
      },
      footerQuickLinks: {
        heading: siteData.footerQuickLinks.heading,
        links: siteData.footerQuickLinks.links.map((item) => ({ ...item })),
      },
      footerReachUs: { ...siteData.footerReachUs },
      footerHeadOffice: { ...siteData.footerHeadOffice },
      footerLegal: { ...siteData.footerLegal },
    },
    home: {
      hero: homeData.heroContent,
      trainingIntro: homeData.trainingIntro,
      serviceCategories: homeData.serviceCategories,
      valuesIntro: homeData.valuesIntro,
      values: homeData.missionVisionValues,
      career: homeData.careerSection,
      gallery: homeData.gallery,
      testimonials: homeData.testimonials,
      testimonialsIntro: homeData.testimonialsIntro,
      cta: homeData.homeCta,
    },
    about: {
      hero: aboutData.aboutHero,
      missionVision: aboutData.missionVision,
      expertTeamIntro: aboutData.expertTeamIntro,
      credentials: aboutData.credentials,
      teamSection: aboutData.teamSection,
      team: aboutData.teamMembers,
      cta: aboutData.aboutCta,
    },
    services: {
      hero: servicesData.servicesHero,
      servicesIntro: servicesData.servicesIntro,
      services: servicesData.services,
      commitment: servicesData.commitment,
      opportunities: servicesData.opportunities,
      eligibility: servicesData.eligibility,
      eligibilityIntro: servicesData.eligibilityIntro,
      faqs: servicesData.faqs,
      faqIntro: servicesData.faqIntro,
      cta: servicesData.servicesCta,
    },
    "training-centers": {
      hero: centersData.centersHero,
      intro: centersData.centersIntro,
      locationsIntro: centersData.locationsIntro,
      centers: centersData.trainingCenters,
      feature: centersData.centerFeature,
      opportunities: servicesData.opportunities,
      cta: centersData.centersCta,
    },
    contact: {
      hero: contactData.contactHero,
      channels: contactData.contactChannels,
      form: contactData.contactForm,
      cta: contactData.contactCta,
    },
  } as const;
}
