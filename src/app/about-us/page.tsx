import type { Metadata } from "next";
import { Check, Facebook, Instagram, MessageCircle } from "lucide-react";
import { getAboutContent } from "@/lib/content";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { CTASection } from "@/components/CTASection";
import { ResponsiveImage } from "@/components/ResponsiveImage";

function whatsappHref(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

const title = "About Us | NAPT Academy — Defence Training Institute in Wayanad";
const description =
  "Since 2012, NAPT Academy has prepared Kerala aspirants for defence, paramilitary and police careers with retired officers, expert faculty and a discipline-first routine.";

export const dynamic = "force-dynamic";

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
  const { hero, missionVision, expertTeamIntro, credentials, teamSection, team, cta } =
    await getAboutContent();

  return (
    <SiteLayout>
      <PageHero title={hero.title} image={hero.image} breadcrumb="About Us" />

      <section className="py-16 sm:py-24">
        <div className="section-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <ResponsiveImage
              image={missionVision.image}
              width={1600}
              height={1067}
              className="h-full max-h-[30rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              align="left"
              eyebrow={missionVision.eyebrow}
              title={missionVision.heading}
            />
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
            <SectionHeading
              align="left"
              eyebrow={expertTeamIntro.eyebrow}
              title={expertTeamIntro.heading}
            />
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
            <ResponsiveImage
              image={expertTeamIntro.image}
              width={1600}
              height={1067}
              className="h-full max-h-[30rem] w-full rounded-2xl object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-forest py-16 text-cream sm:py-24">
        <div className="section-x">
          <SectionHeading
            inverted
            eyebrow={credentials.eyebrow}
            title={credentials.heading}
            body={credentials.body}
          />
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
          <SectionHeading
            eyebrow={teamSection.eyebrow}
            title={teamSection.heading}
            body={teamSection.body}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => {
              const facebook = member.facebook?.trim();
              const instagram = member.instagram?.trim();
              const whatsapp = member.whatsapp?.trim();
              const hasSocial = Boolean(facebook || instagram || whatsapp);

              return (
                <Reveal key={member.id} delay={i * 60}>
                  <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    <div className="group relative overflow-hidden">
                      <ResponsiveImage
                        image={member.image}
                        width={640}
                        height={800}
                        className="h-60 w-full object-cover"
                      />
                      {hasSocial ? (
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink/55 px-4 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                          <p className="text-center text-sm font-semibold text-cream">{member.name}</p>
                          <div className="flex items-center gap-3">
                            {facebook ? (
                              <a
                                href={facebook}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${member.name} on Facebook`}
                                className="inline-flex size-9 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                              >
                                <Facebook className="size-4" aria-hidden />
                              </a>
                            ) : null}
                            {instagram ? (
                              <a
                                href={instagram}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`${member.name} on Instagram`}
                                className="inline-flex size-9 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                              >
                                <Instagram className="size-4" aria-hidden />
                              </a>
                            ) : null}
                            {whatsapp ? (
                              <a
                                href={whatsappHref(whatsapp)}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`WhatsApp ${member.name}`}
                                className="inline-flex size-9 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-gold hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                              >
                                <MessageCircle className="size-4" aria-hidden />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{member.designation}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection heading={cta.heading} body={cta.body} />
    </SiteLayout>
  );
}
