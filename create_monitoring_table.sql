-- Create monitoring_snapshots table
CREATE TABLE IF NOT EXISTS public.monitoring_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  email TEXT NOT NULL,
  house_id TEXT NOT NULL,
  snapshot TEXT NOT NULL, -- Base64 encoded image
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.monitoring_snapshots ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public insert for monitoring" ON public.monitoring_snapshots
FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Allow admin select for monitoring" ON public.monitoring_snapshots
FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
  )
);

CREATE POLICY "Allow admin delete for monitoring" ON public.monitoring_snapshots
FOR DELETE TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
  )
);