import type { Benefit, Eligibility, FaqItem, ImageAsset, Service, Stat } from "@/types";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const servicesHero = {
  title: "SERVICES",
  image: {
    src: u("photo-1520880867055-1e30d1cb001c", 1920),
    alt: "Uniformed trainees standing in formation on a parade ground",
  } as ImageAsset,
};

export const services: Service[] = [
  {
    id: "alliances",
    title: "Strategic Recruitment Alliances",
    icon: "Handshake",
    description:
      "We collaborate with esteemed defence and recruitment agencies to ensure our trainees gain access to the latest military and police selection standards. These partnerships provide valuable insights, real-world strategies, and expert mentorship.",
  },
  {
    id: "hub",
    title: "Army & Police Recruitment Hub",
    icon: "Radar",
    description:
      "Our exclusive portal offers real-time notifications, detailed eligibility criteria, and regular application timelines for major military, paramilitary, and police recruitment drives—streamlining your journey from awareness to application.",
  },
  {
    id: "pre-recruitment",
    title: "Comprehensive Pre-Recruitment Training",
    icon: "Layers",
    description:
      "Top-tier physical conditioning, academic readiness for entrance exams, and mental resilience training build the resilient, physically strong talent essential to clearing recruitment processes and achieving selection success.",
  },
  {
    id: "fitness",
    title: "Physical Fitness Training",
    icon: "Dumbbell",
    description:
      "Undergo rigorous physical conditioning to meet recruitment standards. Our training focuses on endurance, strength, and agility—essential elements to help you successfully clear the physical tests required by the armed and uniformed forces.",
  },
  {
    id: "exam",
    title: "Entrance Exam Mastery",
    icon: "BookOpen",
    description:
      "Excel in written exams with our expert coaching. We cover comprehensive subjects—General Knowledge, Reasoning, Mathematics, and English—ensuring you are fully prepared to tackle every academic challenge with confidence.",
  },
  {
    id: "ssb",
    title: "Interview & SSB Training",
    icon: "MessagesSquare",
    description:
      "Develop confidence and communication skills for interviews and SSB assessments. Our focused sessions include personal story development, group discussions, mock interviews, and role-playing to ensure success in every stage of the selection process.",
  },
];

export const servicesIntro = {
  eyebrow: "What We Offer",
  heading: "Training Built Around The Selection Process",
  body: "Every programme maps to what recruitment boards actually test — ground performance, written papers and personality assessment.",
};

export const commitment = {
  eyebrow: "Our Commitment",
  heading: "Building Future Guardians: NAPT Academy's Commitment",
  body: "NAPT Academy is committed to preparing students for defence, police and uniformed services with structured physical conditioning, exam-focused academics and mentorship from people who have served. Every batch is guided from the first ground session to the final selection board.",
  stats: [
    { id: "years", value: "17+", label: "Years of Defence Expertise", icon: "Medal" },
    { id: "mentors", value: "10+", label: "Certified Defence Mentors", icon: "Users" },
  ] as Stat[],
  image: {
    src: u("photo-1517649763962-0c623066013b"),
    alt: "Trainees completing an endurance drill together",
  } as ImageAsset,
};

export const opportunities = {
  eyebrow: "Access For All",
  heading: "More Opportunities For Everyone",
  body: "At our training centre, we believe that success should be accessible to all. Whether you're aiming for a career in the Army, Police, or Other Uniformed jobs, we provide equal access to quality training. Our emphasis on discipline, structured guidance and practical preparation ensures every student can unlock their full potential and take confident steps toward a brighter future.",
  benefits: [
    {
      id: "all-in-one",
      title: "All-in-One Defense Training",
      icon: "Shield",
      description:
        "Get trained for Army, Air Force, and Other Uniform Jobs under one roof with expert guidance and practical sessions.",
    },
    {
      id: "structured",
      title: "Structured Courses & Expert Coaching",
      icon: "ListChecks",
      description:
        "Our programs combine physical training, written exam prep, and interview guidance to help you succeed.",
    },
    {
      id: "every-aspirant",
      title: "Opportunities for Every Aspirant",
      icon: "Sparkles",
      description:
        "No matter your background, we help you build a strong foundation and open doors to secure careers in defence and security.",
    },
  ] as Benefit[],
  image: {
    src: u("photo-1552674605-db6ffd4facb5"),
    alt: "Aspirants training together on a running track",
  } as ImageAsset,
};

