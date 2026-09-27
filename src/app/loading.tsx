import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-background" aria-busy="true">
      <p className="sr-only">Loading page</p>
      <header className="border-b border-border/70 bg-cream/90">
        <div className="section-x flex items-center justify-between gap-4 py-2">
          <img src="/brand/napt-logo.png" alt="" className="h-16 w-auto object-contain sm:h-20" />
          <div className="hidden items-center gap-2 lg:flex">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-4 w-20" />
            ))}
          </div>
          <Skeleton className="size-10 lg:hidden" />
        </div>
      </header>

      <main className="flex-1">
        <div className="min-h-[42vh] bg-muted sm:min-h-[52vh]" />
        <section className="section-x py-16 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-10 w-full max-w-md" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="space-y-4 rounded-2xl border border-border bg-card p-7">
                <Skeleton className="size-12 rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-forest">
        <div className="section-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-4 w-28 bg-cream/15" />
              <Skeleton className="h-3 w-full bg-cream/10" />
              <Skeleton className="h-3 w-4/5 bg-cream/10" />
              <Skeleton className="h-3 w-3/5 bg-cream/10" />
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
