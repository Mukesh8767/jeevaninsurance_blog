# JivanSecure

Category-driven insurance & financial advisory platform.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase
- **Testing**: Vitest (Unit), Playwright (E2E)

## Prerequisites
- Node.js 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for local dev) OR a cloud Supabase project.

## Local Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.local.example` to `.env.local` and fill in your keys.
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
   For Edge Functions, set secrets via CLI or Dashboard: `SUPABASE_SERVICE_ROLE_KEY`, `SENDGRID_API_KEY`.

3. **Database Setup (Supabase)**
   Run the migrations in SQL Editor or via CLI:
   - `migrations/0000_initial_schema.sql`: Creates tables and RLS policies.
   - `migrations/0001_seed_data.sql`: Populates categories and sample posts.

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

5. **Edge Functions**
   Navigate to `edge-functions/` and follow the README there to deploy.

## Testing

- **Unit Tests**: `npm run test` (Vitest)
- **E2E Tests**: `npx playwright test` (Playwright)

## Deployment
(Deployment configuration is explicitly excluded from this deliverable)

## Admin Access
- Navigate to `/admin`
- Default seed admin needs a real Auth User ID. After signing up/creating a user in Supabase Auth, update the `id` in `public.profiles` to match your Auth UID to gain Admin access.
