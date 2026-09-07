import "dotenv/config";
import * as aboutData from "../src/data/about";
import * as contactData from "../src/data/contact";
import * as homeData from "../src/data/home";
import * as servicesData from "../src/data/services";
import * as centersData from "../src/data/trainingCenters";
import { siteData } from "../src/data/site";
import { CONTENT_KEYS, type ContentKey } from "../src/lib/db/schema";
import { upsertDocument } from "../src/lib/db/queries";

const docs: Record<ContentKey, unknown> = {
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
};

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is required to seed.");
    process.exit(1);
  }

  for (const key of CONTENT_KEYS) {
    await upsertDocument(key, docs[key]);
    console.log(`seeded ${key}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
