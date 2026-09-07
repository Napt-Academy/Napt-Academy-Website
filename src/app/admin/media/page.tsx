import { MediaLibrary } from "./MediaLibrary";
import { listMedia } from "@/lib/db/queries";
import { hasDatabaseUrl } from "@/lib/db";

export default async function AdminMediaPage() {
  const items = hasDatabaseUrl() ? await listMedia() : [];

  return (
    <MediaLibrary
      initialItems={items.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
      }))}
    />
  );
}
