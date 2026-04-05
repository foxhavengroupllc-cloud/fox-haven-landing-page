'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminShell, {
  AdminLogin,
  useAdminAuth,
} from '@/components/pitch-generator/admin-shell';
import { cn } from '@/lib/utils/cn';
import type { RunStatus } from '@/lib/pitch/types';

interface RunSummary {
  id: string;
  status: string;
  companyName: string;
  industry: string;
  pptxFilePath: string | null;
  llmModel: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-[#16a34a]/20 text-[#16a34a]',
  failed: 'bg-red-500/20 text-red-400',
  draft: 'bg-white/10 text-white/50',
  enriching: 'bg-blue-500/20 text-blue-400',
  generating_brief: 'bg-[#e05e14]/20 text-[#e05e14]',
  validating: 'bg-amber-500/20 text-amber-400',
  rendering_placeholders: 'bg-purple-500/20 text-purple-400',
  creating_deck: 'bg-cyan-500/20 text-cyan-400',
};

export default function PitchRunsPage() {
  const { creds, checking, login, authHeader } = useAdminAuth();
  const [runs, setRuns] = useState<RunSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (!creds) return;
    fetchRuns();
  }, [creds, statusFilter]);

  async function fetchRuns() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/pitch/runs?${params}`, {
        headers: { Authorization: authHeader },
      });
      const data = await res.json();
      setRuns(data.runs ?? []);
    } catch {
      setRuns([]);
    } finally {
      setLoading(false);
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

  const filtered = search
    ? runs.filter(
        (r) =>
          r.companyName.toLowerCase().includes(search.toLowerCase()) ||
          r.industry.toLowerCase().includes(search.toLowerCase()),
      )
    : runs;

  return (
    <AdminShell>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-white mb-2">
            Pitch Runs
          </h1>
          <p className="text-[14px] text-white/40">
            {runs.length} total runs
          </p>
        </div>
        <Link
          href="/admin/pitch-generator"
          className="px-4 py-2.5 rounded-xl bg-[#e05e14] text-white text-[13px] font-semibold hover:bg-[#c4500f] transition-colors"
        >
          + New Pitch
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search company or industry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/[.04] border border-white/[.1] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/25 focus:border-[#e05e14]/50 focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/[.04] border border-white/[.1] rounded-xl px-4 py-2.5 text-[13px] text-white focus:border-[#e05e14]/50 focus:outline-none"
        >
          <option value="">All statuses</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-5 h-5 border-2 border-[#e05e14] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/30 text-[14px]">No runs found</p>
        </div>
      ) : (
        <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[.06]">
                <th className="text-left text-[10px] tracking-[.1em] uppercase text-white/30 px-5 py-3 font-medium">
                  Company
                </th>
                <th className="text-left text-[10px] tracking-[.1em] uppercase text-white/30 px-5 py-3 font-medium">
                  Industry
                </th>
                <th className="text-left text-[10px] tracking-[.1em] uppercase text-white/30 px-5 py-3 font-medium">
                  Status
                </th>
                <th className="text-left text-[10px] tracking-[.1em] uppercase text-white/30 px-5 py-3 font-medium">
                  Created
                </th>
                <th className="text-left text-[10px] tracking-[.1em] uppercase text-white/30 px-5 py-3 font-medium">
                  Deck
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((run) => (
                <tr
                  key={run.id}
                  className="border-b border-white/[.04] hover:bg-white/[.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/pitch-runs/${run.id}`}
                      className="text-[14px] text-white/80 hover:text-[#e05e14] transition-colors font-medium"
                    >
                      {run.companyName}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-white/40">
                    {run.industry}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        'inline-flex px-2.5 py-1 rounded-full text-[10px] tracking-[.08em] uppercase font-semibold',
                        STATUS_COLORS[run.status] ?? 'bg-white/10 text-white/50',
                      )}
                    >
                      {run.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-white/30 font-mono">
                    {new Date(run.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    {run.pptxFilePath ? (
                      <a
                        href={`/api/pitch/download/${run.id}`}
                        className="text-[12px] text-[#e05e14] hover:underline"
                      >
                        Download &darr;
                      </a>
                    ) : (
                      <span className="text-[12px] text-white/15">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
