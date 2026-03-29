'use client';
/**
 * Solar Shelter Experience — Fallback Component
 *
 * Rendered when:
 *   - Device is lite tier (no canvas support)
 *   - prefers-reduced-motion is active
 *   - WebGL unavailable (not used but required by interface)
 *   - Scene throws an error
 *
 * Must render synchronously. Must not throw. Must never depend on assets.
 * Visually approximates the heat theme using CSS only.
 */

import { Sun, MapPin, Zap, Shield, ArrowRight } from 'lucide-react';
import type { FallbackProps } from '../../types/core';

const stats = [
  { value: '480+', label: 'Heat deaths in Maricopa County, 2023' },
  { value: '8′×12′', label: 'Enclosed, air-conditioned shelter unit' },
  { value: '100%', label: 'Solar-powered — zero grid dependency' },
  { value: '12', label: 'People sheltered per unit simultaneously' },
];

const features = [
  { icon: Sun, label: 'Solar-Powered', desc: 'Rooftop PV panels generate all power on-site.' },
  { icon: Zap, label: 'Always Cooling', desc: 'Enclosed AC interior — not partial shade, real relief.' },
  { icon: Shield, label: 'ADA Compliant', desc: 'Every community member can access life-saving cooling.' },
  { icon: MapPin, label: 'Sited for Impact', desc: 'Near bus stops and high-exposure pedestrian corridors.' },
];

export function SolarShelterFallback({ reason }: FallbackProps) {
  return (
    <div
      className="w-full min-h-screen bg-slate-950 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 60% at 60% 20%, rgba(249,115,22,0.06) 0%, #020408 60%)',
      }}
    >
      {/* Subtle circuit grid */}
      <div className="absolute inset-0 circuit-grid opacity-30" aria-hidden="true" />

      {/* Ambient glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-6 py-24 flex flex-col gap-16">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 rounded-full px-4 py-1.5 text-sm font-mono tracking-wider mb-6">
            <Sun className="w-4 h-4" aria-hidden="true" />
            SOLAR HEAT RELIEF SHELTER
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-none mb-4">
            115°F.
          </h1>
          <p className="text-2xl sm:text-3xl text-slate-400 font-light mb-2">
            Not a warning. A daily reality.
          </p>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Phoenix summers are lethal for the most vulnerable. Fox Haven is deploying
            a network of enclosed, solar-powered cooling shelters designed to save lives.
          </p>

          {reason === 'reduced-motion' && (
            <p className="mt-4 text-xs text-slate-600 font-mono" role="status">
              [ REDUCED MOTION — STATIC VERSION ]
            </p>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.value}
              className="glass-card border border-orange-500/10 rounded-2xl p-5 text-center hud-corners"
            >
              <div className="text-2xl sm:text-3xl font-black text-orange-400 mb-1">{s.value}</div>
              <div className="text-slate-500 text-xs leading-snug font-mono">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="glass-card border border-white/5 hover:border-orange-500/20 rounded-2xl p-5 flex gap-4 transition-colors card-hover"
            >
              <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-orange-400" aria-hidden="true" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/#solar-shelters"
            className="inline-flex items-center gap-2 btn-neon-orange text-white px-8 py-4 rounded-2xl font-semibold text-base"
          >
            Partner With Us
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-slate-600 text-sm">
            Already underway in Phoenix, AZ.
          </p>
        </div>

      </div>
    </div>
  );
}
