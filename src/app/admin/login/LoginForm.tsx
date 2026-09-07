"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="mt-8 space-y-4"
      action={async (fd) => {
        setPending(true);
        setError(null);
        const result = await loginAction(fd);
        if (result?.error) {
          setError(result.error);
          setPending(false);
        }
      }}
    >
      <input type="hidden" name="next" value={nextPath} />
      <label className="block text-sm">
        <span className="text-muted-foreground">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </label>
      <label className="block text-sm">
        <span className="text-muted-foreground">Password</span>
        <span className="relative mt-1 block">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-input bg-background py-2 pl-3 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </span>
      </label>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
