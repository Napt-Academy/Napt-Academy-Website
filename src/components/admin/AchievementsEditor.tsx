"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { saveSectionAction } from "@/app/admin/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type AchievementItem = {
  id: string;
  name: string;
  force: string;
  description: string;
  image: { src: string; alt: string };
};

type AchievementsContent = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  items: AchievementItem[];
};

type ItemForm = {
  name: string;
  force: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const emptyForm: ItemForm = {
  name: "",
  force: "",
  description: "",
  imageSrc: "",
  imageAlt: "",
};

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asContent(value: unknown): AchievementsContent {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const items = Array.isArray(record["items"]) ? record["items"] : [];
  return {
    eyebrow: text(record["eyebrow"]),
    heading: text(record["heading"]),
    body: text(record["body"]),
    ctaLabel: text(record["ctaLabel"]),
    ctaHref: text(record["ctaHref"]),
    items: items.map((item) => {
      const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      const imageValue = row["image"];
      const image =
        imageValue && typeof imageValue === "object" ? (imageValue as Record<string, unknown>) : {};
      return {
        id: text(row["id"]),
        name: text(row["name"]),
        force: text(row["force"]),
        description: text(row["description"]),
        image: {
          src: text(image["src"]),
          alt: text(image["alt"]),
        },
      };
    }),
  };
}

function formFromItem(item: AchievementItem): ItemForm {
  return {
    name: item.name,
    force: item.force,
    description: item.description,
    imageSrc: item.image.src,
    imageAlt: item.image.alt,
  };
}

function newItemId(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const suffix = crypto.randomUUID().slice(0, 8);
  return `${slug || "student"}-${suffix}`;
}

export function AchievementsEditor({
  pageSlug,
  sectionSlug,
  initialData,
}: {
  pageSlug: string;
  sectionSlug: string;
  initialData: unknown;
}) {
  const router = useRouter();
  const [content, setContent] = useState<AchievementsContent>(() => asContent(initialData));
  const [editing, setEditing] = useState<AchievementItem | "new" | null>(null);
  const [form, setForm] = useState<ItemForm>(emptyForm);
  const [pendingDelete, setPendingDelete] = useState<AchievementItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function openAdd() {
    setForm(emptyForm);
    setEditing("new");
  }

  function openEdit(item: AchievementItem) {
    setForm(formFromItem(item));
    setEditing(item);
  }

  function updateSection<K extends keyof Omit<AchievementsContent, "items">>(
    key: K,
    value: AchievementsContent[K],
  ) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  function updateField<K extends keyof ItemForm>(key: K, value: ItemForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function persist(next: AchievementsContent, successMessage: string) {
    setSaving(true);
    try {
      const result = await saveSectionAction(pageSlug, sectionSlug, JSON.stringify(next));
      if (result?.error) {
        toast.error(result.error);
        return false;
      }
      setContent(next);
      toast.success(successMessage);
      router.refresh();
      return true;
    } catch {
      toast.error("Failed to save. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("alt", form.imageAlt || form.name);
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      const payload = (await response.json()) as { urls?: string[]; error?: string };
      const url = payload.urls?.[0];
      if (!response.ok || !url) throw new Error(payload.error ?? "Upload failed");
      setForm((current) => ({
        ...current,
        imageSrc: url,
        imageAlt: current.imageAlt || current.name || file.name,
      }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function saveSection() {
    const ok = await persist(content, "Section updated successfully");
    return ok;
  }

  async function saveForm() {
    const name = form.name.trim();
    const force = form.force.trim();
    if (!name || !force) {
      toast.error("Name and selected force are required.");
      return;
    }

    const existing = editing !== "new" && editing ? editing : null;
    const nextItem: AchievementItem = {
      id: existing?.id || newItemId(name),
      name,
      force,
      description: form.description.trim(),
      image: {
        src: form.imageSrc.trim(),
        alt: form.imageAlt.trim() || name,
      },
    };
    const items = existing
      ? content.items.map((item) => (item.id === nextItem.id ? nextItem : item))
      : [...content.items, nextItem];
    const ok = await persist(
      { ...content, items },
      existing ? "Student updated successfully" : "Student added successfully",
    );
    if (ok) setEditing(null);
  }

  async function confirmDelete() {
    if (!pendingDelete || saving) return;
    const items = content.items.filter((item) => item.id !== pendingDelete.id);
    const ok = await persist({ ...content, items }, "Student deleted successfully");
    if (ok) setPendingDelete(null);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-xl border border-border bg-card p-4">
        <div className="space-y-1.5">
          <Label htmlFor="achievements-eyebrow">Eyebrow</Label>
          <Input
            id="achievements-eyebrow"
            value={content.eyebrow}
            onChange={(event) => updateSection("eyebrow", event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="achievements-heading">Heading</Label>
          <Input
            id="achievements-heading"
            value={content.heading}
            onChange={(event) => updateSection("heading", event.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="achievements-body">Description</Label>
          <Textarea
            id="achievements-body"
            value={content.body}
            onChange={(event) => updateSection("body", event.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="achievements-cta-label">Button label</Label>
            <Input
              id="achievements-cta-label"
              value={content.ctaLabel}
              onChange={(event) => updateSection("ctaLabel", event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="achievements-cta-href">Button link</Label>
            <Input
              id="achievements-cta-href"
              value={content.ctaHref}
              onChange={(event) => updateSection("ctaHref", event.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" disabled={saving} onClick={() => void saveSection()}>
            {saving ? "Saving…" : "Save section"}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-end">
          <Button type="button" onClick={openAdd}>
            Add item
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-4 py-3">Photo</TableHead>
                <TableHead className="px-4 py-3">Name</TableHead>
                <TableHead className="px-4 py-3">Force</TableHead>
                <TableHead className="px-4 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.items.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No students yet.
                  </TableCell>
                </TableRow>
              ) : (
                content.items.map((item) => (
                  <TableRow key={item.id || item.name}>
                    <TableCell className="px-4 py-3 align-middle">
                      <div className="relative size-12 overflow-hidden rounded-lg border border-border bg-secondary">
                        {item.image.src ? (
                          <Image
                            src={item.image.src}
                            alt={item.image.alt || item.name}
                            fill
                            unoptimized={item.image.src.includes("blob.vercel-storage.com")}
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 align-middle font-medium">{item.name}</TableCell>
                    <TableCell className="px-4 py-3 align-middle text-muted-foreground">
                      {item.force}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label={`Actions for ${item.name || "student"}`}
                          >
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => openEdit(item)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={() => setPendingDelete(item)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open && !saving && !uploading) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add student" : "Edit student"}</DialogTitle>
            <DialogDescription>Name and selected force are required. Photo is optional.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="achievement-name">Name</Label>
              <Input
                id="achievement-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="achievement-force">Selected force</Label>
              <Input
                id="achievement-force"
                value={form.force}
                onChange={(event) => updateField("force", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="achievement-description">Description</Label>
              <Textarea
                id="achievement-description"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
            </div>
            <div className="space-y-3 rounded-xl border border-border bg-background/50 p-3">
              <Label>Photo</Label>
              <div className="relative aspect-[4/5] max-h-56 overflow-hidden rounded-lg border border-border bg-secondary">
                {form.imageSrc ? (
                  <Image
                    src={form.imageSrc}
                    alt={form.imageAlt || form.name || ""}
                    fill
                    unoptimized={form.imageSrc.includes("blob.vercel-storage.com")}
                    className="object-cover"
                    sizes="240px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    No image selected
                  </div>
                )}
              </div>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
                <ImagePlus className="size-4" aria-hidden />
                {uploading ? "Uploading…" : form.imageSrc ? "Replace image" : "Upload image"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(event) => {
                    void uploadImage(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </label>
              <div className="space-y-1.5">
                <Label htmlFor="achievement-image-alt">Image alt text</Label>
                <Input
                  id="achievement-image-alt"
                  value={form.imageAlt}
                  onChange={(event) => updateField("imageAlt", event.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={saving || uploading}
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
            <Button type="button" disabled={saving || uploading} onClick={() => void saveForm()}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open && !saving) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this student?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone. {pendingDelete?.name || "This student"} will be removed from the
              homepage achievements section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={saving}
              onClick={() => void confirmDelete()}
            >
              {saving ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
