"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { saveSectionAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

function labelFor(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isImageAsset(value: JsonValue): value is JsonObject & { src: string; alt: string } {
  return isObject(value) && typeof value["src"] === "string" && typeof value["alt"] === "string";
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}`;
}

function blankLike(value: JsonValue, key = ""): JsonValue {
  if (key === "id") return newId();
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (value === null) return "";
  if (Array.isArray(value)) return [];
  return Object.fromEntries(
    Object.entries(value).map(([childKey, childValue]) => [
      childKey,
      blankLike(childValue, childKey),
    ]),
  );
}

function invalidImagePath(value: JsonValue, path = "Section"): string | null {
  if (isImageAsset(value) && !value.src.trim()) return `${path}: desktop image is required`;
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const invalid = invalidImagePath(value[index]!, `${path} ${index + 1}`);
      if (invalid) return invalid;
    }
  } else if (isObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      const invalid = invalidImagePath(child, `${path} / ${labelFor(key)}`);
      if (invalid) return invalid;
    }
  }
  return null;
}

export function SectionEditor({
  pageSlug,
  sectionSlug,
  initialData,
}: {
  pageSlug: string;
  sectionSlug: string;
  initialData: unknown;
}) {
  const [value, setValue] = useState(initialData as JsonValue);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
    };
    const confirmNavigation = (event: MouseEvent) => {
      if (!dirty) return;
      const link = (event.target as Element | null)?.closest("a[href]");
      if (!link) return;
      if (!window.confirm("You have unsaved changes. Leave without saving?")) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", warn);
    document.addEventListener("click", confirmNavigation, true);
    return () => {
      window.removeEventListener("beforeunload", warn);
      document.removeEventListener("click", confirmNavigation, true);
    };
  }, [dirty]);

  function update(next: JsonValue) {
    setValue(next);
    setDirty(true);
    setStatus("idle");
    setMessage("");
  }

  async function save() {
    const invalid = invalidImagePath(value);
    if (invalid) {
      setStatus("error");
      setMessage(invalid);
      return;
    }
    setStatus("saving");
    setMessage("");
    const result = await saveSectionAction(pageSlug, sectionSlug, JSON.stringify(value));
    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
      return;
    }
    setDirty(false);
    setStatus("saved");
    setMessage("Section saved and the public page has been refreshed.");
  }

  return (
    <div className="space-y-5">
      <StructuredField name="" value={value} onChange={update} depth={0} />
      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur">
        <Button type="button" onClick={save} disabled={status === "saving" || !dirty}>
          <Save className="size-4" aria-hidden />
          {status === "saving" ? "Saving…" : dirty ? "Save section" : "Saved"}
        </Button>
        {message ? (
          <p
            className={
              status === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"
            }
            role={status === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function StructuredField({
  name,
  value,
  onChange,
  depth,
}: {
  name: string;
  value: JsonValue;
  onChange: (value: JsonValue) => void;
  depth: number;
}) {
  if (isImageAsset(value)) {
    return <ImageAssetField name={name || "Image"} value={value} onChange={onChange} />;
  }

  if (name === "id" && typeof value === "string") {
    return null;
  }

  if (Array.isArray(value)) {
    return <ArrayField name={name} value={value} onChange={onChange} depth={depth} />;
  }

  if (isObject(value)) {
    const content = (
      <div className="space-y-4">
        {Object.entries(value).map(([key, child]) => (
          <StructuredField
            key={key}
            name={key}
            value={child}
            depth={depth + 1}
            onChange={(next) => onChange({ ...value, [key]: next })}
          />
        ))}
      </div>
    );
    if (depth === 0 || !name) return content;
    return (
      <fieldset className="rounded-xl border border-border bg-background/50 p-4">
        <legend className="px-2 text-sm font-semibold">{labelFor(name)}</legend>
        {content}
      </fieldset>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-3 py-3 text-sm">
        <span className="font-medium">{labelFor(name)}</span>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-primary"
        />
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <FieldLabel name={name}>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
      </FieldLabel>
    );
  }

  const text = value === null ? "" : String(value);
  const multiline =
    text.length > 80 || /body|description|content|address|answer|paragraph/i.test(name);
  return (
    <FieldLabel name={name}>
      {multiline ? (
        <textarea
          value={text}
          rows={Math.max(3, Math.min(8, Math.ceil(text.length / 90)))}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed"
        />
      ) : (
        <input
          type={/email/i.test(name) ? "email" : /url|href|link|src/i.test(name) ? "url" : "text"}
          value={text}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
        />
      )}
    </FieldLabel>
  );
}

function FieldLabel({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-foreground">{labelFor(name)}</span>
      {children}
    </label>
  );
}

function ArrayField({
  name,
  value,
  onChange,
  depth,
}: {
  name: string;
  value: JsonValue[];
  onChange: (value: JsonValue) => void;
  depth: number;
}) {
  const [template] = useState<JsonValue>(() => value[0] ?? "");
  return (
    <fieldset className="rounded-xl border border-border bg-card p-4 shadow-card">
      <legend className="px-2 text-sm font-semibold">{labelFor(name)}</legend>
      <div className="space-y-4">
        {value.map((item, index) => (
          <div
            key={isObject(item) && typeof item["id"] === "string" ? item["id"] : index}
            className="rounded-xl border border-border bg-background p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {labelFor(name)} {index + 1}
              </p>
              <div className="flex gap-1">
                <IconButton
                  label="Move up"
                  disabled={index === 0}
                  onClick={() => {
                    const next = [...value];
                    [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
                    onChange(next);
                  }}
                >
                  <ArrowUp className="size-4" />
                </IconButton>
                <IconButton
                  label="Move down"
                  disabled={index === value.length - 1}
                  onClick={() => {
                    const next = [...value];
                    [next[index], next[index + 1]] = [next[index + 1]!, next[index]!];
                    onChange(next);
                  }}
                >
                  <ArrowDown className="size-4" />
                </IconButton>
                <IconButton
                  label="Remove"
                  onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                >
                  <Trash2 className="size-4" />
                </IconButton>
              </div>
            </div>
            <StructuredField
              name=""
              value={item}
              depth={depth + 1}
              onChange={(nextItem) =>
                onChange(
                  value.map((existing, itemIndex) => (itemIndex === index ? nextItem : existing)),
                )
              }
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange([...value, blankLike(template)])}
        >
          <Plus className="size-4" aria-hidden />
          Add {labelFor(name).replace(/s$/, "")}
        </Button>
      </div>
    </fieldset>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function ImageAssetField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: JsonObject & { src: string; alt: string };
  onChange: (value: JsonValue) => void;
}) {
  const [uploading, setUploading] = useState<"src" | "mobileSrc" | null>(null);
  const [error, setError] = useState("");

  async function upload(file: File | undefined, target: "src" | "mobileSrc") {
    if (!file) return;
    setUploading(target);
    setError("");
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("alt", value.alt);
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      const payload = (await response.json()) as { urls?: string[]; error?: string };
      const url = payload.urls?.[0];
      if (!response.ok || !url) throw new Error(payload.error ?? "Upload failed");
      onChange({ ...value, [target]: url });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  return (
    <fieldset className="rounded-xl border border-border bg-card p-4 shadow-card">
      <legend className="px-2 text-sm font-semibold">{labelFor(name)}</legend>
      <div className="grid gap-5 lg:grid-cols-2">
        <ImageSlot
          label="Desktop / default image"
          src={value.src}
          uploading={uploading === "src"}
          required
          onUrl={(src) => onChange({ ...value, src })}
          onFile={(file) => upload(file, "src")}
        />
        <ImageSlot
          label="Mobile image (optional)"
          src={typeof value["mobileSrc"] === "string" ? value["mobileSrc"] : ""}
          uploading={uploading === "mobileSrc"}
          onUrl={(mobileSrc) => onChange({ ...value, mobileSrc })}
          onFile={(file) => upload(file, "mobileSrc")}
        />
      </div>
      <div className="mt-4">
        <FieldLabel name="Alternative text">
          <input
            type="text"
            value={value.alt}
            onChange={(event) => onChange({ ...value, alt: event.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          />
        </FieldLabel>
      </div>
      {error ? (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function ImageSlot({
  label,
  src,
  uploading,
  required,
  onUrl,
  onFile,
}: {
  label: string;
  src: string;
  uploading: boolean;
  required?: boolean;
  onUrl: (url: string) => void;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary">
        {src ? (
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No image selected
          </div>
        )}
      </div>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
        <ImagePlus className="size-4" aria-hidden />
        {uploading ? "Uploading…" : src ? "Replace image" : "Upload image"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          disabled={uploading}
          onChange={(event) => {
            onFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      <input
        type="url"
        value={src}
        required={required}
        aria-label={`${label} URL`}
        placeholder="Or paste an image URL"
        onChange={(event) => onUrl(event.target.value)}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs"
      />
    </div>
  );
}
