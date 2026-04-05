create table if not exists audit_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website_url text,
  industry text not null,
  employee_range text,
  revenue_band text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references audit_companies(id),
  name text not null,
  email text not null,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists audit_sessions (
  id uuid primary key default gen_random_uuid(),
  token text not null unique default gen_random_uuid()::text,
  company_id uuid not null references audit_companies(id),
  contact_id uuid not null references audit_contacts(id),
  status text not null default 'in_progress',
  current_step integer not null default 0,
  answers jsonb not null default '{}',
  scores jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_follow_ups (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references audit_sessions(id),
  stage text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index on audit_sessions(token);
create index on audit_sessions(status);
create index on audit_sessions(company_id);
create index on audit_follow_ups(session_id);
