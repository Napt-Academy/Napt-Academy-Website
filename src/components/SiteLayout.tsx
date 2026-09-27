import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";
import { JsonLd } from "./JsonLd";
import { getSiteContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export async function SiteLayout({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  const site = await getSiteContent();
  const siteUrl = getSiteUrl();
  const sameAs = [site.social.facebook, site.social.instagram, site.social.whatsapp].filter((url) =>
    /^https?:\/\//i.test(url.trim()),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: site.name,
          description: site.description,
          url: siteUrl,
          telephone: site.phone,
          email: site.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address,
          },
          ...(sameAs.length > 0 ? { sameAs } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          description: site.description,
          url: siteUrl,
        }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader overlay={overlayHeader} site={site} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter site={site} />
      <FloatingContact site={site} />
    </div>
  );
}
