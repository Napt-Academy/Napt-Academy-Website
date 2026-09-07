"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteMediaAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

type MediaRow = {
  id: string;
  url: string;
  alt: string;
  pathname: string;
  createdAt: Date | string;
};

export function MediaLibrary({ initialItems }: { initialItems: MediaRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setMessage("");
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("images", f));
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const payload = (await res.json()) as { urls?: string[]; error?: string };
      if (!res.ok) {
        setMessage(payload.error ?? "Upload failed");
        return;
      }
      setMessage(
        `Uploaded ${payload.urls?.length ?? 0} image(s). Refresh if new rows do not appear.`,
      );
      window.location.reload();
    } catch {
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-semibold">Media library</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload images to Vercel Blob. Copy URLs into page document image <code>src</code> fields.
        </p>
      </div>

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => onUpload(e.target.files)}
        />
        {uploading ? "Uploading…" : "Upload images"}
      </label>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No media yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
            >
              <div className="relative aspect-video bg-muted">
                <Image
                  src={item.url}
                  alt={item.alt || ""}
                  fill
                  unoptimized={item.url.includes("blob.vercel-storage.com")}
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div className="space-y-2 p-3">
                <input
                  readOnly
                  value={item.url}
                  className="w-full truncate rounded border border-input bg-background px-2 py-1 text-[11px]"
                  onFocus={(e) => e.target.select()}
                />
                <form
                  action={async (fd) => {
                    await deleteMediaAction(fd);
                    setItems((prev) => prev.filter((row) => row.id !== item.id));
                  }}
                >
                  <input type="hidden" name="id" value={item.id} />
                  <Button type="submit" variant="outline" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
