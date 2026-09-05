import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteData } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest text-cream">
      <div className="section-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold">{siteData.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{siteData.description}</p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteData.social.facebook}
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={siteData.social.instagram}
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-gold hover:text-ink"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={siteData.social.whatsapp}
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
            {siteData.nav.map((item) => (
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
                <a href={`tel:${siteData.phone.replace(/\s/g, "")}`}>{siteData.phone}</a>
                <a href={`tel:${siteData.supportPhone.replace(/\s/g, "")}`}>{siteData.supportPhone}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${siteData.email}`} className="break-all">
                {siteData.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <span>{siteData.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold">{siteData.headOffice}</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/75">
            Admissions open for Army, Navy, Air Force, Paramilitary, Police, Excise and Forest recruitment
            batches across all NAPT training centres in Kerala.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="section-x flex flex-col gap-2 py-5 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteData.name}. All rights reserved.
          </p>
          <p>{siteData.credit}</p>
        </div>
      </div>
    </footer>
  );
}
