import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { ADMIN_FOOTER, getAdminSection } from "@/lib/admin-pages";
import { localFallbacks, mergeContentData } from "@/lib/content";
import { getDocumentData } from "@/lib/db/queries";

export default async function AdminFooterSectionPage({
  params,
}: {
  params: Promise<{ sectionSlug: string }>;
}) {
  const { sectionSlug } = await params;
  const section = getAdminSection(ADMIN_FOOTER, sectionSlug);
  if (!section) notFound();

  const fallbackDocument = localFallbacks()[ADMIN_FOOTER.docKey] as Record<string, unknown>;
  const document = await getDocumentData<Record<string, unknown>>(ADMIN_FOOTER.docKey);
  const initialData = mergeContentData(fallbackDocument[section.key], document?.[section.key]);
  if (typeof initialData === "undefined") notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/footer"
          className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Footer content
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">Footer</p>
            <h1 className="mt-1 font-display text-2xl font-semibold">{section.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-secondary"
          >
            View site
            <ExternalLink className="size-4" aria-hidden />
          </a>
        </div>
      </div>
      <SectionEditor pageSlug={ADMIN_FOOTER.slug} sectionSlug={section.slug} initialData={initialData} />
    </div>
  );
}
