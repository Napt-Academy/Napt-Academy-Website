"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { siteData } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const getY = () =>
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const onScroll = () => setScrolled(getY() > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, [overlay]);

  const light = overlay && !scrolled && !open;

  return (
    <header
      className={cn(
        "z-50 border-b",
        overlay ? "fixed inset-x-0 top-0" : "sticky top-0",
        light ? "border-transparent bg-transparent" : "border-border/70 bg-cream/90 backdrop-blur",
      )}
    >
      <div className="section-x flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteData.name} home`}>
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold tracking-widest text-primary-foreground">
            N
          </span>
          <span className="leading-tight">
            <span
              className={cn(
                "block font-display text-lg font-semibold",
                light ? "text-cream" : "text-foreground",
              )}
            >
              {siteData.name}
            </span>
            <span
              className={cn(
                "block text-[11px] tracking-wide",
                light ? "text-cream/70" : "text-muted-foreground",
              )}
            >
              {siteData.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {siteData.nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                href={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  light
                    ? active
                      ? "text-gold"
                      : "text-cream/85 hover:text-gold"
                    : active
                      ? "text-primary"
                      : "text-foreground/75 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <a href={`tel:${siteData.phone.replace(/\s/g, "")}`}>
              <Phone className="size-4" aria-hidden />
              {siteData.phone}
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-md border lg:hidden",
            light ? "border-cream/40 text-cream" : "border-border text-foreground",
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-cream lg:hidden">
          <nav aria-label="Mobile" className="section-x flex flex-col py-3">
            {siteData.nav.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-3 text-sm font-medium",
                  pathname === item.to ? "text-primary" : "text-foreground/80",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <a href={`tel:${siteData.phone.replace(/\s/g, "")}`}>Call {siteData.phone}</a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
