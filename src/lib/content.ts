/**
 * Content repository.
 *
 * The UI never imports the data modules directly — it calls these getters.
 * Today they resolve from local typed data in `src/data/*`. To move content to
 * a remote store (Vercel Blob JSON, a CMS, or the database), replace the body
 * of `loadContent` with a fetch of the remote JSON and keep the shapes intact.
 * No UI component needs to change.
 */
import * as aboutData from "@/data/about";
import * as contactData from "@/data/contact";
import * as homeData from "@/data/home";
import * as servicesData from "@/data/services";
import * as centersData from "@/data/trainingCenters";
import { siteData } from "@/data/site";

async function loadContent<T>(_key: string, fallback: T): Promise<T> {
  // Remote source hook: when a content store is configured, fetch
  // `/napt/content/${_key}.json` here and fall back to local data on failure.
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

export const getTrainingCenters = async () => centersData.trainingCenters;

export const getContactContent = () =>
  loadContent("contact", {
    hero: contactData.contactHero,
    channels: contactData.contactChannels,
    form: contactData.contactForm,
  });
