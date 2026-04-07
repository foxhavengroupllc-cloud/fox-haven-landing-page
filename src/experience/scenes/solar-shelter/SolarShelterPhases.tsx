'use client';
/**
 * Solar Shelter Experience — Phase Content Components
 *
 * Each phase renders the narrative content layer over the heat canvas.
 * All content is authored here in one place, separate from rendering logic.
 *
 * Phases:
 *   0 — Problem:  "115°F. No shelter. Heat kills."
 *   1 — Contrast: "What exists today vs. what's needed"
 *   2 — Solution: "The Fox Haven Solar Shelter" (hotspots)
 *   3 — Proof:    "Built for Phoenix. Designed to scale."
 *   4 — Action:   "Be part of the shelter network."
 */

import React from 'react';
import {
  Sun, MapPin, Zap, Shield, Wind, Users,
  ThermometerSun, ArrowRight, ChevronDown,
} from 'lucide-react';
import { HotspotLayer } from '../../modules/hotspots/HotspotLayer';
import { AnimatedCounter } from '../../modules/animated-counter/AnimatedCounter';
import type { PhaseTransitionState } from '../../modules/narrative/NarrativeSequencer';

// ─── Shared Utilities ─────────────────────────────────────────────────────────

function PhaseWrapper({
  transitionState,
  children,
  className = '',
}: {
  transitionState: PhaseTransitionState;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-full flex flex-col transition-all duration-400 ${
        transitionState === 'entering'
          ? 'opacity-0 translate-y-4'
          : transitionState === 'exiting'
          ? 'opacity-0 -translate-y-4'
          : 'opacity-100 translate-y-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Phase 0: Problem ─────────────────────────────────────────────────────────

export function Phase0Problem({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">

        {/* Location badge */}
        <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-8">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          PHOENIX · ARIZONA · JULY · 2:00 PM
        </div>

        {/* Headline temperature */}
        <h1
          className="font-black leading-none mb-4 gradient-text"
          style={{ fontSize: 'clamp(5rem, 20vw, 14rem)' }}
        >
          115°F
        </h1>

        <p className="text-2xl sm:text-3xl text-white font-light mb-3">
          Not a warning. A daily reality.
        </p>
        <p className="text-slate-400 text-base sm:text-lg max-w-lg mb-12">
          Extreme heat is the leading weather-related killer in America. Phoenix is its epicenter.
        </p>

        {/* Stat row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { value: '480+', label: 'heat deaths · Maricopa County · 2023' },
            { value: '108', label: 'days above 100°F · average Phoenix year' },
            { value: '0', label: 'adequate public cooling shelters · within walking distance' },
          ].map((s) => (
            <div
              key={s.value}
              className="bg-black/40 backdrop-blur border border-orange-500/20 rounded-2xl px-5 py-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-orange-400">{s.value}</div>
              <div className="text-slate-500 text-xs mt-1 font-mono">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Advance hint */}
        <p className="text-slate-600 text-xs font-mono tracking-wider flex items-center gap-2">
          <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
          CONTINUE TO SEE THE CONTRAST
          <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
        </p>
      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 1: Contrast ────────────────────────────────────────────────────────

export function Phase1Contrast({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-10">
          <div className="text-orange-400 font-mono text-xs tracking-widest mb-3">
            THE GAP · WHAT EXISTS VS. WHAT IS NEEDED
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            A bus stop is not a shelter.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl w-full">

          {/* Current: Inadequate */}
          <div className="bg-red-950/40 backdrop-blur border border-red-500/20 rounded-3xl p-7 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs font-mono text-red-400/60 tracking-wider">
              EXISTING
            </div>
            <div className="w-10 h-10 bg-red-500/15 border border-red-500/20 rounded-xl flex items-center justify-center mb-4">
              <ThermometerSun className="w-5 h-5 text-red-400" aria-hidden="true" />
            </div>
            <h3 className="text-white font-bold text-lg mb-4">Bus Stop / Shade Structure</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                '~30 min before surfaces reach 130°F+',
                'Partial overhead shade only',
                '1–2 people maximum',
                'No cooling — radiates heat',
                'No power, no water access',
                'No overnight capacity',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-400">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Needed: Fox Haven */}
          <div className="bg-emerald-950/30 backdrop-blur border border-orange-500/25 rounded-3xl p-7 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-xs font-mono text-orange-400/60 tracking-wider">
              FOX HAVEN
            </div>
            <div className="w-10 h-10 bg-orange-500/15 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <Wind className="w-5 h-5 text-orange-400" aria-hidden="true" />
            </div>
            <h3 className="text-white font-bold text-lg mb-4">Solar Cooling Shelter</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                '72–78°F interior — genuine AC cooling',
                'Fully enclosed 8′×12′ structure',
                'Up to 12 people simultaneously',
                '100% solar — runs day and night',
                'Emergency charging stations',
                'ADA accessible, always open',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300">
                  <span className="text-orange-400 mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-slate-600 text-sm text-center mt-8 max-w-md">
          The gap between what exists and what is adequate is the gap between survival and suffering.
        </p>
      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 2: Solution ────────────────────────────────────────────────────────

const SHELTER_HOTSPOTS = [
  {
    id: 'solar',
    x: 50,
    y: 14,
    label: 'Solar Panel Array',
    description:
      'Rooftop monocrystalline PV panels generate sufficient power to run the AC unit, LED lighting, and charging stations continuously — day and night via battery storage.',
    icon: <Sun className="w-4 h-4" />,
  },
  {
    id: 'ac',
    x: 82,
    y: 52,
    label: 'HVAC Cooling Unit',
    description:
      'A mini-split AC system maintains 72–78°F inside regardless of exterior temperature. Capacity: 9,000 BTU — sufficient for the 8′×12′ enclosed space at full occupancy.',
    icon: <Wind className="w-4 h-4" />,
  },
  {
    id: 'charging',
    x: 30,
    y: 68,
    label: 'Emergency Charging',
    description:
      'Free USB-A, USB-C, and standard power outlets keep residents connected to emergency services and family. All power is solar-sourced — zero utility cost.',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'access',
    x: 20,
    y: 85,
    label: 'ADA Accessibility',
    description:
      'Designed to full ADA standards: ramped entry, 36″ minimum door width, interior turning radius, tactile paving markers. Every community member can access cooling.',
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: 'sensor',
    x: 68,
    y: 28,
    label: 'Occupancy Sensor',
    description:
      'IoT sensor reports occupancy count and interior temperature to the Fox Haven monitoring dashboard in real time — enabling dispatch coordination during heat emergencies.',
    icon: <Users className="w-4 h-4" />,
  },
];

function ShelterDiagram() {
  return (
    <svg
      viewBox="0 0 300 220"
      className="w-full max-w-sm mx-auto"
      aria-label="Solar shelter schematic diagram"
      role="img"
    >
      {/* Ground */}
      <line x1="20" y1="195" x2="280" y2="195" stroke="#334155" strokeWidth="1.5" />

      {/* Shelter body */}
      <rect x="60" y="100" width="180" height="95" rx="4"
        fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.4)" strokeWidth="1.5" />

      {/* Slanted roof */}
      <polygon
        points="50,100 150,55 250,100"
        fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.5)" strokeWidth="1.5" />

      {/* Solar panels on roof */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={75 + i * 38}
          y={63 + i * 4}
          width="32"
          height="22"
          rx="2"
          fill="rgba(249,115,22,0.12)"
          stroke="rgba(249,115,22,0.6)"
          strokeWidth="1"
        />
      ))}
      {/* Panel grid lines */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`vl-${i}`} x1={91 + i * 38} y1={63 + i * 4} x2={91 + i * 38} y2={85 + i * 4}
          stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" />
      ))}

      {/* Door */}
      <rect x="120" y="145" width="40" height="50" rx="3"
        fill="rgba(0,0,0,0.3)" stroke="rgba(249,115,22,0.35)" strokeWidth="1" />
      {/* Door handle */}
      <circle cx="154" cy="170" r="2" fill="rgba(249,115,22,0.6)" />

      {/* ADA ramp */}
      <polygon points="115,195 130,195 120,160" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />

      {/* AC unit */}
      <rect x="238" y="128" width="24" height="36" rx="3"
        fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.4)" strokeWidth="1" />
      {/* AC vents */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`ac-${i}`} x1="241" y1={136 + i * 7} x2="259" y2={136 + i * 7}
          stroke="rgba(6,182,212,0.4)" strokeWidth="0.75" />
      ))}

      {/* Occupancy sensor (top right of roof) */}
      <circle cx="218" cy="76" r="4" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.5)" strokeWidth="1" />
      <circle cx="218" cy="76" r="2" fill="rgba(6,182,212,0.5)" />

      {/* Charging port symbols (interior left) */}
      <text x="80" y="172" fontSize="10" fill="rgba(249,115,22,0.5)" fontFamily="monospace">⚡</text>

      {/* Label */}
      <text x="150" y="212" fontSize="7" fill="#475569" textAnchor="middle" fontFamily="monospace">
        FOX HAVEN SOLAR SHELTER · 8′×12′ · ADA · SOLAR
      </text>
    </svg>
  );
}

