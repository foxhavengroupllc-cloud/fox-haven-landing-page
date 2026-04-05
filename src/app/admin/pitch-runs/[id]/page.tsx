'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import AdminShell, {
  AdminLogin,
  useAdminAuth,
} from '@/components/pitch-generator/admin-shell';
import PitchBriefPreview from '@/components/pitch-generator/pitch-brief-preview';
import StatusStepper from '@/components/pitch-generator/status-stepper';
import { cn } from '@/lib/utils/cn';
import type { PitchBrief, RunStatus } from '@/lib/pitch/types';

interface RunDetail {
  id: string;
  status: RunStatus;
  website_summary: string | null;
  enrichment_json: Record<string, unknown> | null;
  input_json: Record<string, unknown>;
  pitch_brief_json: PitchBrief | null;
  placeholder_map_json: Record<string, string> | null;
  validation_errors_json: string[] | null;
  pptx_file_path: string | null;
  llm_model: string | null;
  created_at: string;
  updated_at: string;
}

interface CompanyDetail {
  id: string;
  name: string;
  website_url: string | null;
  industry: string;
  employee_range: string | null;
  revenue_band: string | null;
  contact_name: string | null;
  contact_title: string | null;
  notes: string | null;
}

interface EventDetail {
  id: string;
  event_type: string;
  event_json: Record<string, unknown> | null;
  created_at: string;
}

export default function PitchRunDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { creds, checking, login, authHeader } = useAdminAuth();
  const [run, setRun] = useState<RunDetail | null>(null);
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'brief' | 'input' | 'placeholders' | 'events'
  >('brief');

  useEffect(() => {
    if (!creds) return;
    fetchDetail();
  }, [creds, id]);

  async function fetchDetail() {
    setLoading(true);
    try {
      const res = await fetch(`/api/pitch/runs/${id}`, {
        headers: { Authorization: authHeader },
      });
      const data = await res.json();
      setRun(data.run);
      setCompany(data.company);
      setEvents(data.events ?? []);
    } catch {
      // handled by empty state
    } finally {
      setLoading(false);
    }
  }

  async function handleRegenerate() {
    setRegenerating(true);
    try {
      const res = await fetch('/api/pitch/regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({ runId: id }),
      });
      const data = await res.json();
      if (data.runId) {
        window.location.href = `/admin/pitch-runs/${data.runId}`;
      }
    } catch {
      // handled
    } finally {
      setRegenerating(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#060f1d] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#e05e14] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!creds) return <AdminLogin onLogin={login} />;

  if (loading) {
    return (
      <AdminShell>
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 border-2 border-[#e05e14] border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  if (!run || !company) {
    return (
      <AdminShell>
        <div className="text-center py-20">
          <p className="text-white/30">Run not found</p>
          <Link
            href="/admin/pitch-runs"
            className="text-[#e05e14] text-[13px] mt-4 inline-block"
          >
            &larr; Back to runs
          </Link>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <Link
            href="/admin/pitch-runs"
            className="text-[12px] text-white/30 hover:text-white/60 transition-colors mb-2 inline-block"
          >
            &larr; All runs
          </Link>
          <h1 className="font-display text-3xl font-semibold text-white">
            {company.name}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[12px] text-white/40">{company.industry}</span>
            {company.revenue_band && (
              <>
                <span className="text-white/15">&middot;</span>
                <span className="text-[12px] text-white/40">
                  {company.revenue_band}
                </span>
              </>
            )}
            {company.employee_range && (
              <>
                <span className="text-white/15">&middot;</span>
                <span className="text-[12px] text-white/40">
                  {company.employee_range} employees
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {run.pptx_file_path && (
            <a
              href={`/api/pitch/download/${run.id}`}
              className="px-4 py-2.5 rounded-xl bg-white/[.06] border border-white/10 text-[13px] text-white/80 hover:text-white hover:border-[#e05e14]/30 transition-all"
            >
              Download Deck &darr;
            </a>
          )}
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className={cn(
              'px-4 py-2.5 rounded-xl bg-[#e05e14] text-white text-[13px] font-semibold hover:bg-[#c4500f] transition-colors',
              regenerating && 'opacity-50 cursor-not-allowed',
            )}
          >
            {regenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-5 mb-6">
        <StatusStepper currentStatus={run.status} />
        <div className="flex items-center gap-4 mt-3 text-[11px] text-white/30">
          <span>
            Created{' '}
            {new Date(run.created_at).toLocaleString()}
          </span>
          {run.llm_model && (
            <>
              <span className="text-white/10">&middot;</span>
              <span className="font-mono">{run.llm_model}</span>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6">
        {(
          [
            { key: 'brief', label: 'Pitch Brief' },
            { key: 'input', label: 'Input' },
            { key: 'placeholders', label: 'Placeholders' },
            { key: 'events', label: 'Timeline' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'px-4 py-2 rounded-lg text-[13px] font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-white/[.08] text-white'
                : 'text-white/30 hover:text-white/60',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'brief' && run.pitch_brief_json && (
        <PitchBriefPreview brief={run.pitch_brief_json} />
      )}
      {activeTab === 'brief' && !run.pitch_brief_json && (
        <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-8 text-center">
          <p className="text-white/30 text-[14px]">
            No pitch brief generated
          </p>
          {run.validation_errors_json && (
            <div className="mt-4 text-left bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-[11px] tracking-[.08em] uppercase text-red-400 mb-2 font-semibold">
                Validation Errors
              </p>
              <ul className="space-y-1">
                {(run.validation_errors_json as string[]).map((err, i) => (
                  <li key={i} className="text-[12px] text-red-400/70">
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'input' && (
        <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-6">
          <h3 className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] mb-3 font-semibold">
            Raw Input
          </h3>
          <pre className="text-[12px] text-white/60 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {JSON.stringify(run.input_json, null, 2)}
          </pre>
          {run.website_summary && (
            <div className="mt-5 pt-5 border-t border-white/[.06]">
              <h3 className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] mb-2 font-semibold">
                Website Summary
              </h3>
              <p className="text-[13px] text-white/50 leading-relaxed">
                {run.website_summary}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'placeholders' && (
        <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-6">
          <h3 className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] mb-3 font-semibold">
            Placeholder Map
          </h3>
          {run.placeholder_map_json ? (
            <div className="space-y-1">
              {Object.entries(
                run.placeholder_map_json as Record<string, string>,
              ).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start gap-3 py-1.5 border-b border-white/[.04]"
                >
                  <code className="text-[11px] text-[#e05e14]/70 font-mono shrink-0 w-48">
                    {key}
                  </code>
                  <span className="text-[12px] text-white/50">
                    {value || <span className="text-white/15 italic">empty</span>}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-[14px]">No placeholders generated</p>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-6">
          <h3 className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] mb-4 font-semibold">
            Event Timeline
          </h3>
          {events.length === 0 ? (
            <p className="text-white/30 text-[14px]">No events recorded</p>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 pb-3 border-b border-white/[.04]"
                >
                  <div className="w-2 h-2 rounded-full bg-[#e05e14]/40 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-medium text-white/70">
                        {event.event_type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] text-white/20 font-mono">
                        {new Date(event.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    {event.event_json && (
                      <pre className="text-[10px] text-white/30 font-mono truncate">
                        {JSON.stringify(event.event_json)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
