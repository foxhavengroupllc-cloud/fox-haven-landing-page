'use client';

import { useState } from 'react';
import AdminShell, {
  AdminLogin,
  useAdminAuth,
} from '@/components/pitch-generator/admin-shell';
import CompanyInputForm from '@/components/pitch-generator/company-input-form';
import GenerationResult from '@/components/pitch-generator/generation-result';
import StatusStepper from '@/components/pitch-generator/status-stepper';
import type { CompanyInput, PipelineResult, RunStatus } from '@/lib/pitch/types';

export default function PitchGeneratorPage() {
  const { creds, checking, login, authHeader } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<RunStatus | null>(null);
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#060f1d] flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#e05e14] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!creds) {
    return <AdminLogin onLogin={login} />;
  }

  async function handleSubmit(input: CompanyInput) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setCurrentStatus('enriching');

    try {
      // Simulate status progression for UX
      const statusSequence: RunStatus[] = [
        'enriching',
        'generating_brief',
        'validating',
        'rendering_placeholders',
        'creating_deck',
      ];
      let statusIndex = 0;

      const statusInterval = setInterval(() => {
        statusIndex++;
        if (statusIndex < statusSequence.length) {
          setCurrentStatus(statusSequence[statusIndex]);
        }
      }, 3000);

      const res = await fetch('/api/pitch/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(input),
      });

      clearInterval(statusInterval);

      const data = await res.json();

      if (!res.ok) {
        setCurrentStatus('failed');
        setError(data.error || 'Generation failed');
        return;
      }

      setCurrentStatus(data.status);
      setResult(data);
    } catch (err) {
      setCurrentStatus('failed');
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-white mb-2">
            Pitch Generator
          </h1>
          <p className="text-[14px] text-white/40 leading-relaxed">
            Enter company details to generate a tailored AI consulting pitch
            deck. The system will analyze the company, generate structured
            content, and create a Google Slides presentation.
          </p>
        </div>

        {currentStatus && (
          <div className="mb-6 bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-5">
            <StatusStepper currentStatus={currentStatus} />
          </div>
        )}

        {error && !result && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
            <p className="text-[13px] text-red-400">{error}</p>
          </div>
        )}

        {result ? (
          <div className="space-y-6">
            <GenerationResult result={result} />
            <button
              onClick={() => {
                setResult(null);
                setCurrentStatus(null);
                setError(null);
              }}
              className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
            >
              &larr; Generate another
            </button>
          </div>
        ) : (
          <div className="bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-8">
            <CompanyInputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}
      </div>
    </AdminShell>
  );
}