export function Phase2Solution({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-8">
          <div className="text-orange-400 font-mono text-xs tracking-widest mb-3">
            INITIATIVE 01 · SOLAR HEAT RELIEF
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3">
            The Fox Haven Solar Shelter
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Solar-powered. Sensor-managed. Always open.
            Tap any element to learn how it works.
          </p>
        </div>

        {/* Diagram + hotspots */}
        <div className="relative w-full max-w-sm mx-auto">
          <ShelterDiagram />
          <HotspotLayer
            hotspots={SHELTER_HOTSPOTS}
            visible={true}
            className="!inset-[5%]"
          />
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 3: Proof ───────────────────────────────────────────────────────────

const PROOF_METRICS = [
  {
    prefix: '',
    value: 37,
    suffix: '°F',
    label: 'Average temperature reduction inside vs. outside during peak heat',
    accentClass: 'text-orange-400',
  },
  {
    prefix: 'Up to ',
    value: 12,
    suffix: ' people',
    label: 'Simultaneous capacity per shelter unit',
    accentClass: 'text-cyan-400',
  },
  {
    prefix: '',
    value: 100,
    suffix: '%',
    label: 'Solar-powered — zero ongoing utility cost',
    accentClass: 'text-orange-400',
  },
  {
    prefix: '',
    value: 50,
    suffix: '+ sites',
    label: 'Planned Maricopa County deployment within 24 months',
    accentClass: 'text-cyan-400',
  },
];

export function Phase3Proof({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-10">
          <div className="text-orange-400 font-mono text-xs tracking-widest mb-3">
            DATA · PERFORMANCE · SCALE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
            Built for Phoenix. Designed to scale.
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Real numbers from engineering design, pilot deployment, and county planning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl w-full">
          {PROOF_METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-black/40 backdrop-blur border border-white/8 rounded-2xl p-6 hud-corners"
            >
              <div className={`text-3xl sm:text-4xl font-black mb-2 ${m.accentClass}`}>
                {m.prefix}
                <AnimatedCounter target={m.value} />
                {m.suffix}
              </div>
              <div className="text-slate-500 text-xs leading-relaxed font-mono">{m.label}</div>
            </div>
          ))}
        </div>

        <p className="text-slate-700 text-xs text-center mt-8 font-mono">
          PILOT DATA · MARICOPA COUNTY PLANNING DOCS · FOX HAVEN ENGINEERING SPECS
        </p>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 4: Action ──────────────────────────────────────────────────────────

export function Phase4Action({
  transitionState,
  onBack,
}: {
  transitionState: PhaseTransitionState;
  onBack: () => void;
}) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">

        <div className="w-16 h-16 bg-orange-500/15 border border-orange-500/30 rounded-2xl flex items-center justify-center mb-8 mx-auto">
          <Sun className="w-8 h-8 text-orange-400" aria-hidden="true" />
        </div>

        <div className="text-orange-400 font-mono text-xs tracking-widest mb-4">
          PHOENIX · DEPLOYING NOW
        </div>

        <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">
          Be part of the<br />
          <span className="gradient-text">first shelter network.</span>
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-lg mb-2">
          Fox Haven is actively deploying Solar Cooling Shelters across Phoenix and Maricopa County.
        </p>
        <p className="text-slate-500 text-sm max-w-md mb-12">
          We partner with municipalities, nonprofits, and community organizations to site, fund, and operate units where heat exposure risk is highest.
        </p>

        {/* Partner CTA */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/#contact"
            className="btn-neon-orange text-white px-8 py-4 rounded-2xl font-semibold text-base flex items-center gap-2"
          >
            Partner With Us
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 cursor-pointer"
          >
            ← Back to Solar Shelters overview
          </button>
        </div>

        <div className="mt-12 flex items-center gap-3 text-slate-700 text-xs font-mono">
          <MapPin className="w-3 h-3 text-orange-400/50" aria-hidden="true" />
          Already underway in Phoenix, AZ
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase Navigation Bar ─────────────────────────────────────────────────────

const PHASE_LABELS = ['Problem', 'Contrast', 'Solution', 'Proof', 'Action'];

export function PhaseNavigation({
  phase,
  totalPhases,
  canGoPrev,
  canGoNext,
  isTransitioning,
  onPrev,
  onNext,
  onGoTo,
}: {
  phase: number;
  totalPhases: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  isTransitioning: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}) {
  return (
    <div
      className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 pointer-events-none"
      role="navigation"
      aria-label="Experience navigation"
    >
      {/* Phase dots */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {Array.from({ length: totalPhases }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            disabled={isTransitioning}
            aria-label={`Go to ${PHASE_LABELS[i] ?? `phase ${i + 1}`}`}
            aria-current={i === phase ? 'step' : undefined}
            className={`
              transition-all duration-300 rounded-full cursor-pointer disabled:cursor-default
              ${i === phase
                ? 'w-8 h-2.5 bg-orange-500'
                : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
              }
            `}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center gap-6 pointer-events-auto">
        {canGoPrev && (
          <button
            onClick={onPrev}
            disabled={isTransitioning}
            className="text-slate-300 hover:text-white text-sm font-mono tracking-wider transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            ← PREV
          </button>
        )}
        <span className="text-slate-400 text-sm font-mono font-medium">
          {PHASE_LABELS[phase]?.toUpperCase() ?? ''}
        </span>
        {canGoNext && (
          <button
            onClick={onNext}
            disabled={isTransitioning}
            className="text-slate-300 hover:text-white text-sm font-mono tracking-wider transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
