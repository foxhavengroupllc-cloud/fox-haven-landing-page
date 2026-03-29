'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { InitiativeConfig } from '@/lib/intent-config';
import { scrollToSection } from '@/lib/scroll';
import { ProjectTeaserVideo } from '@/components/video/ProjectTeaserVideo';

interface Props {
  initiative: InitiativeConfig;
  index: number;
}

// Visual illustrations per initiative
function ShelterVisual() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Architectural design sheet preview */}
      <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-xl">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400/80" />
            <div className="w-2 h-2 rounded-full bg-amber-400/80" />
            <div className="w-2 h-2 rounded-full bg-green-400/80" />
          </div>
          <span className="font-body text-white/40 text-[9px] tracking-wide uppercase">
            Sheet A-01 — Modular Solar Cooling Shelter
          </span>
          <span className="font-body text-heat-amber/50 text-[9px]">PDF</span>
        </div>
        <Image
          src="/images/solar-shelter-design.png"
          alt="Architectural drawings for the modular solar cooling shelter — front elevation, side elevation, plan view, and electrical schematic"
          width={2125}
          height={2750}
          className="w-full h-auto opacity-90"
        />
      </div>
      {/* Floating badges */}
      <div className="absolute -bottom-2 -left-2 flex items-center gap-2 bg-deep-slate/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-heat-amber/25 shadow-lg">
        <div className="w-1.5 h-1.5 rounded-full bg-heat-amber animate-pulse" />
        <span className="font-body text-[10px] text-heat-amber font-medium">In Development</span>
      </div>
      <div className="absolute -top-2 -right-2 bg-heat-amber text-white rounded-xl px-3 py-1.5 shadow-lg">
        <div className="font-body text-[9px] font-bold">8&apos; × 12&apos;</div>
        <div className="font-body text-[8px] text-white/70">R-16 Insulated</div>
      </div>
    </div>
  );
}

function AppVisual() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
      {/* Phone frame */}
      <div className="relative w-40 bg-deep-slate rounded-[2rem] border-2 border-white/15 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 pt-3 pb-1 bg-black/30">
          <span className="font-body text-white text-[9px] font-semibold">9:41</span>
          <div className="w-8 h-1.5 bg-white/40 rounded-full" />
        </div>
        {/* Screen */}
        <div className="bg-gradient-to-b from-red-900/80 to-orange-900/60 px-3 pb-4 pt-2">
          <div className="text-center mb-2">
            <div className="font-body text-[9px] text-white/70 font-semibold tracking-wider uppercase mb-1">
              ⚠ Heat Warning
            </div>
            <div className="font-display text-white text-3xl leading-none">112°F</div>
            <div className="font-body text-[9px] text-white/50 mt-0.5">Heat index: 118°F</div>
          </div>
          {/* Items */}
          {['🏛 Library — 0.3mi', '🏪 Albertsons — 0.5mi', '☀️ Solar Shelter — 0.2mi'].map(
            (item, i) => (
              <div
                key={i}
                className="mb-1 bg-white/8 rounded-lg px-2 py-1 font-body text-white text-[8px] border border-white/5"
              >
                {item}
              </div>
            )
          )}
          <div className="mt-2 bg-white text-deep-slate rounded-lg py-1.5 text-center font-body text-[9px] font-bold">
            Find Shelter →
          </div>
        </div>
      </div>
      {/* Floating alert badge */}
      <div className="absolute top-6 right-6 bg-heat-amber rounded-xl px-3 py-2 shadow-lg">
        <div className="font-body text-[9px] text-white font-bold">ALERT</div>
        <div className="font-body text-[8px] text-white/70">3 centers open</div>
      </div>
      <div className="absolute bottom-4 left-6 flex items-center gap-2 bg-sky-blue/15 rounded-full px-3 py-1 border border-sky-blue/25">
        <div className="w-1.5 h-1.5 rounded-full bg-sky-blue animate-pulse" />
        <span className="font-body text-[10px] text-sky-blue font-medium">Beta Soon</span>
      </div>
    </div>
  );
}

