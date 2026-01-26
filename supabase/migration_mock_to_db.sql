-- ============================================
-- MIGRATION: Mock Data to Supabase
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. USER PROFILES EXTENSION
-- (Extends auth.users with additional business data)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  full_name text NOT NULL,
  company text,
  phone text,
  role text NOT NULL DEFAULT 'client', -- 'client' | 'admin'
  must_change_password boolean DEFAULT false, -- For temporary passwords
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read/update own profile
CREATE POLICY "Users manage own profile" ON public.user_profiles
  FOR ALL USING (auth.uid() = id);

-- Service role full access
CREATE POLICY "Service role full access" ON public.user_profiles
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 2. LEADS ENHANCEMENT
-- Add conversion tracking
-- ============================================
ALTER TABLE public.leads 
  ADD COLUMN IF NOT EXISTS converted_user_id uuid REFERENCES auth.users(id);

-- ============================================
-- 3. ORDERS SYSTEM (Replace mock orders)
-- ============================================

-- Drop existing orders if they exist (fresh start)
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.order_status_history CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;

-- Orders with 4-state system
CREATE TABLE public.orders (
  id text PRIMARY KEY, -- e.g., "ORD-2026-001"
  user_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'solicitud', 
    -- 'solicitud' | 'activa' | 'finalizada' | 'no_finalizada'
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Clients see only active/completed orders (not 'solicitud')
CREATE POLICY "Clients see own non-solicitud orders" ON public.orders
  FOR SELECT USING (
    auth.uid() = user_id 
    AND status IN ('activa', 'finalizada', 'no_finalizada')
  );

-- Clients can insert their own orders (with 'solicitud' status)
CREATE POLICY "Clients can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service role / Admins can do everything
CREATE POLICY "Service role full access orders" ON public.orders
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 4. ORDER ITEMS
-- ============================================
CREATE TABLE public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id text REFERENCES public.products(id),
  product_name text NOT NULL, -- Snapshot of name at order time
  quantity int NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Users can see items from their orders
CREATE POLICY "Users see own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
      AND orders.status != 'solicitud'
    )
  );

-- Users can insert items when creating orders
CREATE POLICY "Users can create order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Service role full access
CREATE POLICY "Service role full access order_items" ON public.order_items
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 5. ORDER STATUS HISTORY (Audit Trail)
-- ============================================
CREATE TABLE public.order_status_history (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  old_status text,
  new_status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz DEFAULT now(),
  notes text
);

ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- Service role only (admin action log)
CREATE POLICY "Service role full access history" ON public.order_status_history
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 6. HELPER FUNCTION: Generate Order Number
-- ============================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  year_part text;
  count_part int;
  new_id text;
BEGIN
  year_part := to_char(now(), 'YYYY');
  
  SELECT COUNT(*) + 1 INTO count_part
  FROM public.orders
  WHERE id LIKE 'ORD-' || year_part || '-%';
  
  new_id := 'ORD-' || year_part || '-' || lpad(count_part::text, 4, '0');
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SUMMARY
-- ============================================
-- Tables created/modified:
-- ✅ user_profiles (new)
-- ✅ leads (added converted_user_id)
-- ✅ orders (new with 4-state system)
-- ✅ order_items (new)
-- ✅ order_status_history (new for audit)

-- After running this, you need to:
-- 1. Create admin user in Supabase Auth Dashboard
-- 2. Insert admin profile with role='admin'
-- 3. Test Lead -> Client conversion flow
