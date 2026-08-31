import { MessageCircle, Phone } from "lucide-react";
import { siteData } from "@/data/site";

export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
      <a
        href={siteData.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-forest text-cream shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="size-5" aria-hidden />
      </a>
      <a
        href={`tel:${siteData.phone.replace(/\s/g, "")}`}
        aria-label={`Call ${siteData.phone}`}
        className="flex size-12 items-center justify-center rounded-full bg-gold text-ink shadow-lift transition-transform hover:scale-105"
      >
        <Phone className="size-5" aria-hidden />
      </a>
    </div>
  );
}
