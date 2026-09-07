import { DocumentEditor } from "@/components/admin/DocumentEditor";
import { getDocumentData } from "@/lib/db/queries";
import { localFallbacks } from "@/lib/content";
import type { ContentKey } from "@/lib/db/schema";

export async function AdminDocumentPage({
  docKey,
  title,
  description,
}: {
  docKey: ContentKey;
  title: string;
  description: string;
}) {
  const fallbacks = localFallbacks();
  const fromDb = await getDocumentData(docKey);
  const initialData = fromDb ?? fallbacks[docKey];

  return (
    <DocumentEditor
      docKey={docKey}
      title={title}
      description={description}
      initialData={initialData}
    />
  );
}
