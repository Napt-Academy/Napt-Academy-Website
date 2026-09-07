import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/admin") ? params.next : "/admin";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
        <h1 className="font-display text-2xl font-semibold text-foreground">NAPT Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage site content, images, and enquiries.
        </p>
        <LoginForm nextPath={nextPath} />
      </div>
    </div>
  );
}
