/**
 * Content repository.
 *
 * The UI never imports the data modules directly — it calls these getters.
 * Today they resolve from local typed data in `src/data/*`. When
 * BLOB_READ_WRITE_TOKEN is set, `loadContent` tries Vercel Blob JSON at
 * `napt/content/${key}.json` and falls back to local data on failure.
 */
import * as aboutData from "@/data/about";
import * as contactData from "@/data/contact";
import * as homeData from "@/data/home";
import * as servicesData from "@/data/services";
import * as centersData from "@/data/trainingCenters";
import { siteData } from "@/data/site";
import { getJson } from "@/lib/blob";

async function loadContent<T>(key: string, fallback: T): Promise<T> {
  try {
    const remote = await getJson<T>(`napt/content/${key}.json`);
    if (remote) return remote;
  } catch {
    // Keep serving local typed data if Blob is unset or unreachable.
  }
  return fallback;
}

export const getSiteContent = () => loadContent("site", siteData);

export const getHomeContent = () =>
  loadContent("home", {
    hero: homeData.heroContent,
    serviceCategories: homeData.serviceCategories,
    values: homeData.missionVisionValues,
    career: homeData.careerSection,
    gallery: homeData.gallery,
    testimonials: homeData.testimonials,
  });

export const getAboutContent = () =>
  loadContent("about", {
    hero: aboutData.aboutHero,
    missionVision: aboutData.missionVision,
    expertTeamIntro: aboutData.expertTeamIntro,
    credentials: aboutData.credentials,
    teamSection: aboutData.teamSection,
    team: aboutData.teamMembers,
  });

export const getServicesContent = () =>
  loadContent("services", {
    hero: servicesData.servicesHero,
    services: servicesData.services,
    commitment: servicesData.commitment,
    opportunities: servicesData.opportunities,
    eligibility: servicesData.eligibility,
    faqs: servicesData.faqs,
  });

export const getTrainingCentersContent = () =>
  loadContent("training-centers", {
    hero: centersData.centersHero,
    intro: centersData.centersIntro,
    centers: centersData.trainingCenters,
    feature: centersData.centerFeature,
    opportunities: servicesData.opportunities,
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
  });
