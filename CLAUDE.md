# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

B2B e-commerce/marketing website for Bienek, a Chilean industrial cleaning supplies company. Built with Next.js 16 (App Router), Supabase (PostgreSQL + Auth + Storage), and deployed as a static export on Vercel.

## Commands

All commands run from `src/` (not the repo root):

```bash
cd src
npm run dev      # Development server
npm run build    # Production build (static export)
npm run lint     # ESLint
```

There are no tests. The build outputs to `src/out/` via static export (`output: 'export'`).

## Architecture

### Key Constraints

- **Static export** (`next.config.ts`: `output: 'export'`, `trailingSlash: true`) — no server-side rendering, no Next.js API routes, no dynamic routes with server-side data fetching.
- **Supabase free tier**: 1 GB storage (bottleneck for product images), 500 MB DB, 5 GB bandwidth. Images must be WebP, <120 KB per product image.
- **Email via PHP bridge** — email is NOT handled by Next.js or Supabase. Forms POST to `/api-bienek/email.php` (a cPanel-hosted PHPMailer script). Two email endpoints: `contacto.web@bienek.cl` and `postulaciones.web@bienek.cl`.
- **No Next.js API routes** exist in `src/app/api/` — the PHP bridge handles all server-side logic.

### Data Flow (Contact/Job Forms)

1. User fills form → `useState` controlled inputs
2. Client-side validation (`src/utils/validation.ts`: email regex, RUT checksum)
3. Cloudflare Turnstile CAPTCHA widget (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`)
4. `FormData` POST to `NEXT_PUBLIC_PHP_BRIDGE_URL` (`/api-bienek/email.php`)
5. PHP verifies Turnstile token with `TURNSTILE_SECRET_KEY`, sends email

### Routing

App Router file-based routing. All public pages are under `src/app/(public)/` layout group (shared Header/Footer):

| URL | File |
|-----|------|
| `/` | `app/(public)/page.tsx` |
| `/contacto/` | `app/(public)/contacto/page.tsx` |
| `/empresa/` | `app/(public)/empresa/page.tsx` |
| `/trabaja-con-nosotros/` | `app/(public)/trabaja-con-nosotros/page.tsx` |

### State Management

React Context only — no Redux or Zustand.

- **LanguageContext** (`src/context/LanguageContext.tsx`): Global ES/EN language toggle, persists in `localStorage` as `bienek_language`. All UI strings come from `src/data/translations.ts`.
- All other state is local `useState` within components.

### Supabase Clients

Two clients — never mix them up:

1. **Public browser client** — initialized inline in components using `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Subject to RLS policies.
2. **Admin server client** (`src/lib/supabaseAdmin.ts`) — uses `SUPABASE_SERVICE_ROLE_KEY`. **Server-side only, never import in `use client` components.**

RLS policies: tables are public-read, write/delete restricted to `service_role`.

### Database Schema

Key tables (see `supabase/schema.sql` for full schema):

- `products` — product catalog (up to ~5,000 items)
- `sectors` — 12 industrial solution categories
- `families` — 9 product families (papeles, jabones, desengrasantes, etc.)
- `product_sectors` / `product_families` — many-to-many junction tables
- `leads` — contact form submissions
- `applications` — job application submissions
- `orders` / `order_items` — quotation system
- `profiles` — user accounts

### i18n

Custom implementation — NOT next-i18next. Translations live in `src/data/translations.ts` as a static nested object. Accessed via `useLanguage()` hook which returns `{ t, language, setLanguage }`.

### Styling

Tailwind CSS v4. Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional classes. No CSS Modules.

### Validation

`src/utils/validation.ts` has Chilean-specific validators:

- **RUT**: Módulo 11 checksum (Chilean national ID). Use `validateRUT()` and `formatRUT()`.
- **Email**: Custom strict regex — do not replace with a simpler one without testing Chilean email patterns.

### Product Filtering

`src/hooks/useSolutionsFilters.ts` — filter logic using `Set<string>` for O(1) lookups. Reads/writes URL search params (`?family=papeles`).

## Environment Variables

```env
# Public (browser-safe)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_PHP_BRIDGE_URL=/api-bienek/email.php
NEXT_PUBLIC_TURNSTILE_SITE_KEY

# Secret (server-side only)
SUPABASE_SERVICE_ROLE_KEY
TURNSTILE_SECRET_KEY
```

Local dev: `.env.local` in `src/`. Production: Vercel dashboard.

## Path Aliases

`@/*` maps to `src/src/*` — import as `@/components/...`, `@/lib/...`, etc.

## Static Assets

Images are in `public/assets/images/`. Must be WebP format. Product images max 120 KB, general images max 204 KB (Supabase 1 GB storage constraint). Use `next/image` with `unoptimized={true}` (required by static export).
