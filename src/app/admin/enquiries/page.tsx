import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { countEnquiries, listEnquiries } from "@/lib/db/queries";
import { hasDatabaseUrl } from "@/lib/db";

const PAGE_SIZE = 15;

function startOfDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function endOfDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day, 23, 59, 59, 999);
}

function queryHref(params: { q: string; from: string; to: string; page: number }) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.page > 1) search.set("page", String(params.page));
  const qs = search.toString();
  return qs ? `/admin/enquiries?${qs}` : "/admin/enquiries";
}

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; from?: string; to?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const from = params.from?.trim() ?? "";
  const to = params.to?.trim() ?? "";
  const requestedPage = Math.max(1, Number(params.page) || 1);

  const filters = {
    q,
    from: from ? startOfDay(from) : undefined,
    to: to ? endOfDay(to) : undefined,
  };

  const dbReady = hasDatabaseUrl();
  const total = dbReady ? await countEnquiries(filters) : 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const rows = dbReady
    ? await listEnquiries({
        ...filters,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      })
    : [];

  const hrefFor = (nextPage: number) => queryHref({ q, from, to, page: nextPage });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Enquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Submissions from the public contact form.
          </p>
        </div>
        {dbReady ? (
          <Button asChild variant="outline">
            <a href="/admin/enquiries/export">Export</a>
          </Button>
        ) : null}
      </div>

      {!dbReady ? (
        <p className="text-sm text-destructive">DATABASE_URL is required to store enquiries.</p>
      ) : null}

      <form method="get" className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="min-w-48 flex-1 space-y-1.5">
          <Label htmlFor="enquiry-search">Search name</Label>
          <Input id="enquiry-search" type="search" name="q" defaultValue={q} placeholder="Search by name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="enquiry-from">From</Label>
          <Input id="enquiry-from" type="date" name="from" defaultValue={from} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="enquiry-to">To</Label>
          <Input id="enquiry-to" type="date" name="to" defaultValue={to} />
        </div>
        <Button type="submit">Apply</Button>
      </form>

      {dbReady && total === 0 && !q && !from && !to ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No enquiries yet.
        </p>
      ) : (
        <>
          <EnquiriesTable
            rows={rows.map((row) => ({
              ...row,
              createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
            }))}
          />
          {total > 0 ? (
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * PAGE_SIZE + (rows.length ? 1 : 0)}–
                {(page - 1) * PAGE_SIZE + rows.length} of {total}
              </p>
              {pageCount > 1 ? (
                <Pagination className="mx-0 w-auto justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={page > 1 ? hrefFor(page - 1) : undefined}
                        aria-disabled={page <= 1}
                        className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                    {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink href={hrefFor(pageNumber)} isActive={pageNumber === page}>
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href={page < pageCount ? hrefFor(page + 1) : undefined}
                        aria-disabled={page >= pageCount}
                        className={page >= pageCount ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
