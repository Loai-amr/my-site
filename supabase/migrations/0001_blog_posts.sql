-- Blog posts for www.loaiamr.com/blog. Runs on the same Supabase project as shop.loaiamr.com.
-- Published posts are public (read with the anon key on the server, so RLS is the guarantee that
-- drafts never leak). All writes go through the service role: the publish API (/api/blog/publish)
-- and the /admin/blog server actions.

create type public.post_status as enum ('draft', 'published');

create table public.posts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null check (char_length(title) between 3 and 200),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),
  excerpt       text not null check (char_length(excerpt) <= 300),
  content       text not null,                 -- markdown
  tags          text[] not null default '{}',
  cover_image   text check (cover_image ~ '^https://'),
  status        public.post_status not null default 'draft',
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint posts_published_has_date check (status = 'draft' or published_at is not null)
);

create index posts_published_idx on public.posts (published_at desc) where status = 'published';
create index posts_tags_idx on public.posts using gin (tags);

-- ─── updated_at ─────────────────────────────────────────────────────────────
create function public.posts_set_updated_at() returns trigger
language plpgsql
set search_path = '' -- advisor lint 0011
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger posts_updated_at before update on public.posts
  for each row execute function public.posts_set_updated_at();

-- ─── Access ─────────────────────────────────────────────────────────────────
alter table public.posts enable row level security;

revoke all on public.posts from anon, authenticated;
grant select on public.posts to anon, authenticated;

create policy "public can read published posts" on public.posts
  for select to anon, authenticated using (status = 'published');

-- Restrictive denies (like the shop's tables), so a permissive write policy added by mistake
-- later still can't let the browser write.
create policy "deny client insert" on public.posts as restrictive for insert to anon, authenticated with check (false);
create policy "deny client update" on public.posts as restrictive for update to anon, authenticated using (false) with check (false);
create policy "deny client delete" on public.posts as restrictive for delete to anon, authenticated using (false);
