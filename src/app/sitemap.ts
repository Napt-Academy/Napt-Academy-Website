import type { MetadataRoute } from "next";
import { listDocuments } from "@/lib/db/queries";
import { absoluteUrl, isDocumentNoIndex, isIndexingAllowed, PUBLIC_PAGES } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexingAllowed()) return [];

  const documents = await listDocuments();
  const updatedAt = new Map(documents.map((document) => [document.key, document.updatedAt]));

  return PUBLIC_PAGES.flatMap((page) => {
    const document = documents.find((item) => item.key === page.key);
    if (document && isDocumentNoIndex(document.data)) return [];
    const lastmod = updatedAt.get(page.key);
    return [
      {
        url: absoluteUrl(page.path),
        ...(lastmod ? { lastModified: lastmod } : {}),
      },
    ];
  });
}
