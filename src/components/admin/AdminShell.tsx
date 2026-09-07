"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FileText,
  Files,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { ADMIN_PAGES } from "@/lib/admin-pages";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site", label: "Site", icon: Settings },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox },
];

export function AdminShell({
  adminEmail,
  children,
}: {
  adminEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Layouts persist across client-side redirects in the App Router. Avoid
  // carrying the authenticated navigation shell onto the login page after
  // signing out.
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-cream text-foreground">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-0 lg:gap-6 lg:px-6 lg:py-6">
        <aside className="hidden w-60 shrink-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-card lg:flex">
          <div className="mb-6 px-2">
            <p className="font-display text-lg font-semibold text-primary">NAPT Admin</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">{adminEmail}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {primaryNav.slice(0, 1).map((item) => {
              const active =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
            <details className="group" open={pathname.startsWith("/admin/pages")}>
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/admin/pages")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/75 hover:bg-secondary hover:text-foreground",
                )}
              >
                <Files className="size-4" aria-hidden />
                <span className="flex-1">Pages</span>
                <ChevronDown
                  className="size-4 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="mt-1 space-y-1 pl-6">
                {ADMIN_PAGES.map((page) => {
                  const href = `/admin/pages/${page.slug}`;
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={page.slug}
                      href={href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-secondary font-medium text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      {page.title.replace(" page", "")}
                    </Link>
                  );
                })}
              </div>
            </details>
            {primaryNav.slice(1).map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form action={logoutAction} className="mt-4 border-t border-border pt-4">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden />
              Sign out
            </button>
          </form>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 px-3 text-xs text-primary hover:underline"
          >
            View site →
          </a>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
            <p className="font-display font-semibold text-primary">NAPT Admin</p>
            <form action={logoutAction}>
              <button type="submit" className="text-sm text-muted-foreground">
                Sign out
              </button>
            </form>
          </header>
          <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-2 py-2 lg:hidden">
            {[
              primaryNav[0]!,
              { href: "/admin/pages", label: "Pages", icon: FileText },
              ...primaryNav.slice(1),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium",
                  (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href))
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {pathname.startsWith("/admin/pages") ? (
            <nav className="flex gap-1 overflow-x-auto border-b border-border bg-card px-2 py-2 lg:hidden">
              {ADMIN_PAGES.map((page) => {
                const href = `/admin/pages/${page.slug}`;
                return (
                  <Link
                    key={page.slug}
                    href={href}
                    className={cn(
                      "shrink-0 rounded-md px-3 py-1.5 text-xs",
                      pathname === href || pathname.startsWith(`${href}/`)
                        ? "bg-secondary font-medium text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {page.title.replace(" page", "")}
                  </Link>
                );
              })}
            </nav>
          ) : null}
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
