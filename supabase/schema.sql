-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- SECTORS
create table public.sectors (
  id text primary key,
  slug text unique not null,
  title text not null,
  description text,
  full_description text,
  icon text,
  image text
);

alter table public.sectors enable row level security;

create policy "Enable read access for all users" on public.sectors
  for select using (true);

create policy "Enable insert for admins only" on public.sectors
  for insert with check (auth.role() = 'service_role' or (auth.jwt() ->> 'email') in (select email from auth.users where is_super_admin = true));
  -- Note: explicit admin check implementation depends on how we define "admin". 
  -- For simplicity in this hybrid model, we often trust the service role or a specific claim.
  -- Simplified: Policy for Authenticated Admin (requires setup) or Service Role.
  -- Let's stick to: Public Read, Service Role Write (for seeding/admin api).

create policy "Enable write for service role" on public.sectors
  for all using (auth.role() = 'service_role');

-- FAMILIES
create table public.families (
  id text primary key,
  name text not null
);

alter table public.families enable row level security;

create policy "Enable read access for all users" on public.families
  for select using (true);

create policy "Enable write for service role" on public.families
  for all using (auth.role() = 'service_role');

-- PRODUCTS
create table public.products (
  id text primary key,
  name text not null,
  brand text,
  brand_logo text,
  description text,
  price numeric,
  sku text,
  images text[],
  specs jsonb,
  badges text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

create policy "Enable read access for all users" on public.products
  for select using (true);

create policy "Enable write for service role" on public.products
  for all using (auth.role() = 'service_role');

-- RELATIONS (Many-to-Many)
create table public.product_sectors (
  product_id text references public.products(id) on delete cascade,
  sector_id text references public.sectors(id) on delete cascade,
  primary key (product_id, sector_id)
);

alter table public.product_sectors enable row level security;

create policy "Enable read access for all users" on public.product_sectors
  for select using (true);

create policy "Enable write for service role" on public.product_sectors
  for all using (auth.role() = 'service_role');

create table public.product_families (
  product_id text references public.products(id) on delete cascade,
  family_id text references public.families(id) on delete cascade,
  primary key (product_id, family_id)
);

alter table public.product_families enable row level security;

create policy "Enable read access for all users" on public.product_families
  for select using (true);

create policy "Enable write for service role" on public.product_families
  for all using (auth.role() = 'service_role');

-- ARTICLES
create table public.articles (
  id text primary key,
  title text not null,
  excerpt text,
  image text,
  category text,
  date date,
  read_time text,
  content text, -- Future proofing
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.articles enable row level security;

create policy "Enable read access for all users" on public.articles
  for select using (true);

create policy "Enable write for service role" on public.articles
  for all using (auth.role() = 'service_role');

-- LEADS (Contact Form)
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text,
  phone text,
  company text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.leads enable row level security;

-- Public can INSERT (submit form)
create policy "Enable insert for all users" on public.leads
  for insert with check (true);

-- Only Admin/Service Role can SELECT/UPDATE
create policy "Enable full access for service role" on public.leads
  for all using (auth.role() = 'service_role');

-- CLIENTS (Extended Profile)
create table public.clients (
  id uuid references auth.users not null primary key, -- Linked to Supabase Auth User
  name text,
  email text,
  company text,
  phone text,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.clients enable row level security;

create policy "Users can read own client data" on public.clients
  for select using (auth.uid() = id);

create policy "Service role can manage clients" on public.clients
  for all using (auth.role() = 'service_role');

-- ORDERS
create table public.orders (
  id text primary key, -- Can be generated ID like 'ORD-001'
  client_id uuid references public.clients(id),
  total numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

create policy "Users can read own orders" on public.orders
  for select using (auth.uid() = client_id);

create policy "Service role can manage orders" on public.orders
  for all using (auth.role() = 'service_role');

create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id text references public.orders(id) on delete cascade,
  product_id text references public.products(id),
  product_name text,
  quantity integer not null,
  price numeric not null
);

alter table public.order_items enable row level security;

create policy "Users can read own order items" on public.order_items
  for select using (
    exists ( select 1 from public.orders where id = order_items.order_id and client_id = auth.uid() )
  );

create policy "Service role can manage order items" on public.order_items
  for all using (auth.role() = 'service_role');

-- STORAGE POLICIES (Virtual, requires Bucket creation in Dashboard)
-- Insert these via SQL Editor only if the bucket exists, otherwise they fail.
-- Assuming bucket 'files' exists for simplicity or 'products-images' as requested.
insert into storage.buckets (id, name, public) values ('products-images', 'products-images', true) ON CONFLICT DO NOTHING;

create policy "Public Access" on storage.objects for select using ( bucket_id = 'products-images' );
create policy "Auth Admin Write" on storage.objects for insert with check ( bucket_id = 'products-images' and auth.role() = 'service_role' );
create policy "Auth Admin Delete" on storage.objects for delete using ( bucket_id = 'products-images' and auth.role() = 'service_role' );
