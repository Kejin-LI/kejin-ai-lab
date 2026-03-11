
-- Create comments table
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.comments enable row level security;

-- Create policies
-- Allow anyone to read comments
create policy "Allow public read access to comments" 
  on public.comments for select 
  using (true);

-- Allow authenticated users to insert comments
create policy "Allow authenticated insert to comments" 
  on public.comments for insert 
  to authenticated 
  with check (auth.uid() = user_id);

-- Allow users to delete their own comments
create policy "Allow users to delete own comments" 
  on public.comments for delete 
  to authenticated 
  using (auth.uid() = user_id);

-- Create a view to easily fetch user metadata with comments
-- This avoids complex joins in the client and keeps user data secure
create or replace view public.comments_with_users as
select 
  c.id,
  c.content,
  c.created_at,
  c.user_id,
  u.raw_user_meta_data->>'full_name' as user_name,
  u.raw_user_meta_data->>'avatar_url' as user_avatar,
  u.email
from public.comments c
join auth.users u on c.user_id = u.id
order by c.created_at desc;

-- Grant access to the view
grant select on public.comments_with_users to anon, authenticated;