export const eligibility: Eligibility[] = [
  {
    id: "agniveer-gd",
    title: "AGNIVEER (General Duty)",
    category: "Indian Army",
    requirements: [
      "Age: 17½ to 21 years",
      "Education: Class 10th with 45% aggregate and 33% in each subject",
      "Height: 165 cm (region-wise relaxation applicable)",
      "Chest: 77 cm with 5 cm expansion",
      "Physical: 1.6 km run, pull-ups, 9 feet ditch, zig-zag balance",
    ],
  },
  {
    id: "agniveer-ssr",
    title: "AGNIVEER (SSR / MR)",
    category: "Indian Navy",
    requirements: [
      "Age: 17½ to 21 years",
      "SSR: Class 12th with Maths & Physics",
      "MR: Class 10th pass",
      "Height: 157 cm minimum with proportionate weight",
      "Physical: 1.6 km run in 6 min 30 sec, 20 squats, 15 push-ups",
    ],
  },
  {
    id: "agniveer-vayu",
    title: "AGNIVEER (Vayu)",
    category: "Indian Air Force",
    requirements: [
      "Age: 17½ to 21 years",
      "Science: 12th with Maths, Physics & English (50% aggregate)",
      "Other than Science: 12th in any stream with 50% aggregate",
      "Height: 152.5 cm minimum",
      "Physical: 1.6 km run in 6 min 30 sec, 10 push-ups, 10 sit-ups, 20 squats",
    ],
  },
  {
    id: "ssc-gd",
    title: "SSC GENERAL DUTY (GD)",
    category: "CAPF",
    requirements: [
      "Age: 18 to 23 years",
      "Education: Class 10th pass",
      "Height: 170 cm (male), 157 cm (female)",
      "Chest: 80 cm with 5 cm expansion (male)",
      "Physical: 5 km run in 24 min (male), 1.6 km in 8½ min (female)",
    ],
  },
  {
    id: "nursing-assistant",
    title: "Nursing Assistant",
    category: "Indian Army",
    requirements: [
      "Age: 17½ to 23 years",
      "Education: 12th with Physics, Chemistry, Biology & English (50% aggregate)",
      "Height: 165 cm minimum",
      "Chest: 77 cm with 5 cm expansion",
      "Physical: 1.6 km run, medical fitness as per Army standards",
    ],
  },
  {
    id: "paramedical",
    title: "Paramedical",
    category: "Navy / Air Force",
    requirements: [
      "Age: 17½ to 23 years",
      "Education: 12th Science stream or recognised paramedical diploma",
      "Height: 157 cm minimum with proportionate weight",
      "Vision: As per service medical standards",
      "Physical: Standard endurance and medical fitness test",
    ],
  },
];

export const eligibilityIntro = {
  eyebrow: "Eligibility",
  heading: "Recruitment Eligibility At A Glance",
  body: "Standards vary by notification. Use this as a guide and confirm current criteria with our coordinators.",
};

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "Who can join NAPT Academy?",
    answer:
      "Any candidate aged 16 and above who is preparing for the Indian Armed Forces, paramilitary forces, police, excise or forest departments can join. Both male and female aspirants are trained.",
  },
  {
    id: "f2",
    question: "What does the training programme include?",
    answer:
      "Daily physical conditioning, written examination coaching in General Knowledge, Reasoning, Mathematics and English, plus interview and SSB preparation with mock sessions.",
  },
  {
    id: "f3",
    question: "Do you provide hostel or residential facilities?",
    answer:
      "Residential support is arranged near selected centres. Availability differs by location, so please contact the centre nearest to you for current details.",
  },
  {
    id: "f4",
    question: "How long is a typical course?",
    answer:
      "Most aspirants train for three to six months depending on their target recruitment and current fitness level. Short-term crash batches run before major notifications.",
  },
  {
    id: "f5",
    question: "Are the trainers ex-servicemen?",
    answer:
      "Yes. Our physical training and interview panels include retired defence officers and officials, supported by academic faculty who specialise in recruitment syllabi.",
  },
  {
    id: "f6",
    question: "How do I get recruitment notifications?",
    answer:
      "Enrolled candidates receive updates on notifications, eligibility changes and application timelines through our recruitment hub and centre coordinators.",
  },
  {
    id: "f7",
    question: "Is there a batch for working candidates?",
    answer:
      "Early morning and evening batches are available at most centres so that students and working aspirants can train without disturbing their schedule.",
  },
  {
    id: "f8",
    question: "How can I enrol?",
    answer:
      "Visit any NAPT centre or send an enquiry through our contact page. Our coordinator will guide you through eligibility, batch timings and the admission process.",
  },
];

