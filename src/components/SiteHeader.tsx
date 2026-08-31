import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { siteData } from "@/data/site";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-cream/90 backdrop-blur">
      <div className="section-x flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label={`${siteData.name} home`}>
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold tracking-widest text-primary-foreground">
            N
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-foreground">
              {siteData.name}
            </span>
            <span className="block text-[11px] tracking-wide text-muted-foreground">
              {siteData.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {siteData.nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
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
          className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
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
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary" }}
                className="rounded-md px-2 py-3 text-sm font-medium text-foreground/80"
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
