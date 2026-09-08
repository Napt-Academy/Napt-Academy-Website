import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { getHomeContent, getSiteContent } from "@/lib/content";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { Button } from "@/components/ui/button";
import type { ImageAsset } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const title = "NAPT Academy | Defence, Police & Paramilitary Coaching in Kerala";
const description =
  "NAPT Academy trains aspirants for Army, Navy, Air Force, paramilitary, police, excise and forest recruitment with physical, written and interview coaching across Kerala.";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function HomePage() {
  const [
    {
      hero,
      trainingIntro,
      serviceCategories,
      valuesIntro,
      values,
      career,
      gallery,
      testimonials,
      testimonialsIntro,
      cta,
    },
    site,
  ] = await Promise.all([getHomeContent(), getSiteContent()]);

  return (
    <SiteLayout overlayHeader>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: site.name,
          description,
          telephone: site.phone,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "NAPT Academy Plaza Building, Near KSFE, Panamaram",
            addressLocality: "Wayanad",
            addressRegion: "Kerala",
            postalCode: "670645",
            addressCountry: "IN",
          },
        }}
      />
      {/* Hero */}
      <section className="relative isolate flex h-svh min-h-svh w-full items-center overflow-hidden">
        <ResponsiveImage
          image={hero.image}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="hero-overlay absolute inset-0 -z-10" />
        <div className="section-x py-24 pt-28">
          <div className="max-w-2xl">
            <p className="eyebrow animate-rise text-gold">{hero.eyebrow}</p>
            <h1 className="animate-rise mt-4 text-4xl leading-[1.05] font-semibold text-cream sm:text-6xl lg:text-7xl">
              {hero.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              {hero.body}
            </p>
            <div className="animate-rise mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold text-ink hover:bg-gold-soft">
                <Link href={hero.primaryCta.href}>{hero.primaryCta.label}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services / forces */}
      <section className="grain-surface py-16 sm:py-24">
        <div className="section-x space-y-16">
          <SectionHeading
            eyebrow={trainingIntro.eyebrow}
            title={trainingIntro.heading}
            body={trainingIntro.body}
          />

          {serviceCategories.map((category) => (
            <div key={category.id}>
              <h3 className="mb-6 text-2xl font-semibold text-foreground">{category.title}</h3>

              {category.carousel || category.id === "armed-forces" ? (
                <Carousel opts={{ align: "start" }} className="w-full pb-12 sm:pb-0">
                  <CarouselContent>
                    {category.items.map((item) => (
                      <CarouselItem key={item.id} className="sm:basis-1/2 lg:basis-1/3">
                        <ForceTile title={item.title} subtitle={item.subtitle} image={item.image} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="bottom-0 left-auto right-10 top-auto translate-y-0 sm:-left-12 sm:bottom-auto sm:right-auto sm:top-1/2 sm:-translate-y-1/2" />
                  <CarouselNext className="bottom-0 right-0 top-auto translate-y-0 sm:-right-12 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2" />
                </Carousel>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, i) => (
                    <Reveal key={item.id} delay={i * 80}>
                      <ForceTile title={item.title} subtitle={item.subtitle} image={item.image} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Mission / vision / values */}
      <section className="bg-forest py-16 text-cream sm:py-24">
        <div className="section-x">
          <SectionHeading
            eyebrow={valuesIntro.eyebrow}
            title={valuesIntro.heading}
            inverted
            body={valuesIntro.body}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.id} delay={i * 90}>
                <article className="h-full rounded-2xl border border-cream/12 bg-cream/5 p-7">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-gold text-ink">
                    <Icon name={value.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-cream">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career + stats */}
      <section className="py-16 sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow={career.eyebrow}
              title={career.heading}
              body={career.body}
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {career.stats.map((stat) => (
                <div
                  key={stat.id}
                  className={
                    stat.emphasis
                      ? "flex items-center gap-4 rounded-2xl bg-primary p-6 text-primary-foreground shadow-card"
                      : "flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-card"
                  }
                >
                  <span
                    className={
                      stat.emphasis
                        ? "flex size-12 shrink-0 items-center justify-center rounded-xl bg-cream/15"
                        : "flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"
                    }
                  >
                    <Icon name={stat.icon} className="size-6" />
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-semibold">{stat.value}</span>
                    <span className="block text-sm opacity-80">{stat.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="grain-surface py-16 sm:py-24">
        <div className="section-x">
          <SectionHeading eyebrow={gallery.eyebrow} title={gallery.heading} body={gallery.body} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.images.map((image, i) => (
              <Reveal key={image.src} delay={i * 70}>
                <figure className="group overflow-hidden rounded-2xl shadow-card">
                  <ResponsiveImage
                    image={image}
                    width={800}
                    height={512}
                    className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="section-x">
          <SectionHeading
            eyebrow={testimonialsIntro.eyebrow}
            title={testimonialsIntro.heading}
            body={testimonialsIntro.body}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 70}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                  <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        aria-hidden
                        className={
                          idx < t.rating ? "size-4 fill-gold text-gold" : "size-4 text-border"
                        }
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.content}</p>
                  <p className="mt-5 font-semibold text-foreground">{t.name}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading={cta.heading} body={cta.body} />
    </SiteLayout>
  );
}

function ForceTile({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string | undefined;
  image: ImageAsset;
}) {
  return (
    <article className="group relative h-72 overflow-hidden rounded-2xl shadow-card">
      <ResponsiveImage
        image={image}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h4 className="text-lg font-semibold text-cream">{title}</h4>
        {subtitle ? <p className="mt-1 text-sm text-cream/75">{subtitle}</p> : null}
      </div>
    </article>
  );
}