export const faqsMl: FaqItem[] = [
  {
    id: "ml-f1",
    question: "ആർക്കൊക്കെ NAPT അക്കാദമിയിൽ ചേരാം?",
    answer:
      "16 വയസ്സും അതിനു മുകളിലുമുള്ള, ഇന്ത്യൻ സായുധസേന, അർദ്ധസൈനിക സേന, പോലീസ്, എക്സൈസ്, ഫോറസ്റ്റ് വകുപ്പുകൾക്കുള്ള പരീക്ഷയ്ക്ക് തയ്യാറെടുക്കുന്ന ഏതൊരു ഉദ്യോഗാർത്ഥിക്കും ചേരാം. ആൺകുട്ടികൾക്കും പെൺകുട്ടികൾക്കും പരിശീലനം നൽകുന്നു.",
  },
  {
    id: "ml-f2",
    question: "പരിശീലന പരിപാടിയിൽ എന്തൊക്കെ ഉൾപ്പെടും?",
    answer:
      "ദൈനംദിന ശാരീരിക പരിശീലനം, ജനറൽ നോളജ്, റീസണിങ്, ഗണിതം, ഇംഗ്ലീഷ് എന്നിവയിലെ ലിഖിത പരീക്ഷാ പരിശീലനം, അഭിമുഖവും എസ്.എസ്.ബി. തയ്യാറെടുപ്പും മോക്ക് സെഷനുകളും.",
  },
  {
    id: "ml-f3",
    question: "ഹോസ്റ്റൽ അല്ലെങ്കിൽ താമസ സൗകര്യം ഉണ്ടോ?",
    answer:
      "തിരഞ്ഞെടുത്ത സെന്ററുകൾക്ക് സമീപം താമസ സൗകര്യം ഏർപ്പാടാക്കുന്നു. ലഭ്യത സ്ഥലമനുസരിച്ച് വ്യത്യാസപ്പെടും. നിലവിലെ വിവരങ്ങൾക്ക് അടുത്തുള്ള സെന്ററുമായി ബന്ധപ്പെടുക.",
  },
  {
    id: "ml-f4",
    question: "ഒരു സാധാരണ കോഴ്‌സിന്റെ ദൈർഘ്യം എത്രയാണ്?",
    answer:
      "മിക്ക ഉദ്യോഗാർത്ഥികളും ലക്ഷ്യമിടുന്ന റിക്രൂട്ട്‌മെന്റും ഇപ്പോഴത്തെ ഫിറ്റ്‌നസ് നിലവാരവും അനുസരിച്ച് മൂന്ന് മുതൽ ആറ് മാസം വരെ പരിശീലിക്കുന്നു. പ്രധാന വിജ്ഞാപനങ്ങൾക്ക് മുമ്പ് ഹ്രസ്വകാല ക്രാഷ് ബാച്ചുകളും നടത്തുന്നു.",
  },
  {
    id: "ml-f5",
    question: "പരിശീലകർ മുൻ സൈനികരാണോ?",
    answer:
      "അതെ. ശാരീരിക പരിശീലനത്തിലും അഭിമുഖ പാനലിലും വിരമിച്ച പ്രതിരോധ ഉദ്യോഗസ്ഥരും ഉദ്യോഗസ്ഥരും ഉണ്ട്. റിക്രൂട്ട്‌മെന്റ് സിലബസിൽ വൈദഗ്ധ്യമുള്ള അക്കാദമിക് അധ്യാപകരും പിന്തുണ നൽകുന്നു.",
  },
  {
    id: "ml-f6",
    question: "റിക്രൂട്ട്‌മെന്റ് വിജ്ഞാപനങ്ങൾ എങ്ങനെ ലഭിക്കും?",
    answer:
      "ചേർന്ന ഉദ്യോഗാർത്ഥികൾക്ക് വിജ്ഞാപനങ്ങൾ, യോഗ്യതാ മാറ്റങ്ങൾ, അപേക്ഷാ സമയക്രമം എന്നിവ റിക്രൂട്ട്‌മെന്റ് ഹബ് വഴിയും സെന്റർ കോഓർഡിനേറ്റർമാർ വഴിയും ലഭിക്കും.",
  },
  {
    id: "ml-f7",
    question: "ജോലി ചെയ്യുന്നവർക്ക് ബാച്ച് ഉണ്ടോ?",
    answer:
      "മിക്ക സെന്ററുകളിലും അതിരാവിലെയും വൈകുന്നേരവും ബാച്ചുകൾ ഉണ്ട്. വിദ്യാർത്ഥികൾക്കും ജോലി ചെയ്യുന്ന ഉദ്യോഗാർത്ഥികൾക്കും ഷെഡ്യൂൾ തടസ്സപ്പെടാതെ പരിശീലിക്കാം.",
  },
  {
    id: "ml-f8",
    question: "എങ്ങനെ ചേരാം?",
    answer:
      "ഏതെങ്കിലും NAPT സെന്റർ സന്ദർശിക്കുകയോ കോൺടാക്ട് പേജ് വഴി അന്വേഷണം അയക്കുകയോ ചെയ്യുക. യോഗ്യത, ബാച്ച് സമയം, പ്രവേശന നടപടി എന്നിവ കോഓർഡിനേറ്റർ വിശദീകരിക്കും.",
  },
];

export const faqIntro = {
  eyebrow: "FAQ",
  heading: "Frequently Asked Questions",
};

export const servicesCta = {
  heading: "Ready to Start Your Journey Into Uniform?",
  body: "Talk to a NAPT coordinator about batch timings, eligibility and the centre closest to you.",
};
