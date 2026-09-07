import type { ImageAsset, TrainingCenter } from "@/types";

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const centersHero = {
  title: "Our Training Centers",
  image: {
    src: u("photo-1509475826633-fed577a2c71b", 1920),
    alt: "Trainees running together during a morning session",
  } as ImageAsset,
};

export const centersIntro = {
  eyebrow: "Our Network",
  heading: "Elite Physical and Academic Training to the aspirants for Armed Forces",
  body: "Our training centre is dedicated to delivering high quality physical and academic training for the energetic youngsters joining any Navy, Airforce, Para Military, Police, Excise, Forest departments.",
  image: {
    src: u("photo-1461896836934-ffe607ba8211"),
    alt: "Group of aspirants training at sunrise",
  } as ImageAsset,
};

const map = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const trainingCenters: TrainingCenter[] = [
  {
    id: "kozhikode",
    name: "NAPT Kozhikode",
    address: "Near Municipal Stadium, Mananchira, Kozhikode, Kerala",
    phone: "+91 97451 29069",
    whatsapp: "919745129069",
    mapUrl: map("NAPT Academy Kozhikode Kerala"),
  },
  {
    id: "malappuram",
    name: "NAPT Malappuram",
    address: "Up Hill, Down Road, Malappuram, Kerala",
    phone: "+91 80861 29069",
    whatsapp: "918086129069",
    mapUrl: map("NAPT Academy Malappuram Kerala"),
  },
  {
    id: "kannur",
    name: "NAPT Kannur",
    address: "Thavakkara, Near Municipal Bus Stand, Kannur, Kerala",
    phone: "+91 97451 29069",
    whatsapp: "919745129069",
    mapUrl: map("NAPT Academy Kannur Kerala"),
  },
  {
    id: "pavumba",
    name: "NAPT Pavumba (Karunagappally)",
    address: "Pavumba, Karunagappally, Kollam, Kerala",
    phone: "+91 80861 29069",
    whatsapp: "918086129069",
    mapUrl: map("NAPT Academy Pavumba Karunagappally Kerala"),
  },
  {
    id: "ernakulam",
    name: "NAPT Ernakulam",
    address: "Kaloor, Ernakulam, Kochi, Kerala",
    phone: "+91 97451 29069",
    whatsapp: "919745129069",
    mapUrl: map("NAPT Academy Ernakulam Kerala"),
  },
  {
    id: "vatakara",
    name: "NAPT Vatakara",
    address: "Near Municipal Ground, Vatakara, Kozhikode, Kerala",
    phone: "+91 80861 29069",
    whatsapp: "918086129069",
    mapUrl: map("NAPT Academy Vatakara Kerala"),
  },
  {
    id: "panamaram",
    name: "NAPT Panamaram",
    address: "NAPT Academy Plaza Building, Near KSFE, Panamaram, Wayanad, Kerala - 670645",
    phone: "+91 97451 29069",
    whatsapp: "919745129069",
    mapUrl: map("NAPT Academy Panamaram Wayanad Kerala"),
  },
  {
    id: "attingal",
    name: "NAPT Attingal (Trivandrum)",
    address: "Attingal, Thiruvananthapuram, Kerala",
    phone: "+91 80861 29069",
    whatsapp: "918086129069",
    mapUrl: map("NAPT Academy Attingal Trivandrum Kerala"),
  },
  {
    id: "pathanamthitta",
    name: "NAPT Pathanamthitta",
    address: "Near Municipal Stadium, Pathanamthitta, Kerala",
    phone: "+91 97451 29069",
    whatsapp: "919745129069",
    mapUrl: map("NAPT Academy Pathanamthitta Kerala"),
  },
  {
    id: "vithura",
    name: "NAPT Vithura (Trivandrum)",
    address: "Vithura, Thiruvananthapuram, Kerala",
    phone: "+91 80861 29069",
    whatsapp: "918086129069",
    mapUrl: map("NAPT Academy Vithura Trivandrum Kerala"),
  },
  {
    id: "thirumala",
    name: "NAPT Thirumala (Trivandrum)",
    address: "Thirumala, Thiruvananthapuram, Kerala",
    phone: "+91 97451 29069",
    whatsapp: "919745129069",
    mapUrl: map("NAPT Academy Thirumala Trivandrum Kerala"),
  },
];

export const locationsIntro = {
  eyebrow: "Locations",
  heading: "Centres Across Kerala",
  body: "Train at the centre closest to you — every location follows the same curriculum and fitness benchmarks.",
};

export const centerFeature = {
  title: "Elite Defense & Security Training Center",
  body: "Join the ranks of tomorrow's protectors with our all-in-one training program designed to prepare aspirants for Army, Police, and other uniformed jobs. We offer expert physical training, exam preparation, and real-life technical skills to help students succeed in competitive defence and security careers.",
  image: {
    src: u("photo-1571902943202-507ec2618e8f", 1920),
    alt: "Aspirants performing a group training drill at a NAPT centre",
  } as ImageAsset,
};

export const centersCta = {
  heading: "Not Sure Which Centre Suits You?",
  body: "Share your location and target recruitment — we will recommend the right batch.",
};
