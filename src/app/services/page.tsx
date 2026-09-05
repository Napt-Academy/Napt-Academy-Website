import type { Metadata } from "next";
import Image from "next/image";
import { getServicesContent } from "@/lib/content";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const title = "Services | Physical, Written & SSB Training — NAPT Academy";
const description =
  "Physical fitness conditioning, entrance exam coaching, SSB and interview training, plus recruitment alerts and eligibility guidance for defence and police aspirants.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function ServicesPage() {
  const { hero, services, commitment, opportunities, eligibility, faqs } = await getServicesContent();

  return (
    <SiteLayout>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <PageHero title={hero.title} image={hero.image} breadcrumb="Services" />

      <section className="py-16 sm:py-24">
        <div className="section-x">
          <SectionHeading
            eyebrow="What We Offer"
            title="Training Built Around The Selection Process"
            body="Every programme maps to what recruitment boards actually test — ground performance, written papers and personality assessment."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 70}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 shadow-card transition-shadow hover:shadow-lift">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-16 text-cream sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading inverted align="left" eyebrow="Our Commitment" title={commitment.heading} body={commitment.body} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {commitment.stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex items-center gap-4 rounded-2xl border border-cream/12 bg-cream/5 p-5"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gold text-ink">
                    <Icon name={stat.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-display text-2xl font-semibold">{stat.value}</span>
                    <span className="block text-xs text-cream/70">{stat.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Image
              src={commitment.image.src}
              alt={commitment.image.alt}
              width={1600}
              height={1067}
              className="h-full max-h-[28rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      <section className="grain-surface py-16 sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Image
              src={opportunities.image.src}
              alt={opportunities.image.alt}
              width={1600}
              height={1067}
              className="h-full max-h-[28rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              align="left"
              eyebrow="Access For All"
              title={opportunities.heading}
              body={opportunities.body}
            />
            <ul className="mt-8 space-y-4">
              {opportunities.benefits.map((benefit) => (
                <li key={benefit.id} className="flex gap-4 rounded-2xl bg-card p-5 shadow-card">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon name={benefit.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{benefit.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{benefit.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="section-x">
          <SectionHeading
            eyebrow="Eligibility"
            title="Recruitment Eligibility At A Glance"
            body="Standards vary by notification. Use this as a guide and confirm current criteria with our coordinators."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eligibility.map((item, i) => (
              <Reveal key={item.id} delay={i * 70}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                  <p className="eyebrow text-primary">{item.category}</p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {item.requirements.map((req) => (
                      <li key={req} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="grain-surface py-16 sm:py-24">
        <div className="section-x max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
