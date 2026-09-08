import type { ForceCard, ImageAsset, ServiceCategory, Stat, Testimonial, ValueCard } from "@/types";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroContent = {
  eyebrow: "CAREER",
  heading: ["Guiding", "Warriors to the", "Right Path"],
  body: "Step into a place of discipline, purpose, and service. We help aspiring candidates prepare for recruitment and succeed in the selection process.",
  primaryCta: { label: "Join a Batch", href: "/contact-us" },
  secondaryCta: { label: "Explore Training", href: "/services" },
  image: {
    src: u("photo-1541873676-a18131494184", 1920),
    alt: "Soldiers in formation during a military training exercise at dawn",
  } as ImageAsset,
};

const armedForces: ForceCard[] = [
  {
    id: "army",
    title: "Indian Army Preparation",
    subtitle: "Physical, written & GD training",
    image: { src: u("photo-1579912437766-7896df6d3cd3"), alt: "Army soldier in field training" },
  },
  {
    id: "airforce",
    title: "Indian Air Force",
    subtitle: "Agniveer Vayu focused coaching",
    image: { src: u("photo-1474302770737-173ee21bab63"), alt: "Fighter aircraft in flight" },
  },
  {
    id: "navy",
    title: "Indian Navy Preparation",
    subtitle: "SSR / MR entrance readiness",
    image: { src: u("photo-1544551763-46a013bb70d5"), alt: "Naval vessel at sea" },
  },
];

const paramilitary: ForceCard[] = [
  {
    id: "crpf",
    title: "CRPF",
    subtitle: "Central Reserve Police Force",
    image: { src: u("photo-1521737604893-d14cc237f11d"), alt: "Uniformed personnel in formation" },
  },
  {
    id: "itbp",
    title: "ITBP",
    subtitle: "Indo-Tibetan Border Police",
    image: { src: u("photo-1454789548928-9efd52dc4031"), alt: "Mountain border terrain patrol" },
  },
  {
    id: "ssb",
    title: "SSB",
    subtitle: "Sashastra Seema Bal",
    image: { src: u("photo-1519638831568-d9897f54ed69"), alt: "Border guard on duty" },
  },
  {
    id: "bsf",
    title: "BSF",
    subtitle: "Border Security Force",
    image: { src: u("photo-1517486808906-6ca8b3f04846"), alt: "Guard post at the border" },
  },
];

const police: ForceCard[] = [
  {
    id: "kerala-police",
    title: "Kerala Police",
    subtitle: "Physical efficiency training",
    image: { src: u("photo-1590650516494-0c8e4a4dd67e"), alt: "Police officer on duty" },
  },
  {
    id: "excise",
    title: "Excise",
    subtitle: "Endurance & ground tests",
    image: { src: u("photo-1518709268805-4e9042af9f23"), alt: "Enforcement officer at work" },
  },
  {
    id: "forest",
    title: "Forest",
    subtitle: "Field fitness & stamina",
    image: { src: u("photo-1441974231531-c6227db76b6e"), alt: "Dense forest trail" },
  },
];

export const serviceCategories: ServiceCategory[] = [
  { id: "armed-forces", title: "Indian Armed Forces", items: armedForces, carousel: true },
  { id: "paramilitary", title: "Paramilitary Forces", items: paramilitary, carousel: true },
  { id: "police", title: "Police Forces (Physical Training)", items: police, carousel: true },
];

export const trainingIntro = {
  eyebrow: "What We Train For",
  heading: "Preparation For Every Uniformed Career",
  body: "Structured physical, academic and interview training aligned to current recruitment standards across the armed forces, paramilitary and state services.",
};

export const valuesIntro = {
  eyebrow: "Who We Are",
  heading: "Mission, Vision & Values",
  body: "The principles that shape every batch we train.",
};

