# NAPT Academy

Next.js App Router site for NAPT Academy — defence, police and paramilitary coaching in Kerala.

## Scripts

```bash
npm run dev
npm run build
npm run start
```

## Vercel

This project uses Next.js. In **Project Settings → Build and Deployment**:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (or default)
- **Output Directory:** leave **empty** (do not set `dist` — that is a Vite leftover)
- **Node.js Version:** 20.x

`vercel.json` pins the framework to Next.js. Do not add `outputDirectory`.

### CMS (Neon + Blob)

1. Create a Neon Postgres database and a Blob store on Vercel.
2. Set env vars from `.env.example` (`DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET`).
3. Push schema and seed:

```bash
npm run db:push
npm run db:seed
```

4. Open `/admin/login` to edit documents, upload media, and view enquiries.

Without `DATABASE_URL`, the public site still runs using local `src/data` fallbacks.

## Environment

Copy `.env.example` to `.env.local` when you need Vercel Blob:

```
BLOB_READ_WRITE_TOKEN=
```

This token is server-only. Do not expose it with `NEXT_PUBLIC_`.

Content currently lives in `src/data`. When Blob is configured, `src/lib/content.ts` will try `napt/content/{key}.json` and fall back to local data.
