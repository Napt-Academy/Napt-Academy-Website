"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { deleteEnquiriesAction, deleteEnquiryAction } from "@/app/admin/actions";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type EnquiryRow = {
  id: string;
  name: string;
  centerId: string;
  centerName: string;
  subject: string;
  message: string;
  createdAt: Date | string;
};

function formatCreated(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function preview(text: string, max = 72) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max).trim()}…`;
}

type PendingDelete =
  | { kind: "bulk"; ids: string[] }
  | { kind: "single"; id: string; name: string };

export function EnquiriesTable({ rows }: { rows: EnquiryRow[] }) {
  const router = useRouter();
  const [viewing, setViewing] = useState<EnquiryRow | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const allSelected = rows.length > 0 && rows.every((row) => selected.has(row.id));
  const someSelected = rows.some((row) => selected.has(row.id));

  async function confirmDelete() {
    if (!pendingDelete || isDeleting) return;
    const payload = pendingDelete;
    setIsDeleting(true);
    try {
      const formData = new FormData();
      if (payload.kind === "bulk") {
        for (const id of payload.ids) formData.append("ids", id);
        await deleteEnquiriesAction(formData);
        toast.success(
          payload.ids.length === 1
            ? "Enquiry deleted successfully"
            : `${payload.ids.length} enquiries deleted successfully`,
        );
      } else {
        formData.set("id", payload.id);
        await deleteEnquiryAction(formData);
        toast.success("Enquiry deleted successfully");
      }
      setPendingDelete(null);
      setSelected(new Set());
      router.refresh();
    } catch {
      toast.error("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(rows.map((row) => row.id)) : new Set());
  }

  function toggleOne(id: string, checked: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {selected.size > 0 ? (
        <div className="flex items-center justify-end">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setPendingDelete({ kind: "bulk", ids: Array.from(selected) })}
          >
            Delete selected ({selected.size})
          </Button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 px-4 py-3">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={(value) => toggleAll(value === true)}
                  aria-label="Select all enquiries on this page"
                  disabled={rows.length === 0}
                />
              </TableHead>
              <TableHead className="px-4 py-3">Name</TableHead>
              <TableHead className="px-4 py-3">Subject</TableHead>
              <TableHead className="px-4 py-3">Message</TableHead>
              <TableHead className="px-4 py-3">Created</TableHead>
              <TableHead className="px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No enquiries match these filters.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="px-4 py-3 align-top">
                    <Checkbox
                      checked={selected.has(row.id)}
                      onCheckedChange={(value) => toggleOne(row.id, value === true)}
                      aria-label={`Select enquiry from ${row.name}`}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top">
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {row.centerName || row.centerId}
                    </p>
                  </TableCell>
                  <TableCell className="px-4 py-3 align-top text-foreground/80">{row.subject}</TableCell>
                  <TableCell className="max-w-xs px-4 py-3 align-top text-muted-foreground">
                    {preview(row.message)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap px-4 py-3 align-top text-foreground/80">
                    {formatCreated(row.createdAt)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right align-top">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Actions for ${row.name}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setViewing(row)}>View</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => setPendingDelete({ kind: "single", id: row.id, name: row.name })}
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

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewing?.name}</DialogTitle>
            <DialogDescription>
              {viewing?.centerName || viewing?.centerId} · {viewing?.subject}
              {viewing ? ` · ${formatCreated(viewing.createdAt)}` : null}
            </DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
            {viewing?.message}
          </p>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => {
          if (!open && !isDeleting) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDelete?.kind === "bulk"
                ? `Delete ${pendingDelete.ids.length} selected ${pendingDelete.ids.length === 1 ? "enquiry" : "enquiries"}?`
                : "Delete this enquiry?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete?.kind === "bulk"
                ? "This cannot be undone. The selected enquiries will be removed permanently."
                : `This cannot be undone. The enquiry from ${pendingDelete?.name ?? "this person"} will be removed permanently.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button type="button" variant="destructive" disabled={isDeleting} onClick={() => void confirmDelete()}>
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
