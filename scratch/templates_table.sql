-- 0. Drop existing table to ensure a clean slate
DROP TABLE IF EXISTS templates;

-- 1. Create the templates table
CREATE TABLE templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  discount_price NUMERIC,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, category)
);

-- 2. Insert initial templates
INSERT INTO templates (name, category, price, discount_price) VALUES
  -- Matrimonial Templates
  ('classic', 'Matrimonial', 99, null),
  ('modern', 'Matrimonial', 99, null),
  ('minimal', 'Matrimonial', 99, null),
  ('elegant', 'Matrimonial', 149, 99),
  ('royal', 'Matrimonial', 199, 149),
  
  -- Job Resume Templates
  ('professional', 'Job Resume', 99, null),
  ('modern', 'Job Resume', 149, 99),
  
  -- Business Profile Templates
  ('classic', 'Business', 149, 99),
  ('modern', 'Business', 199, 149)
ON CONFLICT (name, category) DO NOTHING;

-- 3. Set up Row Level Security (RLS)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the templates
CREATE POLICY "Allow public read access to templates"
  ON templates FOR SELECT
  USING (true);

-- Allow Admin Panel to Insert, Update, and Delete templates
-- Note: In a production app with authentication, you should restrict this to admin users only.
CREATE POLICY "Allow insert for templates"
  ON templates FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update for templates"
  ON templates FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow delete for templates"
  ON templates FOR DELETE
  USING (true);
