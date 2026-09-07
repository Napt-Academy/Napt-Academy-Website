import { MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function FloatingContact({ site }: { site: SiteContent }) {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
      <a
        href={site.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-forest text-cream shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" aria-hidden />
      </a>
      <a
        href={`tel:${site.phone.replace(/\s/g, "")}`}
        aria-label={`Call ${site.phone}`}
        className="flex size-12 items-center justify-center rounded-full bg-gold text-ink shadow-lift transition-transform hover:scale-105"
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}
