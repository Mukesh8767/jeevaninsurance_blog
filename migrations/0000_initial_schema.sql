-- Enable functionality
create extension if not exists "uuid-ossp";

-- CATEGORIES
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  created_at timestamptz default now()
);

-- PROFILES
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'contributor' check (role in ('admin', 'editor', 'contributor')),
  can_post_direct boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- POSTS
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft', 'pending', 'published')),
  category_id uuid references public.categories(id) on delete set null,
  cover_image_url text,
  blocks jsonb not null default '[]'::jsonb,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CONTACT REQUESTS
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text,
  email text,
  service text,
  message text,
  created_at timestamptz default now(),
  notified boolean default false
);

-- ENABLE RLS
alter table public.categories enable row level security;
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.contact_requests enable row level security;

-- POLICIES

-- Categories (Public read, Admin write)
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Admins can manage categories" on public.categories using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Profiles
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile or Admin" on public.profiles for update using (auth.uid() = id or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Posts
create policy "Published posts are viewable by everyone" on public.posts for select using (status = 'published');
create policy "Authors and API can view own posts" on public.posts for select using (auth.uid() = author_id);
create policy "Admins and Editors can view all posts" on public.posts for select using (exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'editor')));

create policy "Authors can insert posts" on public.posts for insert with check (
  auth.uid() = author_id 
  and (status != 'published' or exists (select 1 from public.profiles where id = auth.uid() and can_post_direct = true))
);

create policy "Authors can update own posts" on public.posts for update using (auth.uid() = author_id);
create policy "Admins can update any post" on public.posts for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- Contact Requests
create policy "Anyone can create contact request" on public.contact_requests for insert with check (true);
create policy "Only admins can view contact requests" on public.contact_requests for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- STORAGE (If using Supabase Storage)
insert into storage.buckets (id, name, public) values ('public-media', 'public-media', true) on conflict do nothing;

create policy "Public Access Media" on storage.objects for select using (bucket_id = 'public-media');
create policy "Authenticated upload media" on storage.objects for insert with check (bucket_id = 'public-media' and auth.role() = 'authenticated');
