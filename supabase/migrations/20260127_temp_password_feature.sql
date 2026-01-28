-- 1. Add temp_password column to user_profiles
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS temp_password text;

-- 2. Create Trigger Function to clear temp_password
CREATE OR REPLACE FUNCTION public.handle_password_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If password has changed (encrypted_password hash is different)
  -- Or if email was confirmed (first login simulation often involves verification)
  -- But strictly, user asked "once user changes temp password"
  
  IF NEW.encrypted_password IS DISTINCT FROM OLD.encrypted_password THEN
    UPDATE public.user_profiles
    SET temp_password = NULL, must_change_password = false
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach Trigger to auth.users
-- Drop if exists to ensure clean slate
DROP TRIGGER IF EXISTS on_auth_user_password_change ON auth.users;

CREATE TRIGGER on_auth_user_password_change
AFTER UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_password_change();

-- 4. Update RLS policies to ensure admins can read this new column
-- (Existing select policy likely covers * so it includes new column)
