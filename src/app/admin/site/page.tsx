import { SiteSettingsEditor } from "@/components/admin/SiteSettingsEditor";
import { getDocumentData } from "@/lib/db/queries";
import { localFallbacks, mergeContentData, type SiteContent } from "@/lib/content";

export default async function Page() {
  const fallback = localFallbacks().site as SiteContent;
  const fromDb = await getDocumentData<SiteContent>("site");
  const initialData = mergeContentData(fallback, fromDb);

  return <SiteSettingsEditor initialData={initialData} />;
}
