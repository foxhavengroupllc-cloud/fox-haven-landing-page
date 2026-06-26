-- "The Signal" newsletter issues, published from the Fox Haven Dashboard.
-- The dashboard upserts the public subset here (keyed by slug); the website
-- serves each issue's self-contained HTML at /field-notes/<slug> and lists
-- published issues on the Field Notes archive page.

create table if not exists public.newsletter_issues (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  issue_number  text not null default '',
  title         text not null default '',
  dek           text not null default '',
  source_tag    text not null default '',
  web_html      text not null default '',
  status        text not null default 'published',
  published_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create index if not exists idx_newsletter_issues_published
  on public.newsletter_issues (status, published_at desc);

-- Reads/writes happen only through the service role (the dashboard and the
-- website's server components), which bypasses RLS. Enable RLS with no public
-- policies so the anon key cannot read the table directly.
alter table public.newsletter_issues enable row level security;
