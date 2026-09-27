"use client";

import { useState, type ReactNode } from "react";
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { saveDocumentAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteContent } from "@/lib/content";

type NavItem = { label: string; to: string };

const fallbackLogo = "/brand/napt-logo.png";

type SiteFormState = {
  name: string;
  logo: string;
  footerLogo: string;
  tagline: string;
  description: string;
  phone: string;
  supportPhone: string;
  email: string;
  headOffice: string;
  address: string;
  social: {
    facebook: string;
    whatsapp: string;
    instagram: string;
  };
  nav: NavItem[];
  credit: string;
};

function toFormState(data: SiteContent | null | undefined): SiteFormState {
  return {
    name: data?.name ?? "",
    logo: data?.logo ?? "",
    footerLogo: data?.footerLogo ?? "",
    tagline: data?.tagline ?? "",
    description: data?.description ?? "",
    phone: data?.phone ?? "",
    supportPhone: data?.supportPhone ?? "",
    email: data?.email ?? "",
    headOffice: data?.headOffice ?? "",
    address: data?.address ?? "",
    social: {
      facebook: data?.social?.facebook ?? "",
      whatsapp: data?.social?.whatsapp ?? "",
      instagram: data?.social?.instagram ?? "",
    },
    nav: Array.isArray(data?.nav)
      ? data.nav.map((item) => ({ label: item?.label ?? "", to: item?.to ?? "" }))
      : [],
    credit: data?.credit ?? "",
  };
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <legend className="px-1 text-sm font-semibold text-foreground">{title}</legend>
      {children}
    </fieldset>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

export function SiteSettingsEditor({
  initialData,
  fallback,
}: {
  initialData: SiteContent | null | undefined;
  fallback: SiteContent;
}) {
  const [form, setForm] = useState(() => toFormState(initialData));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"logo" | "footerLogo" | null>(null);

  function update<K extends keyof SiteFormState>(key: K, value: SiteFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setDirty(true);
  }

  function updateSocial(key: keyof SiteFormState["social"], value: string) {
    setForm((current) => ({
      ...current,
      social: { ...current.social, [key]: value },
    }));
    setDirty(true);
  }

  function updateNav(index: number, key: keyof NavItem, value: string) {
    setForm((current) => ({
      ...current,
      nav: current.nav.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
    setDirty(true);
  }

  function addNav() {
    setForm((current) => ({
      ...current,
      nav: [...current.nav, { label: "", to: "/" }],
    }));
    setDirty(true);
  }

  function removeNav(index: number) {
    setForm((current) => ({
      ...current,
      nav: current.nav.filter((_, i) => i !== index),
    }));
    setDirty(true);
  }

  async function uploadLogo(field: "logo" | "footerLogo", file: File | undefined) {
    if (!file) return;
    setUploading(field);
    try {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("alt", field === "footerLogo" ? "Footer logo" : form.name || "Header logo");
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      const payload = (await response.json()) as { urls?: string[]; error?: string };
      const url = payload.urls?.[0];
      if (!response.ok || !url) throw new Error(payload.error ?? "Upload failed");
      update(field, url);
      toast.success(field === "footerLogo" ? "Footer logo uploaded" : "Logo uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function onSave() {
    if (!form.name.trim()) {
      toast.error("Site name is required.");
      return;
    }

    setSaving(true);
    try {
      const logo = form.logo.trim();
      const footerLogo = form.footerLogo.trim();
      const next: SiteContent = {
        name: form.name.trim(),
        ...(logo ? { logo } : {}),
        ...(footerLogo ? { footerLogo } : {}),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        phone: form.phone.trim(),
        supportPhone: form.supportPhone.trim(),
        email: form.email.trim(),
        headOffice: form.headOffice.trim(),
        address: form.address.trim(),
        social: {
          facebook: form.social.facebook.trim(),
          whatsapp: form.social.whatsapp.trim(),
          instagram: form.social.instagram.trim(),
        },
        nav: form.nav
          .map((item) => ({ label: item.label.trim(), to: item.to.trim() }))
          .filter((item) => item.label && item.to),
        credit: form.credit.trim(),
        footerBrand: initialData?.footerBrand ?? fallback.footerBrand,
        footerQuickLinks: initialData?.footerQuickLinks ?? fallback.footerQuickLinks,
        footerReachUs: initialData?.footerReachUs ?? fallback.footerReachUs,
        footerHeadOffice: initialData?.footerHeadOffice ?? fallback.footerHeadOffice,
        footerLegal: initialData?.footerLegal ?? fallback.footerLegal,
      };

      const result = await saveDocumentAction("site", JSON.stringify(next));
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      setDirty(false);
      toast.success("Site settings saved successfully");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Site settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Name, phones, email, address, social links, navigation, and footer credit.
        </p>
      </div>

      <FieldGroup title="Brand">
        <div className="space-y-3">
          <Label>Header logo</Label>
          <img
            src={form.logo.trim() || fallbackLogo}
            alt=""
            className="h-16 w-auto object-contain"
          />
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
              <ImagePlus className="size-4" aria-hidden />
              {uploading === "logo" ? "Uploading…" : form.logo.trim() ? "Replace logo" : "Upload logo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                disabled={uploading !== null}
                onChange={(event) => {
                  void uploadLogo("logo", event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>
            {form.logo.trim() ? (
              <Button type="button" variant="outline" onClick={() => update("logo", "")} disabled={uploading !== null}>
                Use fallback logo
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            Shown in the site header. Clearing an upload restores the NAPT logo.
          </p>
        </div>
        <div className="space-y-3">
          <Label>Footer logo</Label>
          <img
            src={form.footerLogo.trim() || form.logo.trim() || fallbackLogo}
            alt=""
            className="h-16 w-auto object-contain"
          />
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-secondary">
              <ImagePlus className="size-4" aria-hidden />
              {uploading === "footerLogo" ? "Uploading…" : form.footerLogo.trim() ? "Replace logo" : "Upload logo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                disabled={uploading !== null}
                onChange={(event) => {
                  void uploadLogo("footerLogo", event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>
            {form.footerLogo.trim() ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => update("footerLogo", "")}
                disabled={uploading !== null}
              >
                Use header logo
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            Shown in the footer. Leave this empty to use the header logo.
          </p>
        </div>
        <TextField id="site-name" label="Name" value={form.name} onChange={(v) => update("name", v)} />
        <TextField
          id="site-tagline"
          label="Tagline"
          value={form.tagline}
          onChange={(v) => update("tagline", v)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="site-description">Description</Label>
          <Textarea
            id="site-description"
            rows={4}
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </div>
      </FieldGroup>

      <FieldGroup title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="site-phone" label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
          <TextField
            id="site-support-phone"
            label="Support phone"
            value={form.supportPhone}
            onChange={(v) => update("supportPhone", v)}
          />
        </div>
        <TextField
          id="site-email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
        />
        <TextField
          id="site-head-office"
          label="Head office"
          value={form.headOffice}
          onChange={(v) => update("headOffice", v)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="site-address">Address</Label>
          <Textarea
            id="site-address"
            rows={3}
            value={form.address}
            onChange={(event) => update("address", event.target.value)}
          />
        </div>
      </FieldGroup>

      <FieldGroup title="Social links">
        <TextField
          id="site-facebook"
          label="Facebook URL"
          type="url"
          value={form.social.facebook}
          onChange={(v) => updateSocial("facebook", v)}
        />
        <TextField
          id="site-whatsapp"
          label="WhatsApp URL"
          type="url"
          value={form.social.whatsapp}
          onChange={(v) => updateSocial("whatsapp", v)}
        />
        <TextField
          id="site-instagram"
          label="Instagram URL"
          type="url"
          value={form.social.instagram}
          onChange={(v) => updateSocial("instagram", v)}
        />
      </FieldGroup>

      <FieldGroup title="Navigation">
        <div className="space-y-3">
          {form.nav.length === 0 ? (
            <p className="text-sm text-muted-foreground">No navigation links yet.</p>
          ) : (
            form.nav.map((item, index) => (
              <div
                key={`nav-${index}`}
                className="grid gap-3 rounded-lg border border-border bg-background/50 p-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <div className="space-y-1.5">
                  <Label htmlFor={`nav-label-${index}`}>Label</Label>
                  <Input
                    id={`nav-label-${index}`}
                    value={item.label}
                    onChange={(event) => updateNav(index, "label", event.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`nav-to-${index}`}>Path</Label>
                  <Input
                    id={`nav-to-${index}`}
                    value={item.to}
                    onChange={(event) => updateNav(index, "to", event.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    aria-label={`Remove ${item.label || "link"}`}
                    onClick={() => removeNav(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addNav}>
          <Plus className="size-4" />
          Add link
        </Button>
      </FieldGroup>

      <FieldGroup title="Credit">
        <TextField
          id="site-credit"
          label="Footer credit"
          value={form.credit}
          onChange={(v) => update("credit", v)}
        />
      </FieldGroup>

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur">
        <Button type="button" onClick={() => void onSave()} disabled={saving || !dirty}>
          <Save className="size-4" aria-hidden />
          {saving ? "Saving…" : dirty ? "Save settings" : "Saved"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Footer columns are edited under the Footer tab.
        </p>
      </div>
    </div>
  );
}
