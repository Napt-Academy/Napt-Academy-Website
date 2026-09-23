"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
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
import type { TrainingCenter } from "@/types";

type CenterForm = {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  mapUrl: string;
};

const emptyForm: CenterForm = {
  name: "",
  address: "",
  phone: "",
  whatsapp: "",
  facebook: "",
  instagram: "",
  mapUrl: "",
};

function asCenters(value: unknown): TrainingCenter[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      id: String(row.id ?? ""),
      name: String(row.name ?? ""),
      address: String(row.address ?? ""),
      phone: String(row.phone ?? ""),
      whatsapp: String(row.whatsapp ?? ""),
      facebook: String(row.facebook ?? ""),
      instagram: String(row.instagram ?? ""),
      mapUrl: String(row.mapUrl ?? ""),
    };
  });
}

function formFromCenter(center: TrainingCenter): CenterForm {
  return {
    name: center.name,
    address: center.address,
    phone: center.phone,
    whatsapp: center.whatsapp ?? "",
    facebook: center.facebook ?? "",
    instagram: center.instagram ?? "",
    mapUrl: center.mapUrl ?? "",
  };
}

function newCenterId(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const suffix = crypto.randomUUID().slice(0, 8);
  return `${slug || "center"}-${suffix}`;
}

export function CentersTable({
  pageSlug,
  sectionSlug,
  initialCenters,
}: {
  pageSlug: string;
  sectionSlug: string;
  initialCenters: unknown;
}) {
  const router = useRouter();
  const [centers, setCenters] = useState<TrainingCenter[]>(() => asCenters(initialCenters));
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<TrainingCenter | "new" | null>(null);
  const [form, setForm] = useState<CenterForm>(emptyForm);
  const [pendingDelete, setPendingDelete] = useState<TrainingCenter | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return centers;
    return centers.filter((center) => center.name.toLowerCase().includes(q));
  }, [centers, query]);

  function openAdd() {
    setForm(emptyForm);
    setEditing("new");
  }

  function openEdit(center: TrainingCenter) {
    setForm(formFromCenter(center));
    setEditing(center);
  }

  function updateField<K extends keyof CenterForm>(key: K, value: CenterForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function persist(next: TrainingCenter[], successMessage: string) {
    setSaving(true);
    try {
      const result = await saveSectionAction(pageSlug, sectionSlug, JSON.stringify(next));
      if (result?.error) {
        toast.error(result.error);
        return false;
      }
      setCenters(next);
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
    const address = form.address.trim();
    const phone = form.phone.trim();
    if (!name || !address || !phone) {
      toast.error("Name, address, and phone are required.");
      return;
    }

    const nextCenter: TrainingCenter = {
      id: editing === "new" || !editing ? newCenterId(name) : editing.id,
      name,
      address,
      phone,
      whatsapp: form.whatsapp.trim() || undefined,
      facebook: form.facebook.trim() || undefined,
      instagram: form.instagram.trim() || undefined,
      mapUrl: form.mapUrl.trim() || undefined,
    };

    const next =
      editing === "new" || !editing
        ? [...centers, nextCenter]
        : centers.map((center) => (center.id === nextCenter.id ? nextCenter : center));

    const ok = await persist(
      next,
      editing === "new" || !editing ? "Center added successfully" : "Center updated successfully",
    );
    if (ok) setEditing(null);
  }

  async function confirmDelete() {
    if (!pendingDelete || saving) return;
    const next = centers.filter((center) => center.id !== pendingDelete.id);
    const ok = await persist(next, "Center deleted successfully");
    if (ok) setPendingDelete(null);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-48 flex-1 space-y-1.5">
          <Label htmlFor="center-search">Search name</Label>
          <Input
            id="center-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by center name"
          />
        </div>
        <Button type="button" onClick={openAdd}>
          Add center
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4 py-3">Name</TableHead>
              <TableHead className="px-4 py-3">Address</TableHead>
              <TableHead className="px-4 py-3">Phone</TableHead>
              <TableHead className="px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  {centers.length === 0 ? "No centers yet." : "No centers match this search."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((center) => (
                <TableRow key={center.id}>
                  <TableCell className="px-4 py-3 align-top font-medium">{center.name}</TableCell>
                  <TableCell className="max-w-sm px-4 py-3 align-top text-muted-foreground">
                    {center.address}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3 align-top">{center.phone}</TableCell>
                  <TableCell className="px-4 py-3 text-right align-top">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Actions for ${center.name}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => openEdit(center)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => setPendingDelete(center)}
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
          if (!open && !saving) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add center" : "Edit center"}</DialogTitle>
            <DialogDescription>
              Name, address, and phone are required. Social and map links are optional.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="center-name">Name</Label>
              <Input
                id="center-name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="center-address">Address</Label>
              <Input
                id="center-address"
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="center-phone">Phone</Label>
              <Input
                id="center-phone"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="center-whatsapp">WhatsApp number</Label>
              <Input
                id="center-whatsapp"
                value={form.whatsapp}
                placeholder="919745129069"
                onChange={(event) => updateField("whatsapp", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="center-facebook">Facebook URL</Label>
              <Input
                id="center-facebook"
                value={form.facebook}
                placeholder="https://facebook.com/..."
                onChange={(event) => updateField("facebook", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="center-instagram">Instagram URL</Label>
              <Input
                id="center-instagram"
                value={form.instagram}
                placeholder="https://instagram.com/..."
                onChange={(event) => updateField("instagram", event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="center-map">Location / map URL</Label>
              <Input
                id="center-map"
                value={form.mapUrl}
                placeholder="https://maps.google.com/..."
                onChange={(event) => updateField("mapUrl", event.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" disabled={saving} onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button type="button" disabled={saving} onClick={() => void saveForm()}>
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
            <AlertDialogTitle>Delete this center?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone. {pendingDelete?.name ?? "This center"} will be removed from the
              public training centers page and the contact form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancel</AlertDialogCancel>
            <Button type="button" variant="destructive" disabled={saving} onClick={() => void confirmDelete()}>
              {saving ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
