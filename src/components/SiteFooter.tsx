import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function SiteFooter({ site }: { site: SiteContent }) {
  const { footerBrand, footerQuickLinks, footerReachUs, footerHeadOffice, footerLegal } = site;

  return (
    <footer className="bg-forest text-cream">
      <div className="section-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={site.footerLogo?.trim() || site.logo?.trim() || "/brand/napt-logo.png"}
            alt={footerBrand.name}
            className="h-20 w-auto object-contain"
          />
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{footerBrand.description}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={footerBrand.social.facebook}
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={footerBrand.social.instagram}
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={footerBrand.social.whatsapp}
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-gold">{footerQuickLinks.heading}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerQuickLinks.links.map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="text-cream/75 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-gold">{footerReachUs.heading}</p>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span className="flex flex-col">
                <a href={`tel:${footerReachUs.phone.replace(/\s/g, "")}`}>{footerReachUs.phone}</a>
                <a href={`tel:${footerReachUs.supportPhone.replace(/\s/g, "")}`}>
                  {footerReachUs.supportPhone}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${footerReachUs.email}`} className="break-all">
                {footerReachUs.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>{footerReachUs.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">{footerHeadOffice.heading}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">{footerHeadOffice.body}</p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="section-x flex flex-col gap-2 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {footerBrand.name}. All rights reserved.
          </p>
          <p>{footerLegal.credit}</p>
        </div>
      </div>
    </footer>
  );
}
