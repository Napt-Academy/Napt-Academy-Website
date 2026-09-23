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
import type { TeamMember } from "@/types";

type MemberForm = {
  name: string;
  designation: string;
  imageSrc: string;
  imageAlt: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
};

const emptyForm: MemberForm = {
  name: "",
  designation: "",
  imageSrc: "",
  imageAlt: "",
  facebook: "",
  instagram: "",
  whatsapp: "",
};

function optionalText(value: unknown) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || undefined;
}

function asMembers(value: unknown): TeamMember[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const imageValue = row["image"];
    const image =
      imageValue && typeof imageValue === "object"
        ? (imageValue as Record<string, unknown>)
        : {};
    const mobileSrc = image["mobileSrc"];
    const facebook = optionalText(row["facebook"]);
    const instagram = optionalText(row["instagram"]);
    const whatsapp = optionalText(row["whatsapp"]);
    return {
      id: String(row["id"] ?? ""),
      name: String(row["name"] ?? ""),
      designation: String(row["designation"] ?? ""),
      image: {
        src: String(image["src"] ?? ""),
        alt: String(image["alt"] ?? ""),
        ...(typeof mobileSrc === "string" && mobileSrc ? { mobileSrc } : {}),
      },
      ...(facebook ? { facebook } : {}),
      ...(instagram ? { instagram } : {}),
      ...(whatsapp ? { whatsapp } : {}),
    };
  });
}

function formFromMember(member: TeamMember): MemberForm {
  return {
    name: member.name,
    designation: member.designation,
    imageSrc: member.image?.src ?? "",
    imageAlt: member.image?.alt ?? "",
    facebook: member.facebook ?? "",
    instagram: member.instagram ?? "",
    whatsapp: member.whatsapp ?? "",
  };
}

function newMemberId(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const suffix = crypto.randomUUID().slice(0, 8);
  return `${slug || "member"}-${suffix}`;
}

export function TeamMembersTable({
  pageSlug,
  sectionSlug,
  initialMembers,
}: {
  pageSlug: string;
  sectionSlug: string;
  initialMembers: unknown;
}) {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>(() => asMembers(initialMembers));
  const [editing, setEditing] = useState<TeamMember | "new" | null>(null);
  const [form, setForm] = useState<MemberForm>(emptyForm);
  const [pendingDelete, setPendingDelete] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function openAdd() {
    setForm(emptyForm);
    setEditing("new");
  }

  function openEdit(member: TeamMember) {
    setForm(formFromMember(member));
    setEditing(member);
  }

  function updateField<K extends keyof MemberForm>(key: K, value: MemberForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
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

  async function persist(next: TeamMember[], successMessage: string) {
    setSaving(true);
    try {
      const result = await saveSectionAction(pageSlug, sectionSlug, JSON.stringify(next));
      if (result?.error) {
        toast.error(result.error);
        return false;
      }
      setMembers(next);
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

  async function saveForm() {
    const name = form.name.trim();
    const designation = form.designation.trim();
    const imageSrc = form.imageSrc.trim();
    if (!name || !designation || !imageSrc) {
      toast.error("Name, designation, and image are required.");
      return;
    }

    const existing = editing !== "new" && editing ? editing : null;
    const facebook = form.facebook.trim();
    const instagram = form.instagram.trim();
    const whatsapp = form.whatsapp.trim();
    const nextMember: TeamMember = {
      id: existing?.id ?? newMemberId(name),
      name,
      designation,
      image: {
        src: imageSrc,
        alt: form.imageAlt.trim() || name,
        ...(existing?.image.mobileSrc ? { mobileSrc: existing.image.mobileSrc } : {}),
      },
      ...(facebook ? { facebook } : {}),
      ...(instagram ? { instagram } : {}),
      ...(whatsapp ? { whatsapp } : {}),
    };

    const next = existing
      ? members.map((member) => (member.id === nextMember.id ? nextMember : member))
      : [...members, nextMember];

    const ok = await persist(
      next,
      existing ? "Member updated successfully" : "Member added successfully",
    );
    if (ok) setEditing(null);
  }

  async function confirmDelete() {
    if (!pendingDelete || saving) return;
    const next = members.filter((member) => member.id !== pendingDelete.id);
    const ok = await persist(next, "Member deleted successfully");
    if (ok) setPendingDelete(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button type="button" onClick={openAdd}>
          Add member
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4 py-3">Photo</TableHead>
              <TableHead className="px-4 py-3">Name</TableHead>
              <TableHead className="px-4 py-3">Designation</TableHead>
              <TableHead className="px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No team members yet.
                </TableCell>
              </TableRow>
            ) : (
              members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="px-4 py-3 align-middle">
                    <div className="relative size-12 overflow-hidden rounded-lg border border-border bg-secondary">
                      {member.image.src ? (
                        <Image
                          src={member.image.src}
                          alt={member.image.alt || member.name}
                          fill
                          unoptimized={member.image.src.includes("blob.vercel-storage.com")}
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 align-middle font-medium">{member.name}</TableCell>
                  <TableCell className="px-4 py-3 align-middle text-muted-foreground">
                    {member.designation}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Actions for ${member.name}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openEdit(member)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => setPendingDelete(member)}
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

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open && !saving && !uploading) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add member" : "Edit member"}</DialogTitle>
            <DialogDescription>
              Name, designation, and photo are required. Social links are optional.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="member-name">Name</Label>
              <Input
                id="member-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="member-designation">Designation</Label>
              <Input
                id="member-designation"
                value={form.designation}
                onChange={(event) => updateField("designation", event.target.value)}
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
                <Label htmlFor="member-image-src">Image URL</Label>
                <Input
                  id="member-image-src"
                  value={form.imageSrc}
                  onChange={(event) => updateField("imageSrc", event.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="member-image-alt">Image alt text</Label>
                <Input
                  id="member-image-alt"
                  value={form.imageAlt}
                  onChange={(event) => updateField("imageAlt", event.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="member-facebook">Facebook URL</Label>
              <Input
                id="member-facebook"
                type="url"
                placeholder="https://facebook.com/..."
                value={form.facebook}
                onChange={(event) => updateField("facebook", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="member-instagram">Instagram URL</Label>
              <Input
                id="member-instagram"
                type="url"
                placeholder="https://instagram.com/..."
                value={form.instagram}
                onChange={(event) => updateField("instagram", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="member-whatsapp">WhatsApp URL or number</Label>
              <Input
                id="member-whatsapp"
                placeholder="https://wa.me/... or 919745129069"
                value={form.whatsapp}
                onChange={(event) => updateField("whatsapp", event.target.value)}
              />
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
            <AlertDialogTitle>Delete this member?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone. {pendingDelete?.name ?? "This member"} will be removed from the
              About page team section.
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
