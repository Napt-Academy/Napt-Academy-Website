import "server-only";
import { del, get, list, put, type PutBlobResult } from "@vercel/blob";

function token() {
  return process.env["BLOB_READ_WRITE_TOKEN"];
}

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
