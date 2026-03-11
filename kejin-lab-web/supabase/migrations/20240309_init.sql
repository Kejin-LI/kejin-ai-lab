
-- Create tables for Projects and Thoughts

-- Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  content text, -- Markdown content or long description
  image_url text,
  link text, -- External link if any
  technologies text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Thoughts Table
create table public.thoughts (
  id uuid default gen_random_uuid() primary key,
  content text not null, -- The thought itself
  author text default 'Kejin Li',
  role text default 'Founder',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Admin Configuration Table (Simple approach for single password)
create table public.admin_config (
  key text primary key,
  value text not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.thoughts enable row level security;
alter table public.admin_config enable row level security;

-- Policies
create policy "Allow public read access to projects" on public.projects for select using (true);
create policy "Allow public read access to thoughts" on public.thoughts for select using (true);

-- Allow authenticated insert/update/delete
create policy "Allow authenticated insert to projects" on public.projects for insert to authenticated with check (true);
create policy "Allow authenticated update to projects" on public.projects for update to authenticated using (true);
create policy "Allow authenticated delete to projects" on public.projects for delete to authenticated using (true);

create policy "Allow authenticated insert to thoughts" on public.thoughts for insert to authenticated with check (true);
create policy "Allow authenticated update to thoughts" on public.thoughts for update to authenticated using (true);
create policy "Allow authenticated delete to thoughts" on public.thoughts for delete to authenticated using (true);

-- Storage Buckets (for images)
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true);

create policy "Allow public read access to project images" on storage.objects for select using ( bucket_id = 'project-images' );
create policy "Allow authenticated insert to project images" on storage.objects for insert to authenticated with check ( bucket_id = 'project-images' );

-- INITIAL DATA

-- Insert Projects
INSERT INTO public.projects (title, description, content, technologies, image_url) VALUES
('AI Agent Framework', 'A modular framework for building autonomous agents capable of complex reasoning and tool use.', 'Full details about AI Agent Framework...', ARRAY['Python', 'LangChain', 'OpenAI'], 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=abstract%20network%20of%20nodes%20connecting%20intelligent%20agents%20minimalist%20tech%20blue%20background&image_size=landscape_4_3'),
('LLM Reasoning Engine', 'An experimental engine optimizing chain-of-thought processes for large language models.', 'Full details about LLM Reasoning Engine...', ARRAY['Python', 'PyTorch', 'Transformers'], 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=neural%20network%20brain%20glowing%20synapses%20processing%20data%20stream%20futuristic%20concept&image_size=landscape_4_3'),
('Vision-Language Bridge', 'Bridging the gap between visual perception and natural language understanding for edge devices.', 'Full details about Vision-Language Bridge...', ARRAY['Computer Vision', 'Multimodal Models'], 'https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=eye%20and%20text%20merging%20concept%20vision%20language%20model%20bridge%20digital%20art&image_size=landscape_4_3');

-- Insert Thoughts
INSERT INTO public.thoughts (content, author, role) VALUES
('The future of coding isn''t about writing syntax, it''s about architecting intent.', 'Kejin Li', 'Founder'),
('AI agents will redefine personal productivity not by doing more, but by understanding better.', 'Kejin Li', 'Founder'),
('True multimodal understanding requires us to move beyond simple embedding alignment.', 'Kejin Li', 'Founder');
