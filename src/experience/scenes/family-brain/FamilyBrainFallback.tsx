'use client';
/**
 * Family Brain Experience, CSS Fallback
 *
 * Rendered synchronously when the Canvas scene cannot run.
 * No canvas, no async, no dynamic imports.
 * Purple/blue color register, distinct from shelter (orange) and heat app (cyan).
 */

import {
  Calendar, ShoppingCart, FileText, CreditCard,
  CheckSquare, MessageCircle, Home, ArrowRight, Brain,
} from 'lucide-react';
import type { FallbackProps } from '../../types/core';

const STATS = [
  { value: '6', label: 'life domains unified in one app', accent: 'text-purple-400' },
  { value: '4', label: 'family members synced in real time', accent: 'text-blue-400' },
  { value: '1', label: 'place for every family decision', accent: 'text-purple-400' },
  { value: '0', label: 'more missed appointments or lost lists', accent: 'text-blue-400' },
];

const FEATURES = [
  {
    icon: Calendar,
    title: 'Shared Family Calendar',
    desc: 'One calendar for the whole family, synced across everyone\'s devices with smart scheduling.',
    iconColor: 'text-blue-400',
    border: 'border-blue-500/15',
  },
  {
    icon: ShoppingCart,
    title: 'Smart Grocery Lists',
    desc: 'Collaborative shopping lists with auto-categorization and pantry tracking.',
    iconColor: 'text-green-400',
    border: 'border-green-500/15',
  },
  {
    icon: FileText,
    title: 'Document Vault',
    desc: 'Secure shared storage for family documents, medical records, and important files.',
    iconColor: 'text-purple-400',
    border: 'border-purple-500/15',
  },
  {
    icon: CreditCard,
    title: 'Household Budget',
    desc: 'Track shared expenses, set budgets, and split bills transparently.',
    iconColor: 'text-amber-400',
    border: 'border-amber-500/15',
  },
  {
    icon: CheckSquare,
    title: 'Chore & Task Board',
    desc: 'Assign chores, track completion, and keep everyone accountable.',
    iconColor: 'text-rose-400',
    border: 'border-rose-500/15',
  },
  {
    icon: MessageCircle,
    title: 'Family Messaging',
    desc: 'A private family thread, just your people, no work or social noise.',
    iconColor: 'text-cyan-400',
    border: 'border-cyan-500/15',
  },
];

export function FamilyBrainFallback({ reason }: FallbackProps) {
  void reason;

  return (
    <div className="relative min-h-screen bg-[#020408] overflow-auto">

      {/* Ambient purple/blue gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 40% 30%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 70% 70%, rgba(59,130,246,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 border border-purple-500/25 bg-purple-500/8 text-purple-400 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-8">
            <Home className="w-3 h-3" aria-hidden="true" />
            INITIATIVE 03 · FAMILY BRAIN APP
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
            From chaos to calm.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              One app for all of home.
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            Modern families juggle six different apps, scattered data, and constant context-switching.
            Family Brain brings every piece of your household into one organized, intelligent hub.
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

        {/* AI callout */}
        <div className="bg-purple-500/6 border border-purple-500/15 rounded-3xl p-6 mb-8 flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-500/15 border border-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-purple-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-1">AI that organizes, not interrupts</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Family Brain&rsquo;s AI quietly surfaces conflicts, patterns, and suggestions, not as a chatbot,
              but as an invisible coordinator working in the background.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`bg-white/3 backdrop-blur border ${f.border} rounded-2xl p-6 flex gap-4`}
            >
              <div className="w-10 h-10 bg-white/5 border border-white/8 rounded-xl flex items-center justify-center shrink-0">
                <f.icon className={`w-5 h-5 ${f.iconColor}`} aria-hidden="true" />
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <p className="text-slate-700 text-xs font-mono mt-4">
            FAMILY BRAIN APP · FOX HAVEN · LAUNCHING 2026
          </p>
        </div>

      </div>
    </div>
  );
}
