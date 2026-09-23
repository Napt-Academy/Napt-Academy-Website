export type ImageAsset = {
  src: string;
  mobileSrc?: string;
  alt: string;
};

export type ForceCard = {
  id: string;
  title: string;
  subtitle?: string;
  image: ImageAsset;
};

export type ServiceCategory = {
  id: string;
  title: string;
  items: ForceCard[];
  carousel?: boolean;
};

export type ValueCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
  icon: string;
  emphasis?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  content: string;
  rating: number;
};

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  image: ImageAsset;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Eligibility = {
  id: string;
  title: string;
  category: string;
  requirements: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type TrainingCenter = {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  mapUrl?: string;
};

export type Benefit = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type ContactChannel = {
  id: string;
  title: string;
  icon: string;
  lines: { label?: string; value: string; href?: string }[];
};
