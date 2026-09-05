import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { getAboutContent } from "@/lib/content";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CTASection } from "@/components/CTASection";

const title = "About Us | NAPT Academy — Defence Training Institute in Wayanad";
const description =
  "Since 2012, NAPT Academy has prepared Kerala aspirants for defence, paramilitary and police careers with retired officers, expert faculty and a discipline-first routine.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about-us" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/about-us",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function AboutPage() {
  const { hero, missionVision, expertTeamIntro, credentials, teamSection, team } =
    await getAboutContent();

  return (
    <SiteLayout>
      <PageHero title={hero.title} image={hero.image} breadcrumb="About Us" />

      <section className="py-16 sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Image
              src={missionVision.image.src}
              alt={missionVision.image.alt}
              width={1600}
              height={1067}
              className="h-full max-h-[30rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading align="left" eyebrow="Since 2012" title={missionVision.heading} />
            <div className="mt-5 space-y-4 text-muted-foreground">
              {missionVision.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grain-surface py-16 sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow="Expertise" title={expertTeamIntro.heading} />
            <div className="mt-5 space-y-4 text-muted-foreground">
              {expertTeamIntro.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-6 space-y-3">
              {expertTeamIntro.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <Image
              src={expertTeamIntro.image.src}
              alt={expertTeamIntro.image.alt}
              width={1600}
              height={1067}
              className="h-full max-h-[30rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-forest py-16 text-cream sm:py-24">
        <div className="section-x">
          <SectionHeading inverted eyebrow="Credentials" title={credentials.heading} body={credentials.body} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {credentials.items.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <article className="h-full rounded-2xl border border-cream/12 bg-cream/5 p-7">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gold text-ink">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="section-x">
          <SectionHeading eyebrow="Our Team" title={teamSection.heading} body={teamSection.body} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={i * 60}>
                <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <Image
                    src={member.image.src}
                    alt={member.image.alt}
                    width={640}
                    height={800}
                    className="h-60 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{member.designation}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
