"use client";

import { useState } from "react";
import { saveDocumentAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function DocumentEditor({
  docKey,
  title,
  description,
  initialData,
}: {
  docKey: string;
  title: string;
  description: string;
  initialData: unknown;
}) {
  const [text, setText] = useState(() => JSON.stringify(initialData, null, 2));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function onSave() {
    setStatus("saving");
    setMessage("");
    const result = await saveDocumentAction(docKey, text);
    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
      return;
    }
    setStatus("saved");
    setMessage("Saved. Public pages will refresh on next load.");
  }

  async function onUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setMessage("");
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("images", f));
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const payload = (await res.json()) as { urls?: string[]; error?: string };
      if (!res.ok || !payload.urls?.length) {
        setStatus("error");
        setMessage(payload.error ?? "Upload failed");
        return;
      }
      const urlsBlock = payload.urls.map((u) => `"src": "${u}"`).join("\n");
      setMessage(`Uploaded. Paste into an image src field:\n${payload.urls.join("\n")}`);
      setStatus("saved");
      void urlsBlock;
    } catch {
      setStatus("error");
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-card">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-secondary">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="hidden"
              onChange={(e) => onUpload(e.target.files)}
              disabled={uploading}
            />
            {uploading ? "Uploading…" : "Upload image(s) to Blob"}
          </label>
          <p className="text-xs text-muted-foreground">
            After upload, copy the URL into the matching <code>src</code> field below.
          </p>
        </div>

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setStatus("idle");
          }}
          spellCheck={false}
          className="min-h-[32rem] w-full rounded-lg border border-input bg-background p-3 font-mono text-xs leading-relaxed shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={onSave} disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save document"}
          </Button>
          {message ? (
            <p
              className={
                status === "error" ? "text-sm text-destructive" : "whitespace-pre-wrap text-sm text-muted-foreground"
              }
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
