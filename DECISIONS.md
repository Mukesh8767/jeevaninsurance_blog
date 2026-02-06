# Decisions Log

## 1. Media Storage Strategy
**Decision:** Option A: Supabase Storage.
**Justification:**
- Keeps the stack unified (Auth, DB, Storage all in Supabase).
- Simplifies Row-Level Security (RLS) policies for media access.
- Reduces dependency complexity (single vendor).
- Sufficient for the "consultancy blog" use case.

## 2. Authentication
**Decision:** Supabase Auth (Email/Password).
**Justification:** Built-in, secure, and integrates seamlessly with RLS.

## 3. Editor Architecture
**Decision:** Custom Block-Based Editor using `dnd-kit`.
**Justification:**
- Requirement specifies specific block types (heading, paragraph, quote, etc.).
- A custom solution allows granular control over the JSON structure stored in `posts.blocks`.
- `dnd-kit` is modern, accessible, and lightweight compared to older dnd libraries.

## 4. Styling
**Decision:** Tailwind CSS.
**Justification:** Mandatory requirement. Using local configuration with custom color palette for "Premium/Consultancy" feel.

## 5. Testing
**Decision:** Vitest (Unit) + Playwright (E2E).
**Justification:**
- **Vitest**: Faster than Jest, native ESM support, compatible with Vite/Next.js environment. Requested to avoid Jest.
- **Playwright**: Robust E2E testing, runs locally without complex setup, supports all modern browsers.

## 6. Rendering Strategy
**Decision:** Hybrid.
- **ISR (Incremental Static Regeneration)** for Blog Posts (`revalidate: 60`) to ensure speed and SEO while keeping content fresh.
- **Client-Side Rendering** for Admin Panel (needs auth context everywhere).
- **Server Components** for Landing Page and non-interactive sections.

## 7. Edge Functions
**Decision:** Supabase Edge Functions (Deno/TypeScript).
**Justification:** Mandatory for secure operations (sending emails, admin user creation) to avoid exposing `service_role` key in the client.
