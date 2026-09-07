import type { ImageAsset, TeamMember } from "@/types";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const aboutHero = {
  title: "ABOUT US",
  image: {
    src: u("photo-1508672019048-805c876b67e2", 1920),
    alt: "Soldiers standing at attention during a parade",
  } as ImageAsset,
};

export const missionVision = {
  eyebrow: "Since 2012",
  heading: "Our Mission & Vision",
  paragraphs: [
    "At NAPT Academy Panamaram, we are dedicated to shaping disciplined, motivated individuals equipped for success in India's defence, paramilitary, and police services.",
    "Founded in 2012 in the heart of Wayanad, our mission is to bridge the gap between ambition and achievement — by delivering accessible, high-quality training.",
    "We combine academic excellence, military-style physical training, mental resilience building, and moral education to transform aspirants into confident, capable, and service-ready leaders of tomorrow.",
  ],
  image: {
    src: u("photo-1526506118085-60ce8714f8c5"),
    alt: "Cadets in disciplined formation during morning drill",
  } as ImageAsset,
};

export const expertTeamIntro = {
  eyebrow: "Expertise",
  heading: "Your Success, Our Expert Team",
  paragraphs: [
    "NAPT Academy is led by experienced defence officers and retired officials who have lived the selection process from the inside, alongside academic mentors who specialise in recruitment syllabi.",
    "This combination gives every candidate real-world recruitment knowledge — what the ground tests actually measure, how boards assess personality, and where most aspirants lose marks.",
    "Our discipline-first approach means structured timetables, measurable fitness benchmarks and honest feedback at every stage of preparation.",
  ],
  points: [
    "Experienced defence officers as physical trainers",
    "Retired officials guiding interview and SSB rounds",
    "Academic mentors for written examination subjects",
    "Real-world recruitment knowledge and updated standards",
    "Discipline-first daily routine for every batch",
  ],
  image: {
    src: u("photo-1571019613454-1cb2f99b2d8b"),
    alt: "Trainer guiding aspirants through a strength session",
  } as ImageAsset,
};

export const credentials = {
  eyebrow: "Credentials",
  heading: "Official Credentials & Accreditation",
  body: "NAPT Academy operates as a registered pre-recruitment training institute with a documented track record across defence, paramilitary and state uniformed service recruitment drives in Kerala.",
  items: [
    {
      id: "registered",
      title: "Registered Training Institute",
      description:
        "Functioning since 2012 from Panamaram, Wayanad with formally registered training operations across multiple districts.",
      icon: "BadgeCheck",
    },
    {
      id: "curriculum",
      title: "Recruitment-Aligned Curriculum",
      description:
        "Physical and academic modules mapped to current Agniveer, CAPF and state police selection standards.",
      icon: "ClipboardCheck",
    },
    {
      id: "mentors",
      title: "Verified Mentor Panel",
      description:
        "Serving-standard physical trainers and retired officers with verifiable service backgrounds.",
      icon: "ShieldCheck",
    },
    {
      id: "network",
      title: "Institutional Network",
      description:
        "Working relationships with recruitment awareness bodies keep our notifications and eligibility guidance current.",
      icon: "Network",
    },
  ],
};

export const teamSection = {
  eyebrow: "Our Team",
  heading: "Your Success, Our Expert Team",
  body: "At NAPT Academy, our expert team—including seasoned educators and retired officers—offers focused guidance and real-world insights to help students succeed in competitive exams with confidence and clarity.",
};

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Col. Rajeev Menon (Retd.)",
    designation: "Director & Chief Mentor",
    image: {
      src: u("photo-1560250097-0b93528c311a", 800),
      alt: "Portrait of the academy director",
    },
  },
  {
    id: "tm2",
    name: "Sub. Maj. Thomas Kurian (Retd.)",
    designation: "Head of Physical Training",
    image: {
      src: u("photo-1519085360753-af0119f7cbe7", 800),
      alt: "Portrait of the head physical trainer",
    },
  },
  {
    id: "tm3",
    name: "Anitha Ravindran",
    designation: "Academic Coordinator",
    image: {
      src: u("photo-1573497019940-1c28c88b4f3e", 800),
      alt: "Portrait of the academic coordinator",
    },
  },
  {
    id: "tm4",
    name: "Hav. Suresh Babu (Retd.)",
    designation: "SSB & Interview Mentor",
    image: {
      src: u("photo-1500648767791-00dcc994a43e", 800),
      alt: "Portrait of the interview mentor",
    },
  },
  {
    id: "tm5",
    name: "Nithin Joseph",
    designation: "Mathematics & Reasoning Faculty",
    image: {
      src: u("photo-1507003211169-0a1dd7228f2d", 800),
      alt: "Portrait of the mathematics faculty",
    },
  },
  {
    id: "tm6",
    name: "Devika Nair",
    designation: "English & Communication Faculty",
    image: {
      src: u("photo-1580489944761-15a19d654956", 800),
      alt: "Portrait of the English faculty",
    },
  },
  {
    id: "tm7",
    name: "Arun Kumar P",
    designation: "Ground Training Instructor",
    image: {
      src: u("photo-1506794778202-cad84cf45f1d", 800),
      alt: "Portrait of a ground training instructor",
    },
  },
  {
    id: "tm8",
    name: "Reshma Thomas",
    designation: "Student Counsellor",
    image: {
      src: u("photo-1487412720507-e7ab37603c6f", 800),
      alt: "Portrait of the student counsellor",
    },
  },
];

export const aboutCta = {
  heading: "Ready to Start Your Journey Into Uniform?",
  body: "Talk to a NAPT coordinator about batch timings, eligibility and the centre closest to you.",
};
