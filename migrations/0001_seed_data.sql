-- Categories
INSERT INTO public.categories (title, slug) VALUES
('Health Insurance', 'health-insurance'),
('Life Insurance', 'life-insurance'),
('Motor Insurance', 'motor-insurance'),
('Mutual Funds / SIP', 'mutual-funds-sip'),
('NRI Planning', 'nri-planning'),
('Retirement Planning', 'retirement-planning')
ON CONFLICT (slug) DO NOTHING;

-- Seed Profile (Placeholder - ID must be updated to a real Auth UID to login)
-- UUID: 00000000-0000-0000-0000-000000000000
INSERT INTO public.profiles (id, full_name, role, can_post_direct)
VALUES
('00000000-0000-0000-0000-000000000000', 'Satish Mishra (Seed Admin)', 'admin', true)
ON CONFLICT (id) DO NOTHING;

-- Posts
INSERT INTO public.posts (title, slug, category_id, author_id, status, blocks, cover_image_url)
VALUES
(
  'Why Health Insurance is Critical in 2026',
  'why-health-insurance-critical-2026',
  (SELECT id FROM public.categories WHERE slug = 'health-insurance'),
  '00000000-0000-0000-0000-000000000000',
  'published',
  '[
    {"id": "1", "type": "heading", "props": {"level": 2, "text": "Rising Medical Costs"}},
    {"id": "2", "type": "paragraph", "props": {"text": "Healthcare inflation is outpacing general inflation. A single hospitalization can wipe out savings."}},
    {"id": "3", "type": "quote", "props": {"text": "It is better to have it and not need it, than to need it and not have it.", "author": "Satish Mishra"}}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop'
),
(
  'Top 5 Mistakes in Motor Insurance',
  'top-5-mistakes-motor-insurance',
  (SELECT id FROM public.categories WHERE slug = 'motor-insurance'),
  '00000000-0000-0000-0000-000000000000',
  'published',
  '[
    {"id": "1", "type": "heading", "props": {"level": 2, "text": "Ignoring IDV Value"}},
    {"id": "2", "type": "paragraph", "props": {"text": "Many people lower the declared value to save on premiums, but this hurts during claims."}}
  ]'::jsonb,
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop'
),
(
  'Retirement Planning: Start Early',
  'retirement-planning-start-early',
  (SELECT id FROM public.categories WHERE slug = 'retirement-planning'),
  '00000000-0000-0000-0000-000000000000',
  'pending',
  '[
    {"id": "1", "type": "paragraph", "props": {"text": "Compounding is the eighth wonder of the world. Start your SIPs today."}}
  ]'::jsonb,
  null
);
