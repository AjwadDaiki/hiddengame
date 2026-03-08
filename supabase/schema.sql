-- ─── ArcadeWave — Supabase Schema ─────────────────────────────────────────────
-- Run this in your Supabase SQL editor after creating a project.
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Genres ───────────────────────────────────────────────────────────────────
create table if not exists genres (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,           -- e.g. "rpg"
  name        text not null,                  -- e.g. "RPG"
  description text,
  color       text,                           -- accent hex e.g. "#a855f7"
  created_at  timestamptz default now()
);

-- ─── Games ────────────────────────────────────────────────────────────────────
create table if not exists games (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  title           text not null,

  -- Descriptions (multi-language)
  description_fr  text,
  description_en  text,
  description_es  text,
  description_pt  text,
  description_de  text,
  description_ja  text,

  -- Genre
  genre_id        uuid references genres(id) on delete set null,
  genre           text not null,              -- denormalized for fast queries
  subgenre        text,

  -- Metadata
  players         text not null default '1 joueur',
  rating          numeric(3,1) default 4.0 check (rating between 0 and 5),
  rating_count    integer default 0,
  size            text default '—',
  how_to_play     text,
  tags            text[] default '{}',

  -- Status flags
  is_new          boolean default false,
  is_flash        boolean default false,
  is_featured     boolean default false,
  is_published    boolean default true,

  -- Play stats
  play_count      bigint default 0,
  online_players  integer default 0,

  -- Content
  embed_url       text,                       -- GameDistribution or .swf path
  thumbnail_url   text,
  banner_url      text,

  -- Visual theming
  accent          text default '#a855f7',
  gradient_from   text default '#1a0533',
  gradient_via    text default '#4c1d95',
  gradient_to     text default '#7c3aed',

  -- SEO
  seo_title       text,
  seo_description text,

  -- Timestamps
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger games_updated_at
  before update on games
  for each row execute function update_updated_at();

-- ─── Game stats (per-day aggregates) ─────────────────────────────────────────
create table if not exists game_stats (
  id          uuid primary key default uuid_generate_v4(),
  game_id     uuid not null references games(id) on delete cascade,
  date        date not null default current_date,
  play_count  integer default 0,
  unique_ips  integer default 0,
  unique (game_id, date)
);

-- ─── Users (optional — Supabase Auth handles auth.users) ─────────────────────
create table if not exists user_profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  username        text unique,
  avatar_url      text,
  xp              integer default 0,
  level           integer default 1,
  total_playtime  integer default 0,         -- in minutes
  created_at      timestamptz default now()
);

-- ─── User favorites ───────────────────────────────────────────────────────────
create table if not exists user_favorites (
  user_id    uuid not null references auth.users(id) on delete cascade,
  game_id    uuid not null references games(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, game_id)
);

-- ─── User play history ────────────────────────────────────────────────────────
create table if not exists user_play_history (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete set null,
  game_id     uuid not null references games(id) on delete cascade,
  session_at  timestamptz default now(),
  duration    integer default 0,             -- in seconds
  progress    integer default 0              -- 0-100 completion percent
);

-- ─── Blog posts ───────────────────────────────────────────────────────────────
create table if not exists blog_posts (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title_fr      text not null,
  title_en      text,
  content_fr    text,
  content_en    text,
  excerpt_fr    text,
  excerpt_en    text,
  cover_url     text,
  tags          text[] default '{}',
  is_published  boolean default false,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create trigger blog_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

-- ─── RPC: increment play count atomically ────────────────────────────────────
create or replace function increment_play_count(game_id uuid)
returns void language plpgsql security definer as $$
begin
  update games
  set play_count = play_count + 1
  where id = game_id;

  insert into game_stats (game_id, date, play_count)
  values (game_id, current_date, 1)
  on conflict (game_id, date)
  do update set play_count = game_stats.play_count + 1;
end;
$$;

-- ─── Indexes ──────────────────────────────────────────────────────────────────
create index if not exists games_slug_idx         on games(slug);
create index if not exists games_genre_idx        on games(genre);
create index if not exists games_play_count_idx   on games(play_count desc);
create index if not exists games_is_new_idx       on games(is_new) where is_new = true;
create index if not exists games_is_flash_idx     on games(is_flash) where is_flash = true;
create index if not exists games_is_featured_idx  on games(is_featured) where is_featured = true;
create index if not exists game_stats_date_idx    on game_stats(game_id, date desc);

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table games            enable row level security;
alter table genres           enable row level security;
alter table game_stats       enable row level security;
alter table user_profiles    enable row level security;
alter table user_favorites   enable row level security;
alter table user_play_history enable row level security;
alter table blog_posts       enable row level security;

-- Public read access for published games + genres + blog
create policy "Public games read" on games
  for select using (is_published = true);

create policy "Public genres read" on genres
  for select using (true);

create policy "Public blog read" on blog_posts
  for select using (is_published = true);

-- Auth users can read/write their own data
create policy "Users read own profile" on user_profiles
  for select using (auth.uid() = id);

create policy "Users update own profile" on user_profiles
  for update using (auth.uid() = id);

create policy "Users manage favorites" on user_favorites
  for all using (auth.uid() = user_id);

create policy "Users manage play history" on user_play_history
  for all using (auth.uid() = user_id);

-- ─── Sample data (optional) ───────────────────────────────────────────────────
-- Uncomment to seed with a sample genre
/*
insert into genres (slug, name, color) values
  ('rpg',          'RPG',          '#a855f7'),
  ('fps',          'FPS',          '#3b82f6'),
  ('battle-royale','Battle Royale','#f43f5e'),
  ('mmo',          'MMO',          '#2c5364'),
  ('survie',       'Survie',       '#22c55e'),
  ('combat',       'Combat',       '#f97316'),
  ('jrpg',         'JRPG',        '#a855f7'),
  ('puzzle',       'Puzzle',       '#94a3b8'),
  ('strategie',    'Stratégie',    '#84cc16'),
  ('horreur',      'Horreur',      '#ef4444'),
  ('course',       'Course',       '#f59e0b'),
  ('aventure',     'Aventure',     '#06b6d4'),
  ('simulation',   'Simulation',   '#06b6d4'),
  ('action',       'Action',       '#ef4444'),
  ('moba',         'MOBA',         '#3b82f6'),
  ('sport',        'Sport',        '#f59e0b'),
  ('platformer',   'Platformer',   '#a855f7'),
  ('arcade',       'Arcade',       '#ec4899')
on conflict (slug) do nothing;
*/
