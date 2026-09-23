import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTrainingCentersContent } from "@/lib/content";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CTASection } from "@/components/CTASection";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const title = "Our Training Centers | NAPT Academy Across Kerala";
const description =
  "Find your nearest NAPT Academy training centre — Kozhikode, Malappuram, Kannur, Ernakulam, Trivandrum, Wayanad and more — with contact numbers and directions.";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-training-centers" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/our-training-centers",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

function whatsappHref(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

function CenterIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </a>
  );
}

export default async function CentersPage() {
  const { hero, intro, locationsIntro, centers, feature, opportunities, cta } =
    await getTrainingCentersContent();

  return (
    <SiteLayout>
      <PageHero title={hero.title} image={hero.image} breadcrumb="Our Training Centers" />

      <section className="py-16 sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={intro.eyebrow}
              title={intro.heading}
              body={intro.body}
            />
          </Reveal>
          <Reveal delay={120}>
            <ResponsiveImage
              image={intro.image}
              width={1600}
              height={1067}
              className="h-full max-h-[26rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      <section className="grain-surface py-16 sm:py-24">
        <div className="section-x">
          <SectionHeading
            eyebrow={locationsIntro.eyebrow}
            title={locationsIntro.heading}
            body={locationsIntro.body}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {centers.map((center, i) => (
              <Reveal key={center.id} delay={i * 50}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground">{center.name}</h3>
                  <p className="mt-3 flex gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {center.address}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-2">
                    <a
                      href={`tel:${center.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <Phone className="size-3.5" aria-hidden />
                      Call
                    </a>
                    {center.whatsapp ? (
                      <CenterIconLink href={whatsappHref(center.whatsapp)} label={`WhatsApp ${center.name}`}>
                        <MessageCircle className="size-4" aria-hidden />
                      </CenterIconLink>
                    ) : null}
                    {center.facebook ? (
                      <CenterIconLink href={center.facebook} label={`${center.name} on Facebook`}>
                        <Facebook className="size-4" aria-hidden />
                      </CenterIconLink>
                    ) : null}
                    {center.instagram ? (
                      <CenterIconLink href={center.instagram} label={`${center.name} on Instagram`}>
                        <Instagram className="size-4" aria-hidden />
                      </CenterIconLink>
                    ) : null}
                    {center.mapUrl ? (
                      <CenterIconLink href={center.mapUrl} label={`${center.name} location`}>
                        <MapPin className="size-4" aria-hidden />
                      </CenterIconLink>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20 text-cream sm:py-28">
        <ResponsiveImage image={feature.image} fill sizes="100vw" className="-z-20 object-cover" />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="section-x">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">{feature.title}</h2>
            <p className="mt-5 leading-relaxed text-cream/80">{feature.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="section-x grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              {opportunities.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {opportunities.body}
            </p>
          </Reveal>
          <div className="space-y-8">
            {opportunities.benefits.map((benefit, i) => (
              <Reveal key={benefit.id} delay={i * 80}>
                <div className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon name={benefit.icon} className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading={cta.heading} body={cta.body} />
    </SiteLayout>
  );
}
