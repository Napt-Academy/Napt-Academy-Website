import Image from "next/image";
import Link from "next/link";
import type { ImageAsset } from "@/types";

export function PageHero({
  title,
  image,
  breadcrumb,
}: {
  title: string;
  image: ImageAsset;
  breadcrumb: string;
}) {
  return (
    <section className="relative isolate flex min-h-[42vh] items-end overflow-hidden sm:min-h-[52vh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="section-x pb-12 sm:pb-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-cream/70">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{breadcrumb}</span>
        </nav>
        <h1 className="animate-rise text-4xl font-semibold tracking-tight text-cream uppercase sm:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
