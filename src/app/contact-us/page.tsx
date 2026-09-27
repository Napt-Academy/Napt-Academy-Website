import type { Metadata } from "next";
import { getContactContent, getSiteContent, getTrainingCenters } from "@/lib/content";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/SiteLayout";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { ContactForm } from "@/components/ContactForm";
import { CTASection } from "@/components/CTASection";

const title = "Contact Us | NAPT Academy Admissions";
const description =
  "Speak with a NAPT Academy coordinator about batch timings, eligibility and the training centre closest to you.";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactContent();
  return buildPageMetadata({
    path: "/contact-us",
    fallbackTitle: title,
    fallbackDescription: description,
    seo: contact.seo,
  });
}

export default async function ContactPage() {
  const [{ hero, channels, form, cta }, centers, site] = await Promise.all([
    getContactContent(),
    getTrainingCenters(),
    getSiteContent(),
  ]);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&z=15&output=embed`;

  return (
    <SiteLayout>
      <JsonLd data={breadcrumbJsonLd("Contact Us", "/contact-us")} />
      <PageHero title={hero.title} image={hero.image} breadcrumb="Contact Us" />

      <section className="py-16 sm:py-24">
        <div className="section-x">
          <div className="grid gap-6 md:grid-cols-3">
            {channels.map((channel, i) => (
              <Reveal key={channel.id} delay={i * 80}>
                <article className="h-full rounded-2xl border border-border bg-card p-7 shadow-card">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon name={channel.icon} className="size-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-foreground">{channel.title}</h2>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {channel.lines.map((line) => (
                      <li key={line.value}>
                        {line.label ? (
                          <span className="mr-1 font-medium text-foreground">{line.label}:</span>
                        ) : null}
                        {line.href ? (
                          <a href={line.href} className="transition-colors hover:text-primary">
                            {line.value}
                          </a>
                        ) : (
                          line.value
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
            <div className="relative h-full min-h-80 overflow-hidden rounded-2xl">
              <iframe
                title="NAPT Academy head office on Google Maps"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
            <ContactForm
              heading={form.heading}
              body={form.body}
              centers={centers.map((center) => ({ id: center.id, name: center.name }))}
            />
          </div>
        </div>
      </section>

      <CTASection heading={cta.heading} body={cta.body} />
    </SiteLayout>
  );
}
