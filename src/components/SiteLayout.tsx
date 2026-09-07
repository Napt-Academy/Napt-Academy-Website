import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";
import { getSiteContent } from "@/lib/content";

export async function SiteLayout({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  const site = await getSiteContent();

  return (
    <div className="flex min-h-screen flex-col">
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
