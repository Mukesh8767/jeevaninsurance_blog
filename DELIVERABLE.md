# JivanSecure Deliverables

This document tracks the deliverables and acceptance criteria for the JivanSecure project.

## Acceptance Checklist

### Functional
- [ ] **Landing Page**: Renders properly with Hero, Solutions, About.
- [ ] **Contact Form**: Submits data to `contact_requests` table.
- [ ] **Email Notifications**: Edge Function `send_contact_email` handles user confirmation and admin alert.
- [ ] **Admin User Creation**: Secure Edge Function `create_user` allows creating admin/editor accounts.
- [ ] **Auth**: Users can login/logout; Protected `/admin` routes implementation.
- [ ] **Blog Post Management**:
    - [ ] Create/Edit posts using Block Editor.
    - [ ] Status workflow (Draft -> Pending -> Published).
    - [ ] Drag-and-drop block reordering.
    - [ ] Blocks render correctly on public post page.
- [ ] **Media Uploads**: Images upload to Supabase Storage and display correctly.

### Infrastructure & Security
- [ ] **Supabase Setup**: SQL migrations provided for all tables.
- [ ] **RLS Policies**: Implemented and active for `profiles`, `posts`, `contact_requests`.
- [ ] **Secrets Management**: No service definition keys in client code; `service_role` only used in Edge Functions.
- [ ] **SEO**: Meta tags, Title, and Article Schema implemented.

### Quality Assurance
- [ ] **Unit Tests**: Critical utilities and Form validation tested with Vitest.
- [ ] **Local E2E Tests**: Playwright scripts for main flows (contact, login).
- [ ] **Accessibility**: ARIA labels and semantic HTML used.

## Local Setup Instructions

See [README.md](./README.md) for detailed setup instructions.
