'use client';
/**
 * Heat Relief App Experience, Phase Content Components
 *
 * Each phase renders the narrative content layer over the city-grid canvas.
 * All content is authored here, separate from rendering logic.
 *
 * Phases:
 *   0, Emergency:  "116°F. No shelter. Find one now."
 *   1, Discovery:  "17 cooling centers found within 1 mile."
 *   2, Navigate:   "Closest route: 4 minutes on foot."
 *   3, Decide:     "Filter. Compare. Check capacity."
 *   4, Act:        "Download. Find. Stay cool."
 *
 * Color primary: cyan (#06b6d4), contrast with shelter's orange.
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  AlertTriangle, MapPin, Navigation, Filter, Download,
  Clock, Users, Zap, ChevronRight, ArrowRight, CheckCircle,
} from 'lucide-react';
import { PhoneMockup } from '../../modules/phone-mockup/PhoneMockup';
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

// ─── Phase 0: Emergency ───────────────────────────────────────────────────────

// Demo fallback values shown while loading or if the weather API is unavailable
const DEMO: {
  temp: number; feelsLike: number; heatRisk: string;
  safeMinutes: number; hasAlert: boolean; alertTitle: string; alertArea: string;
} = {
  temp: 116, feelsLike: 118, heatRisk: 'DANGEROUS',
  safeMinutes: 20, hasAlert: true,
  alertTitle: 'EXTREME HEAT ALERT', alertArea: 'MARICOPA COUNTY',
};

// Colour palette driven by heat risk level
const RISK_STYLES: Record<string, { label: string; color: string; border: string; tempGrad: string }> = {
  EXTREME:   { label: 'EXTREME',   color: 'text-red-400',    border: 'border-red-500/40',   tempGrad: 'linear-gradient(135deg,#dc2626 0%,#ef4444 50%,#dc2626 100%)' },
  DANGEROUS: { label: 'DANGEROUS', color: 'text-red-400',    border: 'border-red-500/40',   tempGrad: 'linear-gradient(135deg,#ef4444 0%,#f97316 50%,#ef4444 100%)' },
  HIGH:      { label: 'HIGH',      color: 'text-orange-400', border: 'border-orange-500/40', tempGrad: 'linear-gradient(135deg,#f97316 0%,#fb923c 50%,#f97316 100%)' },
  MODERATE:  { label: 'MODERATE',  color: 'text-amber-400',  border: 'border-amber-500/40', tempGrad: 'linear-gradient(135deg,#f59e0b 0%,#fbbf24 50%,#f59e0b 100%)' },
  NORMAL:    { label: 'NORMAL',    color: 'text-emerald-400',border: 'border-emerald-500/30',tempGrad: 'linear-gradient(135deg,#10b981 0%,#34d399 50%,#10b981 100%)' },
};

export function Phase0Emergency({ transitionState }: { transitionState: PhaseTransitionState }) {
  // ── Live weather state ──────────────────────────────────────────────────────
  const [wx, setWx] = useState<typeof DEMO | null>(null);
  const [clockStr, setClockStr] = useState('');

  // Fetch live Phoenix weather on mount
  useEffect(() => {
    fetch('/api/weather')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || data.error) return;
        setWx({
          temp:        data.temp,
          feelsLike:   data.feelsLike,
          heatRisk:    data.heatRisk,
          safeMinutes: data.safeOutdoorMinutes,
          hasAlert:    data.hasHeatAlert,
          alertTitle:  data.alertTitle ?? 'HEAT ADVISORY',
          alertArea:   data.alertArea   ?? 'MARICOPA COUNTY',
        });
      })
      .catch(() => {}); // silently fall back to DEMO values
  }, []);

  // Live Phoenix clock, updates every minute
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleString('en-US', {
        timeZone: 'America/Phoenix',
        month: 'short', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true,
      }).toUpperCase();
    setClockStr(fmt());
    const id = setInterval(() => setClockStr(fmt()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Resolved values, live data if available, demo fallback otherwise
  const d = wx ?? DEMO;
  const risk = RISK_STYLES[d.heatRisk] ?? RISK_STYLES.DANGEROUS;
  const isLoading = wx === null;

  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">

        {/* Alert badge */}
        {d.hasAlert ? (
          <div className={`inline-flex items-center gap-2 border ${risk.border} bg-red-500/12 ${risk.color} rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-8 animate-pulse`}>
            <AlertTriangle className="w-3 h-3" aria-hidden="true" />
            {d.alertTitle.toUpperCase()} · ACTIVE · {d.alertArea.toUpperCase()}
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800/50 text-slate-400 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-8">
            <Clock className="w-3 h-3" aria-hidden="true" />
            CURRENT CONDITIONS · PHOENIX, AZ
          </div>
        )}

        {/* Temperature */}
        <h1
          className={`font-black leading-none mb-4 transition-opacity duration-500 ${isLoading ? 'opacity-40' : 'opacity-100'}`}
          aria-label={`${d.temp} degrees Fahrenheit`}
        >
          <span
            style={{
              fontSize: 'clamp(4.5rem, 18vw, 12rem)',
              display: 'inline-block',
              lineHeight: 1,
              color: '#f59e0b',
              backgroundImage: risk.tempGrad,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {d.temp}°F
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-white font-light mb-2">
          Heat index:{' '}
          <span className={`font-semibold ${risk.color}`}>{risk.label}</span>
          {d.feelsLike !== d.temp && (
            <span className="text-slate-500 text-base font-normal ml-2">
              (feels {d.feelsLike}°F)
            </span>
          )}
        </p>
        <p className="text-slate-500 text-sm sm:text-base max-w-sm mb-10 font-mono">
          PHOENIX · AZ{clockStr ? ` · ${clockStr}` : ''}
          {isLoading && (
            <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse align-middle" />
          )}
        </p>

        {/* Urgency stats */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            {
              value: d.safeMinutes < 60 ? `${d.safeMinutes} min` : `${d.safeMinutes / 60}h`,
              label: 'safe outdoor exposure remaining',
            },
            { value: '4,800+', label: 'active heat warnings in county' },
            { value: '0',      label: 'cooling centers visible without an app' },
          ].map((s) => (
            <div
              key={s.label}
              className={`bg-black/50 backdrop-blur border ${risk.border} rounded-2xl px-5 py-4 text-center`}
            >
              <div className={`text-xl sm:text-2xl font-black ${risk.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs mt-1 font-mono leading-snug">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-cyan-500/60 text-xs font-mono tracking-widest flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" aria-hidden="true" />
          SCANNING FOR COOLING CENTERS NEAR YOU
        </p>

        {/* Live data attribution */}
        {wx && (
          <p className="text-slate-800 text-[10px] font-mono mt-4">
            LIVE · OPEN-METEO + NWS · UPDATED{' '}
            {new Date().toLocaleTimeString('en-US', { timeZone: 'America/Phoenix', hour: 'numeric', minute: '2-digit', hour12: true })}
          </p>
        )}

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 1: Discovery ───────────────────────────────────────────────────────

const NEARBY_CENTERS = [
  { name: 'Burton Barr Central Library', dist: '0.3mi', status: 'Open', hours: 'Open until 9:00 PM' },
  { name: 'Maryvale Community Center', dist: '0.5mi', status: 'Open', hours: 'Open until midnight' },
  { name: 'S. Mountain Park Visitor Ctr', dist: '0.8mi', status: 'Open', hours: 'Open until 6:00 PM' },
  { name: 'Thomas Rd Community Church', dist: '1.1mi', status: 'Open', hours: 'Open until 10:00 PM' },
];

export function Phase1Discovery({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-8">
          <div className="text-cyan-400 font-mono text-xs tracking-widest mb-3">
            SCANNING AREA · HEAT RELIEF APP
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            <AnimatedCounter target={17} /> cooling centers found.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Open now · Within 1 mile · Verified today
          </p>
        </div>

        {/* Resource list */}
        <div className="w-full max-w-lg space-y-2.5 mb-8">
          {NEARBY_CENTERS.map((c, i) => (
            <div
              key={c.name}
              className="bg-black/40 backdrop-blur border border-cyan-500/15 rounded-2xl px-5 py-3.5 flex items-center justify-between"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-500/12 border border-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium leading-snug">{c.name}</div>
                  <div className="text-slate-500 text-xs font-mono">{c.hours}</div>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <div className="text-cyan-400 text-sm font-bold">{c.dist}</div>
                <div className="text-emerald-400 text-xs font-mono">{c.status}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-xs text-center font-mono">
          +13 more within 2 miles · Updated 3 minutes ago
        </p>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 2: Navigate ────────────────────────────────────────────────────────

const ROUTE_STEPS = [
  { step: '1', text: 'Head east on W. McDowell Rd', dist: '0.1 mi' },
  { step: '2', text: 'Turn left on N. 12th Ave', dist: '0.1 mi' },
  { step: '3', text: 'Arrive: Burton Barr Library', dist: 'Destination' },
];

export function Phase2Navigate({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-8">
          <div className="text-cyan-400 font-mono text-xs tracking-widest mb-3">
            ROUTING · NEAREST CENTER
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
            4 minutes away.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Burton Barr Central Library · Air conditioned · Free · Open now
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 w-full max-w-2xl">

          {/* Phone showing navigation */}
          <PhoneMockup
            statusTime="14:47"
            ariaLabel="App showing navigation route"
            width="190px"
            glowClass="drop-shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            screenClassName="bg-slate-950"
          >
            <div className="p-3 h-full flex flex-col">
              {/* Map area (simulated) */}
              <div className="flex-1 bg-[#0a1628] rounded-xl mb-2 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                  aria-hidden="true"
                />
                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <polyline
                    points="30,120 100,120 100,40"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="5,3"
                    opacity="0.8"
                  />
                  {/* User dot */}
                  <circle cx="30" cy="120" r="5" fill="white" />
                  <circle cx="30" cy="120" r="3" fill="#06b6d4" />
                  {/* Destination */}
                  <circle cx="100" cy="40" r="6" fill="#06b6d4" opacity="0.9" />
                  <circle cx="100" cy="40" r="10" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.4" />
                </svg>
              </div>
              {/* ETA bar */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-3 py-2 flex items-center justify-between">
                <div>
                  <div className="text-cyan-400 text-xs font-black">4 min</div>
                  <div className="text-slate-500 text-[9px] font-mono">0.3 mi walk</div>
                </div>
                <Navigation className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              </div>
            </div>
          </PhoneMockup>

          {/* Turn-by-turn */}
          <div className="flex-1 space-y-3 w-full sm:w-auto">
            {ROUTE_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-black/40 backdrop-blur border border-cyan-500/12 rounded-2xl px-5 py-3.5 flex items-center gap-4"
              >
                <div className="w-7 h-7 bg-cyan-500/15 border border-cyan-500/25 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-cyan-400 text-xs font-bold">{step.step}</span>
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm">{step.text}</div>
                </div>
                <div className="text-slate-500 text-xs font-mono shrink-0">{step.dist}</div>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-4 px-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="text-emerald-400 text-xs font-mono">
                Offline route cached · Works without cell service
              </span>
            </div>
          </div>
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 3: Decide ──────────────────────────────────────────────────────────

const COMPARISON_CENTERS = [
  {
    name: 'Burton Barr Library',
    dist: '0.3mi',
    capacity: { current: 45, max: 50 },
    hours: 'Until 9 PM',
    tags: ['ADA', 'Charging', 'Water'],
    accentClass: 'border-cyan-500/30 bg-cyan-500/5',
    barClass: 'bg-cyan-400',
    recommended: true,
  },
  {
    name: 'Maryvale Community Ctr',
    dist: '0.5mi',
    capacity: { current: 18, max: 80 },
    hours: 'Until Midnight',
    tags: ['ADA', 'Kids', 'Meals'],
    accentClass: 'border-white/10 bg-white/3',
    barClass: 'bg-slate-400',
    recommended: false,
  },
  {
    name: 'S. Mountain Visitor Ctr',
    dist: '0.8mi',
    capacity: { current: 5, max: 20 },
    hours: 'Until 6 PM',
    tags: ['Outdoor'],
    accentClass: 'border-white/8 bg-white/2',
    barClass: 'bg-slate-600',
    recommended: false,
  },
];

const FILTERS = ['Open Now', 'ADA', 'Charging', 'Kids'];

/** Returns true if a center satisfies ALL active filters. */
function centerMatchesFilters(
  center: (typeof COMPARISON_CENTERS)[number],
  active: Set<string>,
): boolean {
  if (active.size === 0) return true;
  for (const f of active) {
    if (f === 'Open Now') continue; // all displayed centers are open
    if (!center.tags.includes(f)) return false;
  }
  return true;
}

export function Phase3Decide({
  transitionState,
  onSelectCenter,
}: {
  transitionState: PhaseTransitionState;
  /** Called when the user picks a center, advances the experience to Phase 4. */
  onSelectCenter: () => void;
}) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const toggleFilter = useCallback((f: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  }, []);

  const visible = COMPARISON_CENTERS.filter((c) =>
    centerMatchesFilters(c, activeFilters),
  );

  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-7">
          <div className="text-cyan-400 font-mono text-xs tracking-widest mb-3">
            FILTER · COMPARE · CHOOSE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Compare what&rsquo;s near you.
          </h2>
          <p className="text-slate-400 text-sm">
            Real-time capacity · Confirmed hours · Accessibility data
          </p>
        </div>

        {/* ── Filter chips ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 justify-center mb-6" role="group" aria-label="Filter cooling centers">
          {FILTERS.map((f) => {
            const on = activeFilters.has(f);
            return (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                aria-pressed={on}
                className={`rounded-full px-3 py-1 text-xs font-mono border transition-all duration-200 cursor-pointer
                  ${on
                    ? 'bg-cyan-500 border-cyan-500 text-black font-bold'
                    : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50'
                  }`}
              >
                {on ? '✓ ' : ''}{f}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              onClick={() => setActiveFilters(new Set())}
              className="rounded-full px-3 py-1 text-xs font-mono border border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Comparison cards ──────────────────────────────────────────── */}
        {visible.length > 0 ? (
          <div className="grid sm:grid-cols-3 gap-4 w-full max-w-3xl">
            {visible.map((c) => {
              const pct = Math.round((c.capacity.current / c.capacity.max) * 100);
              const almostFull = pct >= 80;
              return (
                <button
                  key={c.name}
                  onClick={onSelectCenter}
                  className={`border rounded-2xl p-5 relative text-left cursor-pointer group
                    transition-all duration-200
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50
                    ${c.accentClass}
                    ${c.recommended ? 'hover:border-cyan-500/60' : 'hover:border-white/25'}`}
                  aria-label={`Select ${c.name}, ${c.dist}, ${c.hours}`}
                >
                  {c.recommended && (
                    <div className="absolute -top-2.5 left-4 bg-cyan-500 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full font-mono">
                      CLOSEST
                    </div>
                  )}

                  {/* Header row */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-white font-semibold text-sm leading-snug mb-0.5 group-hover:text-cyan-100 transition-colors">
                        {c.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-cyan-400">{c.dist}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{c.hours}</span>
                      </div>
                    </div>
                    {/* Arrow, appears on hover */}
                    <Navigation
                      className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-500">Capacity</span>
                      <span className={almostFull ? 'text-amber-400' : 'text-slate-400'}>
                        {c.capacity.current}/{c.capacity.max}
                        {almostFull && ' ⚠'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${c.barClass} rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Tags, clicking activates that filter */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((t) => {
                      const tagActive = activeFilters.has(t);
                      const isFilterable = FILTERS.includes(t);
                      return (
                        <span
                          key={t}
                          onClick={isFilterable ? (e) => { e.stopPropagation(); toggleFilter(t); } : undefined}
                          role={isFilterable ? 'button' : undefined}
                          aria-pressed={isFilterable ? tagActive : undefined}
                          className={`text-[9px] font-mono rounded px-1.5 py-0.5 transition-all duration-150
                            ${tagActive
                              ? 'bg-cyan-500 text-black border border-cyan-500 font-bold'
                              : isFilterable
                                ? 'text-cyan-400/80 border border-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 cursor-pointer'
                                : 'text-slate-400 border border-white/8'
                            }`}
                        >
                          {t}
                        </span>
                      );
                    })}
                  </div>

                  {/* "Get directions" hint */}
                  <div className="mt-3 text-[9px] font-mono text-cyan-400/0 group-hover:text-cyan-400/60 transition-colors">
                    Tap to get directions →
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Empty state when filters match nothing */
          <div className="w-full max-w-3xl border border-white/8 rounded-2xl p-8 text-center bg-white/2">
            <Filter className="w-6 h-6 text-slate-600 mx-auto mb-3" aria-hidden="true" />
            <p className="text-slate-400 text-sm font-mono mb-1">No centers match these filters.</p>
            <button
              onClick={() => setActiveFilters(new Set())}
              className="text-cyan-400 text-xs font-mono underline underline-offset-2 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="text-slate-700 text-xs text-center mt-5 font-mono">
          DATA UPDATED 2 MIN AGO · SOURCE: MARICOPA COUNTY HEAT RESPONSE NETWORK
        </p>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 4: Act ─────────────────────────────────────────────────────────────

export function Phase4Act({
  transitionState,
  onBack,
}: {
  transitionState: PhaseTransitionState;
  onBack: () => void;
}) {
  // Pull live temp so the in-app banner reflects reality
  const [liveTemp, setLiveTemp] = useState<number | null>(null);
  const [liveAlert, setLiveAlert] = useState<boolean>(true);
  useEffect(() => {
    fetch('/api/weather')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d || d.error) return;
        setLiveTemp(d.temp);
        setLiveAlert(d.hasHeatAlert || d.temp >= 100);
      })
      .catch(() => {});
  }, []);

  const displayTemp = liveTemp ?? 116;
  const alertActive = liveAlert;

  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">

        <div className="text-cyan-400 font-mono text-xs tracking-widest mb-6">
          HEAT RELIEF APP · FOX HAVEN · BETA
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-10 mb-10">

          {/* ── Realistic app phone mockup ─────────────────────────────── */}
          <PhoneMockup
            statusTime="14:52"
            ariaLabel="Heat Relief App, live map view showing nearest cooling centers"
            width="210px"
            glowClass="drop-shadow-[0_0_32px_rgba(6,182,212,0.35)]"
            screenClassName="bg-[#07101e]"
          >
            <div className="flex flex-col h-full overflow-hidden">

              {/* ── Heat alert banner ─────────────────────────────────── */}
              <div className={`flex items-center justify-between px-3 py-1.5 shrink-0 ${
                alertActive
                  ? 'bg-red-500/20 border-b border-red-500/30'
                  : 'bg-cyan-500/10 border-b border-cyan-500/15'
              }`}>
                <div className="flex items-center gap-1.5">
                  {alertActive
                    ? <AlertTriangle className="w-2.5 h-2.5 text-red-400 shrink-0" aria-hidden="true" />
                    : <Zap className="w-2.5 h-2.5 text-cyan-400 shrink-0" aria-hidden="true" />
                  }
                  <span className={`text-[8px] font-mono font-bold ${alertActive ? 'text-red-300' : 'text-cyan-400'}`}>
                    {alertActive ? 'HEAT ALERT ACTIVE' : 'CURRENT CONDITIONS'}
                  </span>
                </div>
                <span className={`text-[9px] font-black font-mono ${alertActive ? 'text-red-300' : 'text-cyan-400'}`}>
                  {displayTemp}°F
                </span>
              </div>

              {/* ── Map area ──────────────────────────────────────────── */}
              <div className="relative flex-1 bg-[#0a1628] overflow-hidden" style={{ minHeight: 0 }}>
                {/* City grid */}
                <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <defs>
                    <pattern id="app-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#app-grid)" />

                  {/* Roads */}
                  <line x1="0" y1="55%" x2="100%" y2="55%" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5"/>
                  <line x1="0" y1="30%" x2="100%" y2="30%" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>
                  <line x1="35%" y1="0" x2="35%" y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5"/>
                  <line x1="68%" y1="0" x2="68%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5"/>

                  {/* Route line, user to Burton Barr */}
                  <polyline
                    points="50%,80% 50%,55% 35%,55% 35%,35%"
                    fill="none" stroke="#06b6d4" strokeWidth="1.8"
                    strokeDasharray="3 2" opacity="0.7"
                  />

                  {/* Location pins */}
                  {/* Burton Barr, closest, cyan */}
                  <circle cx="35%" cy="35%" r="5" fill="#06b6d4" opacity="0.9"/>
                  <circle cx="35%" cy="35%" r="8" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4"/>
                  <circle cx="35%" cy="35%" r="11" fill="none" stroke="#06b6d4" strokeWidth="0.5" opacity="0.2"/>

                  {/* Maryvale, cyan dimmer */}
                  <circle cx="72%" cy="28%" r="4" fill="#06b6d4" opacity="0.55"/>
                  <circle cx="72%" cy="28%" r="7" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.25"/>

                  {/* S. Mountain, slate */}
                  <circle cx="80%" cy="68%" r="3.5" fill="#64748b" opacity="0.6"/>

                  {/* User position */}
                  <circle cx="50%" cy="80%" r="4" fill="white" opacity="0.95"/>
                  <circle cx="50%" cy="80%" r="3" fill="#06b6d4" opacity="1"/>
                  <circle cx="50%" cy="80%" r="7" fill="none" stroke="white" strokeWidth="1" opacity="0.35"/>
                </svg>

                {/* Map label overlays */}
                <div className="absolute top-[29%] left-[38%] -translate-y-1/2">
                  <div className="bg-cyan-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    0.3 mi
                  </div>
                </div>
                <div className="absolute top-[22%] left-[74%] -translate-y-1/2">
                  <div className="bg-[#0a1628]/80 text-cyan-400 text-[6px] font-mono px-1 py-0.5 rounded whitespace-nowrap border border-cyan-500/20">
                    0.5 mi
                  </div>
                </div>

                {/* Compass */}
                <div className="absolute top-1.5 right-2 text-[7px] font-mono text-slate-600">N↑</div>
              </div>

              {/* ── Nearest center card ───────────────────────────────── */}
              <div className="shrink-0 bg-[#07101e] border-t border-white/8 px-3 pt-2 pb-1">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <div className="text-[7px] font-mono text-emerald-400 mb-0.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-pulse"/>
                      NEAREST · OPEN NOW
                    </div>
                    <div className="text-white text-[10px] font-bold leading-tight">Burton Barr Library</div>
                    <div className="text-cyan-400 text-[8px] font-mono font-semibold">0.3 mi · 4 min walk</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[7px] font-mono text-slate-500">Capacity</div>
                    <div className="text-amber-400 text-[8px] font-bold">45/50</div>
                    <div className="w-10 h-0.5 bg-white/10 rounded-full mt-0.5 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '90%' }}/>
                    </div>
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex gap-1 mb-1.5">
                  {['ADA', 'Charging', 'Water'].map(t => (
                    <span key={t} className="text-[6px] font-mono text-slate-400 border border-white/10 rounded px-1 py-0.5">{t}</span>
                  ))}
                </div>

                {/* Get directions CTA */}
                <div className="bg-cyan-500 rounded-lg py-1.5 text-center">
                  <span className="text-black text-[8px] font-black font-mono flex items-center justify-center gap-1">
                    <Navigation className="w-2 h-2" aria-hidden="true"/>
                    GET DIRECTIONS
                  </span>
                </div>
              </div>

              {/* ── Bottom nav ────────────────────────────────────────── */}
              <div className="shrink-0 bg-[#050d18] border-t border-white/6 px-2 py-1.5 flex justify-around">
                {[
                  { icon: MapPin,    label: 'Map',     active: true  },
                  { icon: Filter,    label: 'Filter',  active: false },
                  { icon: Clock,     label: 'Alerts',  active: false },
                  { icon: Users,     label: 'Check-in',active: false },
                ].map((n) => (
                  <div key={n.label} className="flex flex-col items-center gap-0.5">
                    <n.icon className={`w-3 h-3 ${n.active ? 'text-cyan-400' : 'text-slate-600'}`} aria-hidden="true"/>
                    <span className={`text-[6px] font-mono ${n.active ? 'text-cyan-400' : 'text-slate-600'}`}>{n.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </PhoneMockup>

          {/* Text */}
          <div className="text-left max-w-sm">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Download.<br />
              Find.<br />
              <span className="text-cyan-400">Stay cool.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
              The Heat Relief App is in beta testing across Phoenix this summer.
              Join the early access list and help us improve resource coverage in your neighborhood.
            </p>

            {/* Feature bullets */}
            <div className="space-y-2 text-sm">
              {[
                '17 verified cooling centers mapped in real time',
                '47-second median time from open to route start',
                'Offline mode, works without cell service',
                'Wellness check-in for family members',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-slate-300">
                  <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-2xl transition-colors text-base"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Join the Beta
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 cursor-pointer"
          >
            ← Back to Heat Relief App overview
          </button>
        </div>

        <div className="mt-10 flex items-center gap-2 text-slate-700 text-xs font-mono">
          <Zap className="w-3 h-3 text-cyan-400/40" aria-hidden="true" />
          Beta · Phoenix, AZ · Summer 2026
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase Navigation Bar ─────────────────────────────────────────────────────

const PHASE_LABELS = ['Emergency', 'Discovery', 'Navigate', 'Decide', 'Act'];

export function AppPhaseNavigation({
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
      {/* Phase dots, cyan accent (vs orange for shelter) */}
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
                ? 'w-8 h-2.5 bg-cyan-500'
                : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
              }
            `}
          />
        ))}
      </div>

      {/* Prev / Next labels */}
      <div className="flex items-center gap-4 pointer-events-auto">
        {canGoPrev && (
          <button
            onClick={onPrev}
            disabled={isTransitioning}
            className="text-slate-600 hover:text-slate-400 text-xs font-mono tracking-wider transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            ← PREV
          </button>
        )}
        <span className="text-slate-800 text-xs font-mono">
          {PHASE_LABELS[phase]?.toUpperCase() ?? ''}
        </span>
        {canGoNext && (
          <button
            onClick={onNext}
            disabled={isTransitioning}
            className="text-slate-400 hover:text-white text-xs font-mono tracking-wider transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-default"
          >
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
