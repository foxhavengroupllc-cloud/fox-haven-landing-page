import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

type TableDef = {
  Row: Row;
  Insert: Row;
  Update: Row;
  Relationships: any[];
};

type Database = {
  public: {
    Tables: {
      companies: TableDef;
      pitch_runs: TableDef;
      pitch_run_events: TableDef;
      audit_companies: TableDef;
      audit_contacts: TableDef;
      audit_sessions: TableDef;
      audit_follow_ups: TableDef;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const globalForSupabase = globalThis as unknown as {
  _supabase: SupabaseClient<Database> | undefined;
};

export const supabase: SupabaseClient<Database> = new Proxy(
  {} as SupabaseClient<Database>,
  {
    get(_target, prop, receiver) {
      if (!globalForSupabase._supabase) {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
        globalForSupabase._supabase = createClient<Database>(url, key);
      }
      return Reflect.get(globalForSupabase._supabase, prop, receiver);
    },
  },
);
