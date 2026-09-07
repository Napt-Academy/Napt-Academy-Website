import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const CONTENT_KEYS = [
  "site",
  "home",
  "about",
  "services",
  "training-centers",
  "contact",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export const contentDocuments = pgTable("content_documents", {
  key: text("key").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull().default(""),
  pathname: text("pathname").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactEnquiries = pgTable("contact_enquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  centerId: text("center_id").notNull(),
  centerName: text("center_name").notNull().default(""),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
