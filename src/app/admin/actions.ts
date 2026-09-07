"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  isAdminAuthenticated,
  validateAdminCredentials,
} from "@/lib/auth";
import { deleteBlobUrl } from "@/lib/blob";
import { deleteEnquiry, deleteMediaById, getDocumentData, upsertDocument } from "@/lib/db/queries";
import { CONTENT_KEYS, type ContentKey } from "@/lib/db/schema";
import { getAdminPage, getAdminSection } from "@/lib/admin-pages";
import { localFallbacks } from "@/lib/content";

function requireAdmin() {
  return isAdminAuthenticated().then((ok) => {
    if (!ok) throw new Error("Unauthorized");
  });
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/about-us");
  revalidatePath("/services");
  revalidatePath("/our-training-centers");
  revalidatePath("/contact-us");
  revalidatePath("/admin");
  revalidatePath("/admin/site");
  revalidatePath("/admin/home");
  revalidatePath("/admin/about");
  revalidatePath("/admin/services");
  revalidatePath("/admin/centers");
  revalidatePath("/admin/contact");
  revalidatePath("/admin/media");
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/pages");
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  try {
    if (!validateAdminCredentials(email, password)) {
      return { error: "Invalid email or password" };
    }
  } catch {
    return { error: "Admin credentials are not configured on the server" };
  }

  await createAdminSession(email);
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveDocumentAction(key: string, dataJson: string) {
  await requireAdmin();
  if (!CONTENT_KEYS.includes(key as ContentKey)) {
    return { error: "Invalid document key" };
  }
  let data: unknown;
  try {
    data = JSON.parse(dataJson);
  } catch {
    return { error: "Invalid JSON" };
  }
  try {
    await upsertDocument(key as ContentKey, data);
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to save document",
    };
  }
  revalidatePublic();
  return { ok: true };
}

export async function saveSectionAction(pageSlug: string, sectionSlug: string, dataJson: string) {
  await requireAdmin();
  const page = getAdminPage(pageSlug);
  if (!page) return { error: "Invalid page" };
  const section = getAdminSection(page, sectionSlug);
  if (!section) return { error: "Invalid section" };

  let sectionData: unknown;
  try {
    sectionData = JSON.parse(dataJson);
  } catch {
    return { error: "The section contains invalid data" };
  }

  try {
    const current =
      (await getDocumentData<Record<string, unknown>>(page.docKey)) ??
      (localFallbacks()[page.docKey] as Record<string, unknown>);
    await upsertDocument(page.docKey, { ...current, [section.key]: sectionData });
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to save section",
    };
  }

  revalidatePublic();
  revalidatePath(`/admin/pages/${page.slug}`);
  revalidatePath(`/admin/pages/${page.slug}/${section.slug}`);
  return { ok: true };
}

export async function deleteMediaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const row = await deleteMediaById(id);
  if (row?.url) await deleteBlobUrl(row.url);
  revalidatePath("/admin/media");
}

export async function deleteEnquiryAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteEnquiry(id);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
