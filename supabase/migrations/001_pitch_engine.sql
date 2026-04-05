-- Pitch Engine tables

create extension if not exists "pgcrypto";

create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website_url text,
  industry text not null,
  employee_range text,
  revenue_band text,
  contact_name text,
  contact_title text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index companies_name_idx on companies (name);

create table pitch_runs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies (id),
  status text not null default 'draft',
  website_summary text,
  enrichment_json jsonb,
  input_json jsonb not null,
  pitch_brief_json jsonb,
  placeholder_map_json jsonb,
  validation_errors_json jsonb,
  pptx_file_path text,
  llm_model text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pitch_runs_company_idx on pitch_runs (company_id);
create index pitch_runs_status_idx on pitch_runs (status);
create index pitch_runs_created_idx on pitch_runs (created_at);

create table pitch_run_events (
  id uuid primary key default gen_random_uuid(),
  pitch_run_id uuid not null references pitch_runs (id),
  event_type text not null,
  event_json jsonb,
  created_at timestamptz not null default now()
);

create index events_run_idx on pitch_run_events (pitch_run_id);
