'use client';

import type { PitchBrief } from '@/lib/pitch/types';
import { cn } from '@/lib/utils/cn';

interface Props {
  brief: PitchBrief;
  className?: string;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h4 className="text-[10px] tracking-[.12em] uppercase text-[#e05e14] mb-2 font-semibold">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-white/[.06] border border-white/10 rounded-md px-2.5 py-1 text-[12px] text-white/70 mr-1.5 mb-1.5">
      {children}
    </span>
  );
}

export default function PitchBriefPreview({ brief, className }: Props) {
  return (
    <div
      className={cn(
        'bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-6 text-white/80',
        className,
      )}
    >
      <h3 className="font-display text-xl font-semibold text-white mb-1">
        Pitch Brief
      </h3>
      <p className="text-[12px] text-white/40 mb-5">
        AI-generated structured content
      </p>

      <Section title="Positioning">
        <p className="text-[15px] font-semibold text-white mb-2">
          {brief.positioningHeadline}
        </p>
        <p className="text-[13px] leading-relaxed text-white/60">
          {brief.companySummary}
        </p>
      </Section>

      <Section title="Likely Pains">
        <div className="flex flex-wrap">
          {brief.likelyPains.map((pain) => (
            <Tag key={pain}>{pain}</Tag>
          ))}
        </div>
      </Section>

      <Section title="Inefficiencies">
        <div className="space-y-2">
          {brief.inefficiencies.map((ineff, i) => (
            <div
              key={i}
              className="bg-white/[.03] border border-white/[.06] rounded-lg p-3"
            >
              <div className="text-[10px] tracking-[.08em] uppercase text-[#e05e14]/70 mb-1">
                {ineff.area}
              </div>
              <div className="text-[13px] text-white/70">{ineff.issue}</div>
              <div className="text-[11px] text-white/40 mt-1">
                Impact: {ineff.impact}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Opportunities">
        <ul className="space-y-1">
          {brief.opportunities.map((opp, i) => (
            <li key={i} className="text-[13px] text-white/70 flex items-start gap-2">
              <span className="text-[#e05e14] mt-0.5">&#9656;</span>
              {opp}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Quick Win">
        <p className="text-[14px] text-white/80 bg-[#e05e14]/10 border border-[#e05e14]/20 rounded-lg px-3.5 py-2.5">
          {brief.recommendedQuickWin}
        </p>
      </Section>

      <Section title="Impact Estimate">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-semibold text-[#e05e14]">
            {brief.impactEstimate.low}
          </span>
          <span className="text-white/30">&ndash;</span>
          <span className="font-mono text-2xl font-semibold text-[#e05e14]">
            {brief.impactEstimate.high}
          </span>
        </div>
        <p className="text-[11px] text-white/40 mt-1">
          {brief.impactEstimate.label}
        </p>
      </Section>

      <Section title="90-Day Plan">
        <div className="grid grid-cols-3 gap-2">
          {(['month1', 'month2', 'month3'] as const).map((key, i) => (
            <div
              key={key}
              className="bg-white/[.03] border border-white/[.06] rounded-lg p-3"
            >
              <div className="text-[10px] tracking-[.08em] uppercase text-white/30 mb-1">
                Month {i + 1}
              </div>
              <div className="text-[12px] text-white/70">
                {brief.ninetyDayPlan[key]}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Engagement Options">
        <div className="space-y-2">
          {brief.engagementOptions.map((opt, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-mono text-[11px] text-[#e05e14] mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-[13px] font-medium text-white/80">
                  {opt.name}
                </div>
                <div className="text-[11px] text-white/40">{opt.description}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Risk & Governance">
        <ul className="space-y-1">
          {brief.riskAndGovernance.map((risk, i) => (
            <li key={i} className="text-[12px] text-white/60 flex items-start gap-2">
              <span className="text-red-400/60 mt-0.5">&#9679;</span>
              {risk}
            </li>
          ))}
        </ul>
      </Section>

      {brief.evidenceNotes.length > 0 && (
        <Section title="Evidence Notes">
          <ul className="space-y-1">
            {brief.evidenceNotes.map((note, i) => (
              <li key={i} className="text-[11px] text-white/40 italic">
                {note}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
