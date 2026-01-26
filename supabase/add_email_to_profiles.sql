-- =====================================================
-- ADD EMAIL COLUMN TO USER_PROFILES
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add email column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' AND column_name = 'email'
    ) THEN
        ALTER TABLE public.user_profiles ADD COLUMN email text;
    END IF;
END $$;

-- Optional: Backfill existing profiles with emails from auth.users
-- UPDATE public.user_profiles p
-- SET email = u.email
-- FROM auth.users u
-- WHERE p.id = u.id AND p.email IS NULL;
