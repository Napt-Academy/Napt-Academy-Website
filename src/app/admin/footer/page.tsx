import Link from "next/link";
import { ArrowRight, PanelBottom } from "lucide-react";
import { ADMIN_FOOTER } from "@/lib/admin-pages";

export default function AdminFooterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Footer</h1>
        <p className="mt-1 text-sm text-muted-foreground">{ADMIN_FOOTER.description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ADMIN_FOOTER.sections.map((section) => (
          <Link
            key={section.slug}
            href={`/admin/footer/${section.slug}`}
            className="group min-h-48 rounded-xl border border-border bg-card p-5 shadow-card transition hover:border-primary hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <PanelBottom className="size-5" aria-hidden />
              </span>
              <ArrowRight
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