export const missionVisionValues: ValueCard[] = [
  {
    id: "mission",
    title: "Our Mission",
    icon: "Target",
    description:
      "To empower every aspiring defence candidate with personalised guidance, expert mentorship, and the confidence to serve the nation with pride and purpose.",
  },
  {
    id: "vision",
    title: "Our Vision",
    icon: "Eye",
    description:
      "To become a leading pre-recruitment training institute for Indian Armed Forces, shaping disciplined and capable individuals, who uphold National security and integrity.",
  },
  {
    id: "values",
    title: "Our Values",
    icon: "ShieldCheck",
    description:
      "Integrity, dedication, and service. We uphold the highest standards in our training, ensuring our trainers and educators are always prepared to guide every candidate toward success.",
  },
];

export const careerSection = {
  eyebrow: "Our Track Record",
  heading: ["Building Careers", "That Serve The", "Nation"],
  body: "NAPT is dedicated to guiding candidates toward prestigious careers in the Indian Armed Forces — Army, Air Force and Coast Guard — through proven methodologies, expert trainers, and strong institutional networks.",
  stats: [
    { id: "years", value: "17+", label: "Years of Defence Experience", icon: "Medal" },
    { id: "mentors", value: "10+", label: "Certified Defence Mentors", icon: "Users" },
    {
      id: "candidates",
      value: "7,000+",
      label: "Candidates Trained",
      icon: "GraduationCap",
      emphasis: true,
    },
  ] as Stat[],
};

export const gallery = {
  eyebrow: "Gallery",
  heading: ["Moments of Pride and", "Preparation"],
  body: "Explore snapshots from our training sessions, student achievements, and special events that showcase the discipline, determination, and spirit of our future warriors.",
  images: [
    { src: u("photo-1552674605-db6ffd4facb5"), alt: "Candidates running on a training track" },
    { src: u("photo-1461896836934-ffe607ba8211"), alt: "Group fitness session at sunrise" },
    { src: u("photo-1571019613454-1cb2f99b2d8b"), alt: "Strength training in the gym" },
    { src: u("photo-1517649763962-0c623066013b"), alt: "Team drill on the ground" },
    { src: u("photo-1524178232363-1fb2b075b655"), alt: "Classroom session for aspirants" },
    { src: u("photo-1526506118085-60ce8714f8c5"), alt: "Cadets marching in formation" },
  ] as ImageAsset[],
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Arjun Krishna",
    rating: 5,
    content:
      "The physical training at NAPT is exactly what the recruitment ground demands. The daily routine and the mentors' discipline helped me clear the Agniveer physical test in my first attempt.",
  },
  {
    id: "t2",
    name: "Anandhu S",
    rating: 5,
    content:
      "Written exam coaching here is very structured. General Knowledge and Reasoning classes were clear and the mock tests gave me the confidence I needed on exam day.",
  },
  {
    id: "t3",
    name: "Fathima Rishana",
    rating: 5,
    content:
      "As a girl aspirant I was unsure at first, but the trainers treated everyone equally and pushed us all to give our best. The atmosphere is disciplined and very supportive.",
  },
  {
    id: "t4",
    name: "Vishnu Prasad",
    rating: 5,
    content:
      "Retired officers taking the SSB and interview sessions made a huge difference. Mock interviews and group discussions prepared me for the real selection board.",
  },
  {
    id: "t5",
    name: "Muhammed Shafi",
    rating: 4,
    content:
      "Morning ground sessions, evening academics and constant tracking of progress. NAPT gave me a routine I still follow after joining service.",
  },
  {
    id: "t6",
    name: "Sreelakshmi R",
    rating: 5,
    content:
      "The team keeps you updated on every recruitment notification and eligibility change. That guidance alone saved me from missing an application deadline.",
  },
];

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  heading: "Words From Our Aspirants",
  body: "Candidates who trained with NAPT and went on to clear their selection process.",
};

export const homeCta = {
  heading: "Ready to Start Your Journey Into Uniform?",
  body: "Talk to a NAPT coordinator about batch timings, eligibility and the centre closest to you.",
};
