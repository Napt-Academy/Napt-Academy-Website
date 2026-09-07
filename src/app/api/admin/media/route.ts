import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { convertAndUploadWebp } from "@/lib/blob";
import { insertMedia } from "@/lib/db/queries";
import { hasDatabaseUrl } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const alt = String(formData.get("alt") ?? "");

  if (files.length === 0) {
    return NextResponse.json({ error: "No images provided" }, { status: 400 });
  }

  const urls: string[] = [];
  try {
    for (const file of files) {
      const uploaded = await convertAndUploadWebp(file, "napt");
      urls.push(uploaded.url);
      if (hasDatabaseUrl()) {
        await insertMedia({
          url: uploaded.url,
          alt,
          pathname: uploaded.pathname,
        });
      }
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to upload one or more images",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ urls });
}
