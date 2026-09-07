import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, PanelsTopLeft } from "lucide-react";
import { getAdminPage } from "@/lib/admin-pages";

export default async function AdminPageSections({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const { pageSlug } = await params;
  const page = getAdminPage(pageSlug);
  if (!page) notFound();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/admin/pages"
              className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              All pages
            </Link>
            <h1 className="font-display text-2xl font-semibold">{page.title} content</h1>
            <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
          </div>
          <a
            href={page.publicPath}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-secondary"
          >
            View page
            <ExternalLink className="size-4" aria-hidden />
          </a>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {page.sections.map((section) => (
          <Link
            key={section.slug}
            href={`/admin/pages/${page.slug}/${section.slug}`}
            className="group min-h-48 rounded-xl border border-border bg-card p-5 shadow-card transition hover:border-primary hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <PanelsTopLeft className="size-5" aria-hidden />
              </span>
              <ArrowRight
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
