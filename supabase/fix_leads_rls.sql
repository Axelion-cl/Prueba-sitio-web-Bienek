-- =====================================================
-- FIX: Simplified RLS Policies (No Recursive Checks)
-- Run this FIRST in Supabase SQL Editor
-- =====================================================

-- The problem: Recursive policy checks cause 500 errors
-- Solution: Simple policies without self-referencing queries

-- =====================================================
-- 1. USER_PROFILES - SIMPLIFIED
-- =====================================================

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users manage own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role full access" ON public.user_profiles;
DROP POLICY IF EXISTS "Anonymous can count user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins full access to user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Public read for counting" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role full access user_profiles" ON public.user_profiles;

-- Simple policy: Anyone can read any profile (needed for admin to see clients)
CREATE POLICY "Allow read user_profiles" ON public.user_profiles
    FOR SELECT USING (true);

-- Users can update their own profile
CREATE POLICY "Users update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile OR admins can insert for others
CREATE POLICY "Insert user_profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Service role can do everything
CREATE POLICY "Service role all user_profiles" ON public.user_profiles
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 2. LEADS - SIMPLIFIED
-- =====================================================

DROP POLICY IF EXISTS "Enable insert for all users" ON public.leads;
DROP POLICY IF EXISTS "Enable full access for service role" ON public.leads;
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
DROP POLICY IF EXISTS "Service role full access to leads" ON public.leads;
DROP POLICY IF EXISTS "Anonymous can count leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Public read leads" ON public.leads;
DROP POLICY IF EXISTS "Service role full access leads" ON public.leads;

-- Anyone can insert leads (contact form)
CREATE POLICY "Insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Anyone can read leads (for dashboard and admin)
CREATE POLICY "Read leads" ON public.leads
    FOR SELECT USING (true);

-- Authenticated users can update leads
CREATE POLICY "Update leads" ON public.leads
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete leads
CREATE POLICY "Delete leads" ON public.leads
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- =====================================================
-- 3. ORDERS - SIMPLIFIED
-- =====================================================

DROP POLICY IF EXISTS "Clients see own non-solicitud orders" ON public.orders;
DROP POLICY IF EXISTS "Clients can create orders" ON public.orders;
DROP POLICY IF EXISTS "Service role full access orders" ON public.orders;
DROP POLICY IF EXISTS "Anonymous can count orders" ON public.orders;
DROP POLICY IF EXISTS "Admins full access to orders" ON public.orders;
DROP POLICY IF EXISTS "Clients can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;

-- Anyone can read orders (for dashboard counting)
CREATE POLICY "Read orders" ON public.orders
    FOR SELECT USING (true);

-- Authenticated users can insert orders
CREATE POLICY "Insert orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update orders
CREATE POLICY "Update orders" ON public.orders
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete orders
CREATE POLICY "Delete orders" ON public.orders
    FOR DELETE USING (auth.uid() IS NOT NULL);

-- =====================================================
-- 4. VERIFY YOUR ADMIN ROLE
-- Run this to confirm your role is 'admin':
-- =====================================================

-- SELECT id, full_name, role FROM public.user_profiles 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'marketing@bienek.cl');

-- If role is NOT 'admin', run:
-- UPDATE public.user_profiles SET role = 'admin' 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'marketing@bienek.cl');
