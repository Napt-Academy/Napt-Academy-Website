import { desc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@/lib/db";
import { contactEnquiries, contentDocuments, mediaAssets, type ContentKey } from "@/lib/db/schema";

export async function getDocumentData<T>(key: ContentKey): Promise<T | null> {
  if (!hasDatabaseUrl()) return null;
  try {
    const db = getDb();
    const rows = await db
      .select({ data: contentDocuments.data })
      .from(contentDocuments)
      .where(eq(contentDocuments.key, key))
      .limit(1);
    const row = rows[0];
    if (!row) return null;
    return row.data as T;
  } catch {
    return null;
  }
}

export async function upsertDocument(key: ContentKey, data: unknown) {
  const db = getDb();
  await db
    .insert(contentDocuments)
    .values({ key, data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: contentDocuments.key,
      set: { data, updatedAt: new Date() },
    });
}

export async function listDocuments() {
  if (!hasDatabaseUrl()) return [];
  const db = getDb();
  return db.select().from(contentDocuments).orderBy(contentDocuments.key);
}

export async function listMedia() {
  if (!hasDatabaseUrl()) return [];
  const db = getDb();
  return db.select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
}

export async function insertMedia(input: { url: string; alt?: string; pathname?: string }) {
  const db = getDb();
  const [row] = await db
    .insert(mediaAssets)
    .values({
      url: input.url,
      alt: input.alt ?? "",
      pathname: input.pathname ?? "",
    })
    .returning();
  return row;
}

export async function deleteMediaById(id: string) {
  const db = getDb();
  const rows = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  const row = rows[0];
  if (!row) return null;
  await db.delete(mediaAssets).where(eq(mediaAssets.id, id));
  return row;
}

export async function insertEnquiry(input: {
  name: string;
  centerId: string;
  centerName: string;
  subject: string;
  message: string;
}) {
  if (!hasDatabaseUrl()) return null;
  const db = getDb();
  const [row] = await db.insert(contactEnquiries).values(input).returning();
  return row;
}

export async function listEnquiries() {
  if (!hasDatabaseUrl()) return [];
  const db = getDb();
  return db.select().from(contactEnquiries).orderBy(desc(contactEnquiries.createdAt));
}

export async function deleteEnquiry(id: string) {
  const db = getDb();
  await db.delete(contactEnquiries).where(eq(contactEnquiries.id, id));
}

export async function countEnquiries() {
  if (!hasDatabaseUrl()) return 0;
  const db = getDb();
  const rows = await db.select({ id: contactEnquiries.id }).from(contactEnquiries);
  return rows.length;
}
