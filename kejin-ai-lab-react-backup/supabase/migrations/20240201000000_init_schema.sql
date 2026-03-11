-- Enable Row Level Security
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS thoughts ENABLE ROW LEVEL SECURITY;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    preview_image_url VARCHAR(500),
    demo_url VARCHAR(500),
    github_url VARCHAR(500),
    tech_stack TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0
);

-- Create thoughts table
CREATE TABLE IF NOT EXISTS thoughts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_published BOOLEAN DEFAULT true
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order DESC);
CREATE INDEX IF NOT EXISTS idx_thoughts_published ON thoughts(is_published);
CREATE INDEX IF NOT EXISTS idx_thoughts_created ON thoughts(created_at DESC);

-- Enable RLS (again to be sure for new tables)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT SELECT ON projects TO anon;
GRANT SELECT ON thoughts TO anon;
GRANT ALL ON projects TO authenticated;
GRANT ALL ON thoughts TO authenticated;

-- Create Policies
CREATE POLICY "Enable read access for all users" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON thoughts
    FOR SELECT USING (is_published = true);

CREATE POLICY "Enable all access for authenticated users" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all access for authenticated users" ON thoughts
    FOR ALL USING (auth.role() = 'authenticated');
