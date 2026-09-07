import Link from "next/link";
import { Files, ImageIcon, Inbox, Settings } from "lucide-react";
import { countEnquiries, listDocuments } from "@/lib/db/queries";
import { hasDatabaseUrl } from "@/lib/db";
import { CONTENT_KEYS } from "@/lib/db/schema";

const links = [
  { href: "/admin/pages", label: "Pages", icon: Files },
  { href: "/admin/site", label: "Site settings", icon: Settings },
  { href: "/admin/media", label: "Media library", icon: ImageIcon },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
];

export default async function AdminDashboardPage() {
  const dbReady = hasDatabaseUrl();
  const [docs, enquiryCount] = await Promise.all([
    dbReady ? listDocuments() : Promise.resolve([]),
    dbReady ? countEnquiries() : Promise.resolve(0),
  ]);
  const savedKeys = new Set(docs.map((d) => d.key));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit every public page. Content is stored in Neon Postgres; images go to Vercel Blob.
        </p>
      </div>

      {!dbReady ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <p className="font-medium">DATABASE_URL is not set.</p>
          <p className="mt-1 text-destructive/80">
            Add Neon Postgres credentials, run <code>npm run db:push</code> then{" "}
            <code>npm run db:seed</code>. Until then the public site uses local{" "}
            <code>src/data</code> fallbacks.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Documents saved</p>
          <p className="mt-2 font-display text-3xl font-semibold">
            {savedKeys.size}/{CONTENT_KEYS.length}
          </p>
        </div>
        <Link
          href="/admin/enquiries"
          className="rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary"
        >
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Enquiries</p>
          <p className="mt-2 font-display text-3xl font-semibold">{enquiryCount}</p>
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 shadow-card transition-colors hover:border-primary"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
