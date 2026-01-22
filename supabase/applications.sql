-- Create applications table for job postings
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  area text NOT NULL,
  message text,
  cv_url text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert applications (anyone can apply)
CREATE POLICY "Enable insert for all users" ON public.applications
    FOR INSERT
    WITH CHECK (true);

-- Policy: Allow authenticated users (admins) to view applications
CREATE POLICY "Enable read access for authenticated users only" ON public.applications
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy: Service Role has full access (implicit, but good to remember)
-- GRANT ALL ON public.applications TO service_role;
