import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { getAdminPage, getAdminSection } from "@/lib/admin-pages";
import { localFallbacks, mergeContentData } from "@/lib/content";
import { getDocumentData } from "@/lib/db/queries";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ pageSlug: string; sectionSlug: string }>;
}) {
  const { pageSlug, sectionSlug } = await params;
  const page = getAdminPage(pageSlug);
  if (!page) notFound();
  const section = getAdminSection(page, sectionSlug);
  if (!section) notFound();

  const fallbackDocument = localFallbacks()[page.docKey] as Record<string, unknown>;
  const document = await getDocumentData<Record<string, unknown>>(page.docKey);
  const initialData = mergeContentData(fallbackDocument[section.key], document?.[section.key]);
  if (typeof initialData === "undefined") notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href={`/admin/pages/${page.slug}`}
          className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {page.title} content
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">{page.title}</p>
            <h1 className="mt-1 font-display text-2xl font-semibold">{section.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
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
      <SectionEditor pageSlug={page.slug} sectionSlug={section.slug} initialData={initialData} />
    </div>
  );
}
