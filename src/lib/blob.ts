import "server-only";
import { del, get, list, put, type PutBlobResult } from "@vercel/blob";
import sharp from "sharp";

function token() {
  return process.env["BLOB_READ_WRITE_TOKEN"];
}

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function getJson<T>(pathname: string): Promise<T | null> {
  const accessToken = token();
  if (!accessToken) return null;

  const result = await get(pathname, {
    access: "public",
    token: accessToken,
    useCache: false,
  });
  if (!result) return null;

  const text = await new Response(result.stream).text();
  if (!text) return null;
  return JSON.parse(text) as T;
}

export async function putJson(pathname: string, data: unknown): Promise<PutBlobResult | null> {
  const accessToken = token();
  if (!accessToken) return null;

  return put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    token: accessToken,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function listBlobs(prefix: string) {
  const accessToken = token();
  if (!accessToken) return [];
  const { blobs } = await list({ prefix, token: accessToken });
  return blobs;
}

export async function deleteBlob(urlOrPathname: string) {
  const accessToken = token();
  if (!accessToken) return;
  await del(urlOrPathname, { token: accessToken });
}

export async function convertAndUploadWebp(file: File, pathnamePrefix = "napt") {
  if (!ALLOWED.has(file.type)) {
    throw new Error(`Unsupported image type: ${file.type || "unknown"}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 8MB or smaller");
  }

  const accessToken = token();
  const input = Buffer.from(await file.arrayBuffer());
  const webp = await sharp(input)
    .rotate()
    .resize({
      width: 2000,
      height: 2000,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toBuffer();

  const base = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9-_]+/g, "-") || "image";
  const filename = `${pathnamePrefix}/${Date.now()}-${base}.webp`;

  const blob = await put(filename, webp, {
    access: "public",
    contentType: "image/webp",
    addRandomSuffix: true,
    ...(accessToken ? { token: accessToken } : {}),
  });

  return { url: blob.url, pathname: blob.pathname };
}

export async function deleteBlobUrl(url: string | null | undefined) {
  if (!url) return;
  if (!url.includes("blob.vercel-storage.com")) return;
  try {
    const accessToken = token();
    if (accessToken) {
      await del(url, { token: accessToken });
    } else {
      await del(url);
    }
  } catch {
    // Best-effort cleanup
  }
}
