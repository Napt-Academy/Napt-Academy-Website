import type { ContactChannel, ImageAsset } from "@/types";
import { siteData } from "./site";

const u = (id: string, w = 1920) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const contactHero = {
  title: "CONTACT US",
  image: {
    src: u("photo-1595113316349-9fa4eb24f884"),
    alt: "Silhouette of soldiers against a dramatic sky",
  } as ImageAsset,
};

export const contactChannels: ContactChannel[] = [
  {
    id: "phone",
    title: "Phone",
    icon: "Phone",
    lines: [
      { label: "Admissions", value: siteData.phone, href: "tel:+919745129069" },
      { label: "Support", value: siteData.supportPhone, href: "tel:+918086129069" },
    ],
  },
  {
    id: "email",
    title: "Email",
    icon: "Mail",
    lines: [{ label: "Support or Info", value: siteData.email, href: `mailto:${siteData.email}` }],
  },
  {
    id: "address",
    title: "Address",
    icon: "MapPin",
    lines: [
      { value: "NAPT Academy Plaza Building Near" },
      { value: "KSFE Panamaram, Wayanad, Kerala" },
      { value: "670645" },
    ],
  },
];

export const contactForm = {
  heading: "Get In Touch",
  body: "Tell us which centre you would like to train at and our coordinator will get back to you with batch timings, eligibility and admission details.",
};

export const contactCta = {
  heading: "Prefer To Call?",
  body: "Our admissions team is available across all Kerala centres.",
};
