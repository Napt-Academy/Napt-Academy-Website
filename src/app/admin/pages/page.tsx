import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { ADMIN_PAGES } from "@/lib/admin-pages";

export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Pages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a public page, then edit one section at a time.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ADMIN_PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="group rounded-xl border border-border bg-card p-5 shadow-card transition hover:border-primary hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <FileText className="size-5" aria-hidden />
              </span>
              <ArrowRight
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{page.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{page.description}</p>
            <p className="mt-4 text-xs font-medium text-primary">{page.sections.length} sections</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
