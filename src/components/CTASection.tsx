import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSiteContent } from "@/lib/content";
import { Reveal } from "./Reveal";

export async function CTASection({
  heading = "Ready to Start Your Journey Into Uniform?",
  body = "Talk to a NAPT coordinator about batch timings, eligibility and the centre closest to you.",
}: {
  heading?: string;
  body?: string;
}) {
  const site = await getSiteContent();

  return (
    <section className="bg-olive-dark py-16 text-cream sm:py-20">
      <div className="section-x">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">{heading}</h2>
          <p className="max-w-2xl text-cream/75">{body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gold text-ink hover:bg-gold-soft">
              <Link href="/contact-us">Enquire Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>Call {site.phone}</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
