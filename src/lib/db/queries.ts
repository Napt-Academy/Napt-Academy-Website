import { and, count, desc, eq, gte, ilike, inArray, lte, type SQL } from "drizzle-orm";
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

export type EnquiryListOptions = {
  q?: string;
  from?: Date;
  to?: Date;
  limit?: number;
  offset?: number;
};

function enquiryWhere(options?: Pick<EnquiryListOptions, "q" | "from" | "to">): SQL | undefined {
  const conditions = [];
  const q = options?.q?.trim();
  if (q) conditions.push(ilike(contactEnquiries.name, `%${q}%`));
  if (options?.from) conditions.push(gte(contactEnquiries.createdAt, options.from));
  if (options?.to) conditions.push(lte(contactEnquiries.createdAt, options.to));
  if (conditions.length === 0) return undefined;
  return conditions.length === 1 ? conditions[0] : and(...conditions);
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

export async function listEnquiries(options?: EnquiryListOptions) {
  if (!hasDatabaseUrl()) return [];
  const db = getDb();
  const where = enquiryWhere(options);
  const query = db.select().from(contactEnquiries).where(where).orderBy(desc(contactEnquiries.createdAt));
  if (typeof options?.limit === "number") {
    return query.limit(options.limit).offset(options.offset ?? 0);
  }
  return query;
}

export async function deleteEnquiry(id: string) {
  const db = getDb();
  await db.delete(contactEnquiries).where(eq(contactEnquiries.id, id));
}

export async function deleteEnquiries(ids: string[]) {
  if (ids.length === 0) return;
  const db = getDb();
  await db.delete(contactEnquiries).where(inArray(contactEnquiries.id, ids));
}

export async function countEnquiries(options?: Pick<EnquiryListOptions, "q" | "from" | "to">) {
  if (!hasDatabaseUrl()) return 0;
  const db = getDb();
  const where = enquiryWhere(options);
  const rows = await db.select({ value: count() }).from(contactEnquiries).where(where);
  return Number(rows[0]?.value ?? 0);
}