function HubVisual() {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
      {/* Balm dashboard mock */}
      <div className="w-full max-w-xs bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-sky-blue-deep/30">
          <span className="font-display text-white text-sm">Balm</span>
          <span className="font-body text-[9px] text-sky-blue/70 font-medium tracking-wide uppercase">Family Control Center</span>
        </div>
        {/* Mental load bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-body text-[9px] text-white/50 uppercase tracking-wider">Mental Load</span>
            <span className="font-body text-[9px] text-heat-amber font-semibold">You: 68%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-heat-amber to-solar-gold rounded-full" style={{ width: '68%' }} />
          </div>
        </div>
        {/* Content */}
        <div className="px-4 pb-4 space-y-2">
          {/* Family members */}
          <div className="flex gap-2 mb-3">
            {['M', 'D', 'E', 'K'].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-sky-blue/20 border border-sky-blue/30 flex items-center justify-center"
              >
                <span className="font-body text-sky-blue text-[10px] font-bold">{l}</span>
              </div>
            ))}
          </div>
          {/* Task items */}
          {[
            { color: 'bg-heat-amber', text: 'Dentist — schedule this week', assigned: 'M' },
            { color: 'bg-sky-blue', text: 'School pickup — 3:30pm', assigned: 'D' },
            { color: 'bg-solar-gold', text: 'Groceries synced ✓', assigned: 'K' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.color}`} />
              <span className="font-body text-white/60 text-[10px] flex-1">{item.text}</span>
              <span className="font-body text-[9px] text-white/30">{item.assigned}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-sky-blue-deep/20 rounded-full px-3 py-1 border border-sky-blue/25">
        <div className="w-1.5 h-1.5 rounded-full bg-sky-blue animate-pulse" />
        <span className="font-body text-[10px] text-sky-blue font-medium">Live — Free to Join</span>
      </div>
    </div>
  );
}

const VISUALS = [ShelterVisual, AppVisual, HubVisual];

const STATUS_STYLES: Record<InitiativeConfig['statusType'], string> = {
  development: 'bg-heat-amber/10 text-heat-amber border-heat-amber/20',
  beta: 'bg-sky-blue/10 text-sky-blue border-sky-blue/20',
  'coming-soon': 'bg-white/5 text-white/50 border-white/10',
};

export default function InitiativeCard({ initiative, index }: Props) {
  const Visual = VISUALS[index] ?? VISUALS[0];
  const isReversed = index % 2 !== 0;

  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center initiative-row reveal`}>
      {/* Text side */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        <div className="flex items-baseline gap-4 mb-6">
          <span className="watermark-num opacity-80" aria-hidden="true">
            {initiative.number}
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-body font-medium mb-5 ${
            STATUS_STYLES[initiative.statusType]
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {initiative.status}
        </div>

        <h3 className="display-text text-deep-slate mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          {initiative.name}
        </h3>

        <p className="display-italic text-heat-amber text-xl mb-6">{initiative.tagline}</p>

        <p className="font-body text-slate-medium leading-relaxed mb-8">
          {initiative.description}
        </p>

        {/* Crisis context — if available */}
        {initiative.crisisContext && (
          <div className="bg-heat-amber/6 border border-heat-amber/15 rounded-xl px-5 py-4 mb-8">
            <p className="font-body text-charcoal text-sm leading-relaxed italic">
              {initiative.crisisContext}
            </p>
          </div>
        )}

        {/* Performance stats — if available */}
        {initiative.performanceStats && initiative.performanceStats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {initiative.performanceStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-deep-slate/5 border border-charcoal/8 rounded-xl px-3 py-3 text-center"
              >
                <div className="font-display text-heat-amber text-xl font-bold leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-slate-medium text-[10px] leading-tight uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <ul className="space-y-2.5 mb-10">
          {initiative.details.map((detail) => (
            <li key={detail} className="flex items-start gap-3 font-body text-sm text-charcoal">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-heat-amber shrink-0" />
              {detail}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3">
          {initiative.primaryAction.href ? (
            <a
              href={initiative.primaryAction.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
            >
              {initiative.primaryAction.label}
              <span className="text-white/70">→</span>
            </a>
          ) : (
            <button
              onClick={() => scrollToSection(initiative.primaryAction.scrollTo ?? '#initiatives')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-sm"
            >
              {initiative.primaryAction.label}
              <span className="text-white/70">→</span>
            </button>
          )}
          <Link
            href={initiative.experienceHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-charcoal/25 text-charcoal hover:border-heat-amber/50 hover:text-heat-amber font-body text-sm font-medium transition-colors duration-200"
          >
            <span aria-hidden="true">▶</span>
            {initiative.experienceLabel}
          </Link>
        </div>
      </div>

      {/* Visual side */}
      <div
        className={`initiative-visual bg-deep-slate rounded-3xl overflow-hidden p-6 lg:p-10 ${
          isReversed ? 'lg:order-1' : ''
        }`}
      >
        <ProjectTeaserVideo projectId={initiative.id}>
          <Visual />
        </ProjectTeaserVideo>
      </div>
    </div>
  );
}
