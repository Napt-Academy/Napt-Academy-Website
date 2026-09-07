import type { ContentKey } from "@/lib/db/schema";

export type AdminSection = {
  slug: string;
  key: string;
  title: string;
  description: string;
};

export type AdminPageDefinition = {
  slug: string;
  docKey: ContentKey;
  title: string;
  description: string;
  publicPath: string;
  sections: readonly AdminSection[];
};

export const ADMIN_PAGES: readonly AdminPageDefinition[] = [
  {
    slug: "home",
    docKey: "home",
    title: "Home page",
    description: "Manage every section shown on the public homepage.",
    publicPath: "/",
    sections: [
      {
        slug: "hero",
        key: "hero",
        title: "Hero banner",
        description: "Main heading, introduction, and responsive background images.",
      },
      {
        slug: "training-intro",
        key: "trainingIntro",
        title: "Training introduction",
        description: "Heading and copy above the training categories.",
      },
      {
        slug: "training",
        key: "serviceCategories",
        title: "Training categories",
        description: "Armed forces, paramilitary, and police training cards.",
      },
      {
        slug: "values-intro",
        key: "valuesIntro",
        title: "Values introduction",
        description: "Heading and copy above mission, vision, and values.",
      },
      {
        slug: "values",
        key: "values",
        title: "Mission, vision & values",
        description: "The principles and messages shown below training.",
      },
      {
        slug: "career",
        key: "career",
        title: "Career & statistics",
        description: "Track record copy and academy statistics.",
      },
      {
        slug: "gallery",
        key: "gallery",
        title: "Gallery",
        description: "Gallery heading and responsive image collection.",
      },
      {
        slug: "testimonials",
        key: "testimonials",
        title: "Testimonials",
        description: "Candidate reviews, names, and ratings.",
      },
      {
        slug: "testimonials-intro",
        key: "testimonialsIntro",
        title: "Testimonials introduction",
        description: "Heading and copy above candidate reviews.",
      },
      {
        slug: "cta",
        key: "cta",
        title: "Call to action",
        description: "Closing message shown above the site footer.",
      },
    ],
  },
  {
    slug: "about",
    docKey: "about",
    title: "About page",
    description: "Manage the academy story, credentials, and team.",
    publicPath: "/about-us",
    sections: [
      {
        slug: "hero",
        key: "hero",
        title: "Hero banner",
        description: "Page title and responsive background images.",
      },
      {
        slug: "mission-vision",
        key: "missionVision",
        title: "Mission & vision",
        description: "Academy story, paragraphs, and section image.",
      },
      {
        slug: "expert-team",
        key: "expertTeamIntro",
        title: "Expert team introduction",
        description: "Expertise copy, key points, and section image.",
      },
      {
        slug: "credentials",
        key: "credentials",
        title: "Credentials",
        description: "Accreditation heading and credential cards.",
      },
      {
        slug: "team-heading",
        key: "teamSection",
        title: "Team introduction",
        description: "Heading and introduction above team members.",
      },
      {
        slug: "team",
        key: "team",
        title: "Team members",
        description: "Names, roles, portraits, and image descriptions.",
      },
      {
        slug: "cta",
        key: "cta",
        title: "Call to action",
        description: "Closing message shown above the site footer.",
      },
    ],
  },
  {
    slug: "services",
    docKey: "services",
    title: "Services page",
    description: "Manage training services, eligibility, and FAQs.",
    publicPath: "/services",
    sections: [
      {
        slug: "hero",
        key: "hero",
        title: "Hero banner",
        description: "Page title and responsive background images.",
      },
      {
        slug: "services-intro",
        key: "servicesIntro",
        title: "Services introduction",
        description: "Heading and copy above the service cards.",
      },
      {
        slug: "services",
        key: "services",
        title: "Training services",
        description: "Service cards and their descriptions.",
      },
      {
        slug: "commitment",
        key: "commitment",
        title: "Our commitment",
        description: "Commitment content, statistics, and image.",
      },
      {
        slug: "opportunities",
        key: "opportunities",
        title: "Equal opportunities",
        description: "Benefits, introduction, and section image.",
      },
      {
        slug: "eligibility",
        key: "eligibility",
        title: "Eligibility",
        description: "Recruitment categories and requirements.",
      },
      {
        slug: "eligibility-intro",
        key: "eligibilityIntro",
        title: "Eligibility introduction",
        description: "Heading and guidance above eligibility cards.",
      },
      {
        slug: "faqs",
        key: "faqs",
        title: "Frequently asked questions",
        description: "Questions and answers displayed on the page.",
      },
      {
        slug: "faq-intro",
        key: "faqIntro",
        title: "FAQ introduction",
        description: "Heading displayed above frequently asked questions.",
      },
      {
        slug: "cta",
        key: "cta",
        title: "Call to action",
        description: "Closing message shown above the site footer.",
      },
    ],
  },
  {
    slug: "training-centers",
    docKey: "training-centers",
    title: "Training centers",
    description: "Manage locations and training-center page sections.",
    publicPath: "/our-training-centers",
    sections: [
      {
        slug: "hero",
        key: "hero",
        title: "Hero banner",
        description: "Page title and responsive background images.",
      },
      {
        slug: "intro",
        key: "intro",
        title: "Network introduction",
        description: "Network heading, copy, and responsive image.",
      },
      {
        slug: "locations-intro",
        key: "locationsIntro",
        title: "Locations introduction",
        description: "Heading and copy above center locations.",
      },
      {
        slug: "centers",
        key: "centers",
        title: "Center locations",
        description: "Addresses, phone numbers, WhatsApp, and map links.",
      },
      {
        slug: "feature",
        key: "feature",
        title: "Feature banner",
        description: "Full-width message and responsive background images.",
      },
      {
        slug: "opportunities",
        key: "opportunities",
        title: "Why NAPT",
        description: "Benefits shown beneath the center list.",
      },
      {
        slug: "cta",
        key: "cta",
        title: "Call to action",
        description: "Closing message shown above the site footer.",
      },
    ],
  },
  {
    slug: "contact",
    docKey: "contact",
    title: "Contact page",
    description: "Manage contact details and enquiry form content.",
    publicPath: "/contact-us",
    sections: [
      {
        slug: "hero",
        key: "hero",
        title: "Hero banner",
        description: "Page title and responsive background images.",
      },
      {
        slug: "channels",
        key: "channels",
        title: "Contact channels",
        description: "Phone, email, address, and linked contact details.",
      },
      {
        slug: "form",
        key: "form",
        title: "Enquiry form",
        description: "Form heading and supporting copy.",
      },
      {
        slug: "cta",
        key: "cta",
        title: "Call to action",
        description: "Closing contact message above the footer.",
      },
    ],
  },
] as const;

export function getAdminPage(slug: string) {
  return ADMIN_PAGES.find((page) => page.slug === slug);
}

export function getAdminSection(page: AdminPageDefinition, slug: string) {
  return page.sections.find((section) => section.slug === slug);
}
