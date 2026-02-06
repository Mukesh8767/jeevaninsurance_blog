# Supabase Edge Functions

This directory contains the server-side logic for secure operations.

## Requirements
- Supabase CLI installed.
- Deno installed (for local development).

## Environment Variables
Set these via UI or `supabase secrets set`:
- `SUPABASE_URL`: Your project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: Service role (admin) key. **NEVER EXPOSE THIS**.
- `SENDGRID_API_KEY`: For sending emails.

## Functions

### 1. `create_user`
Programmatically creates a user in `auth.users` and a corresponding `public.profiles` entry.
- **Trigger**: HTTP POST (Admin only)
- **Body**: `{ "email": "...", "password": "...", "full_name": "...", "role": "..." }`

### 2. `send_contact_email`
Handles contact form submissions.
- **Trigger**: HTTP POST (Public)
- **Body**: `{ "name": "...", "email": "...", "phone": "...", "service": "...", "message": "..." }`

## Deployment
```bash
supabase functions deploy create_user
supabase functions deploy send_contact_email
```
