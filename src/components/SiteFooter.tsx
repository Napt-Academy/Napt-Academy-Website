import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function SiteFooter({ site }: { site: SiteContent }) {
  return (
    <footer className="bg-forest text-cream">
      <div className="section-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{site.description}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={site.social.whatsapp}
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-gold">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.to}>
                <Link href={item.to} className="text-cream/75 transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-gold">Reach Us</p>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span className="flex flex-col">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                <a href={`tel:${site.supportPhone.replace(/\s/g, "")}`}>{site.supportPhone}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${site.email}`} className="break-all">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">{site.headOffice}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">
            Admissions open for Army, Navy, Air Force, Paramilitary, Police, Excise and Forest recruitment
            batches across all NAPT training centres in Kerala.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="section-x flex flex-col gap-2 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.credit}</p>
        </div>
      </div>
    </footer>
  );
}
