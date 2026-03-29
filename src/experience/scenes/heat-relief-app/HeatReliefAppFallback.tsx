'use client';
/**
 * Heat Relief App Experience — CSS Fallback
 *
 * Rendered synchronously when the Canvas scene cannot run.
 * No canvas, no async, no dynamic imports.
 * Visually coherent with the main site shell.
 *
 * Primary color: cyan (#06b6d4) — inverted from shelter orange.
 */

import { MapPin, Navigation, Filter, Download, Zap, Clock, Users } from 'lucide-react';
import type { FallbackProps } from '../../types/core';

const STATS = [
  { value: '17', label: 'Cooling centers within 1 mile', accent: 'text-cyan-400' },
  { value: '4 min', label: 'Walk time to nearest open center', accent: 'text-cyan-400' },
  { value: '72h', label: 'Operational uptime guarantee per event', accent: 'text-white' },
  { value: '15 min', label: 'Average response time in beta testing', accent: 'text-white' },
];

const FEATURES = [
  {
    icon: Navigation,
    title: 'Real-Time Map',
    desc: 'Nearest cooling centers updated every 5 minutes. Filter by open status, ADA access, or charging.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/15',
  },
  {
    icon: Filter,
    title: 'Smart Filters',
    desc: 'Compare capacity, hours, accessibility, and distance before you commit to a route.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/15',
  },
  {
    icon: Clock,
    title: 'Heat Index Alerts',
    desc: 'Push notifications triggered by NWS extreme heat warnings in your county.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/15',
  },
  {
    icon: Users,
    title: 'Wellness Check-Ins',
    desc: 'Share your safe arrival with family members or a designated contact — no app required on their end.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/15',
  },
  {
    icon: Zap,
    title: 'Offline Mode',
    desc: 'Last-known center locations and cached routes available without cell service.',
    accent: 'text-white',
    border: 'border-white/8',
  },
  {
    icon: Download,
    title: 'Emergency History',
    desc: 'Log heat-related incidents and share anonymized data to improve future resource placement.',
    accent: 'text-white',
    border: 'border-white/8',
  },
];

export function HeatReliefAppFallback({ reason }: FallbackProps) {
  void reason;

  return (
    <div className="relative min-h-screen bg-[#020408] overflow-auto">

      {/* Ambient cyan gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 60% 30%, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-cyan-500/25 bg-cyan-500/8 text-cyan-400 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-8">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            INITIATIVE 02 · HEAT RELIEF APP
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
            Find shelter before<br />
            <span className="text-cyan-400">the heat finds you.</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            The Heat Relief App maps every open cooling center near you in real time — so when a heat
            emergency hits, you spend seconds deciding, not minutes searching.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="bg-white/3 backdrop-blur border border-white/7 rounded-2xl p-5 text-center"
            >
              <div className={`text-2xl sm:text-3xl font-black mb-1 ${s.accent}`}>{s.value}</div>
              <div className="text-slate-500 text-xs leading-relaxed font-mono">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`bg-white/3 backdrop-blur border ${f.border} rounded-2xl p-6 flex gap-4`}
            >
              <div className={`w-10 h-10 bg-cyan-500/10 border border-cyan-500/15 rounded-xl flex items-center justify-center shrink-0`}>
                <f.icon className={`w-5 h-5 ${f.accent}`} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-8 py-4 rounded-2xl transition-colors text-base"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Join the Beta
          </a>
          <p className="text-slate-700 text-xs font-mono mt-4">
            PHOENIX · AZ · BETA LAUNCHING SUMMER 2026
          </p>
        </div>

      </div>
    </div>
  );
}
