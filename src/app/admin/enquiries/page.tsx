import { deleteEnquiryAction } from "@/app/admin/actions";
import { listEnquiries } from "@/lib/db/queries";
import { hasDatabaseUrl } from "@/lib/db";
import { Button } from "@/components/ui/button";

export default async function AdminEnquiriesPage() {
  const rows = hasDatabaseUrl() ? await listEnquiries() : [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl font-semibold">Enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Submissions from the public contact form.
        </p>
      </div>

      {!hasDatabaseUrl() ? (
        <p className="text-sm text-destructive">DATABASE_URL is required to store enquiries.</p>
      ) : null}

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No enquiries yet.
        </p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <article key={row.id} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">{row.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.centerName || row.centerId} · {row.subject}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(row.createdAt).toLocaleString()}
                  </p>
                </div>
                <form action={deleteEnquiryAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <Button type="submit" variant="outline" size="sm">
                    Delete
                  </Button>
                </form>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                {row.message}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
