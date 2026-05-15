'use client';
/**
 * Family Brain Experience, Phase Content Components
 *
 * Each phase renders the narrative content layer over the orbital canvas.
 * All content authored here, separate from rendering logic.
 *
 * Phases:
 *   0, Chaos:          "Tuesday, 7am. 12 tabs. 3 apps. 0 overview."
 *   1, Fragmentation:  "Your life, siloed across 6 apps."
 *   2, Organize:       "Family Brain connects everything."
 *   3, Intelligence:   "AI that manages, not interrupts."
 *   4, Clarity:        "Your family, finally in one place."
 *
 * Color: blue/purple, distinct from shelter (orange) and heat app (cyan).
 * Register: warm, humanist, not urgency-driven.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Calendar, ShoppingCart, FileText, CreditCard,
  CheckSquare, MessageCircle, Home, ArrowRight,
  Brain, ChevronRight, Sparkles,
} from 'lucide-react';
import { PhoneMockup } from '../../modules/phone-mockup/PhoneMockup';
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

// ─── Phase 0: Chaos ───────────────────────────────────────────────────────────

const CHAOS_FRAGMENTS = [
  { app: 'Messages',  text: '"Who\'s picking up Emma tonight?"', color: 'text-slate-400' },
  { app: 'Reminders', text: 'Dentist, Thu 9am (overdue)',         color: 'text-rose-400/80' },
  { app: 'Notes',     text: 'Grocery list: milk, eggs, bread…',   color: 'text-slate-400' },
  { app: 'Email',     text: 'RE: Soccer schedule change',          color: 'text-slate-500' },
  { app: 'Venmo',     text: 'Utilities split, $74 each',         color: 'text-amber-400/70' },
  { app: 'Calendar',  text: 'Conflict: recital ↔ practice Sat',   color: 'text-rose-400/80' },
];

export function Phase0Chaos({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">

        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/4 text-slate-400 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-8">
          TUESDAY · 7:14 AM · HOUSEHOLD STATUS
        </div>

        <h1
          className="font-black leading-tight mb-3 text-white"
          style={{ fontSize: 'clamp(2.2rem, 8vw, 5rem)' }}
        >
          12 tabs.<br />
          6 apps.<br />
          <span className="text-slate-500">0 overview.</span>
        </h1>

        <p className="text-slate-500 text-sm sm:text-base max-w-sm mb-10">
          This is what running a family feels like today.
        </p>

        {/* Fragment cards, scattered family data */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg mb-10">
          {CHAOS_FRAGMENTS.map((f) => (
            <div
              key={f.app}
              className="bg-black/50 backdrop-blur border border-white/6 rounded-xl px-3 py-2.5 text-left"
            >
              <div className="text-white/30 text-[9px] font-mono mb-1">{f.app}</div>
              <div className={`text-xs leading-snug ${f.color}`}>{f.text}</div>
            </div>
          ))}
        </div>

        <p className="text-slate-700 text-xs font-mono tracking-wider">
          6 APPS · ZERO SHARED CONTEXT
        </p>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 1: Fragmentation ───────────────────────────────────────────────────

const SILOS = [
  { icon: Calendar,     label: 'Calendar',   sub: 'Google, Apple', color: 'text-blue-400',   border: 'border-blue-500/25'  },
  { icon: CheckSquare,  label: 'Tasks',      sub: 'Reminders, Todoist', color: 'text-rose-400',    border: 'border-rose-500/25'  },
  { icon: ShoppingCart, label: 'Groceries',  sub: 'Notes, AnyList', color: 'text-green-400',  border: 'border-green-500/25' },
  { icon: FileText,     label: 'Documents',  sub: 'Drive, Dropbox', color: 'text-purple-400', border: 'border-purple-500/25'},
  { icon: CreditCard,   label: 'Budget',     sub: 'Venmo, Mint', color: 'text-amber-400',  border: 'border-amber-500/25' },
  { icon: MessageCircle,label: 'Messages',   sub: 'iMessage, Slack', color: 'text-cyan-400',   border: 'border-cyan-500/25'  },
];

export function Phase1Fragmentation({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-8">
          <div className="text-slate-500 font-mono text-xs tracking-widest mb-3">
            THE FRAGMENTATION PROBLEM
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
            Your life, siloed.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Powerful individually. Invisible to each other.
          </p>
        </div>

        {/* 6-silo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full max-w-2xl mb-8">
          {SILOS.map((s) => (
            <div
              key={s.label}
              className={`bg-black/50 backdrop-blur border ${s.border} rounded-2xl p-3 flex flex-col items-center text-center`}
            >
              <div className="w-9 h-9 bg-white/4 border border-white/8 rounded-xl flex items-center justify-center mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} aria-hidden="true" />
              </div>
              <div className="text-white text-xs font-semibold leading-tight">{s.label}</div>
              <div className="text-slate-600 text-[9px] font-mono mt-0.5 leading-snug">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Cross-silo friction examples */}
        <div className="w-full max-w-lg space-y-2">
          {[
            'Calendar conflict → no one knows until it\'s too late',
            'Grocery list → only the person who made it can see it',
            'Budget alert → has to be manually forwarded via text',
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 bg-black/40 border border-white/5 rounded-xl px-4 py-3"
            >
              <span className="text-rose-500 text-sm mt-0.5 shrink-0">✗</span>
              <span className="text-slate-400 text-xs leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 2: Organize ────────────────────────────────────────────────────────

const DASHBOARD_ITEMS = [
  { icon: Calendar,     label: 'Soccer Practice',  detail: 'Tue 4:30pm',    color: 'text-blue-400'   },
  { icon: ShoppingCart, label: 'Groceries',         detail: '12 items',      color: 'text-green-400'  },
  { icon: CheckSquare,  label: 'Lawn, Marcus',     detail: '3/5 done',      color: 'text-rose-400'   },
  { icon: CreditCard,   label: 'Utilities Bill',    detail: '$148 due',      color: 'text-amber-400'  },
];

export function Phase2Organize({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-8">
          <div className="text-purple-400 font-mono text-xs tracking-widest mb-3">
            INITIATIVE 03 · FAMILY BRAIN APP
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
            Everything. One place.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Calendar, tasks, groceries, documents, budget, and messaging, sharing one data model.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8 w-full max-w-2xl">

          {/* PhoneMockup, validates reusability from Phase 5 */}
          <PhoneMockup
            statusTime="07:14"
            ariaLabel="Family Brain App dashboard"
            width="195px"
            glowClass="drop-shadow-[0_0_24px_rgba(168,85,247,0.25)]"
            screenClassName="bg-[#080612]"
          >
            <div className="flex flex-col h-full">
              {/* App header */}
              <div
                className="px-4 py-3 shrink-0"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.7) 0%, rgba(168,85,247,0.7) 100%)' }}
              >
                <div className="text-white/60 text-[8px] font-mono">Good morning</div>
                <div className="text-white font-bold text-sm">The Johnson Family</div>
                <div className="flex gap-1.5 mt-1.5">
                  <div className="bg-white/15 rounded px-1.5 py-0.5 text-white text-[8px]">4 Members</div>
                  <div className="bg-white/15 rounded px-1.5 py-0.5 text-orange-300 text-[8px]">2 Due Today</div>
                </div>
              </div>

              {/* Dashboard items */}
              <div className="flex-1 p-2 space-y-1">
                {DASHBOARD_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/4"
                  >
                    <item.icon className={`w-3 h-3 shrink-0 ${item.color}`} aria-hidden="true" />
                    <div className="flex-1 text-white text-[9px] font-medium truncate">{item.label}</div>
                    <div className="text-slate-600 text-[8px] font-mono shrink-0">{item.detail}</div>
                  </div>
                ))}
              </div>

              {/* Bottom nav */}
              <div className="border-t border-white/5 px-3 py-2 flex justify-around shrink-0">
                {[Home, Calendar, CheckSquare].map((Icon, i) => (
                  <Icon
                    key={i}
                    className={`w-4 h-4 ${i === 0 ? 'text-purple-400' : 'text-slate-700'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          </PhoneMockup>

          {/* What changed */}
          <div className="flex-1 space-y-3 w-full sm:w-auto">
            {[
              { icon: Calendar,     label: 'Conflict detected',  text: 'Recital ↔ practice conflict auto-flagged', color: 'text-blue-400'   },
              { icon: ShoppingCart, label: 'List auto-updated',  text: 'School event added ingredients to grocery list', color: 'text-green-400'  },
              { icon: CreditCard,   label: 'Alert sent to all',  text: '$148 utilities due, reminder pushed to family', color: 'text-amber-400'  },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-black/40 backdrop-blur border border-white/8 rounded-2xl px-4 py-3.5 flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-white/4 border border-white/8 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className={`w-4 h-4 ${item.color}`} aria-hidden="true" />
                </div>
                <div>
                  <div className={`text-xs font-semibold ${item.color} mb-0.5`}>{item.label}</div>
                  <div className="text-slate-400 text-xs">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 3: Intelligence ────────────────────────────────────────────────────

const AI_INSIGHTS = [
  {
    id: 'conflict',
    label: 'Scheduling conflict resolved',
    detail: 'Emma\'s recital and Marcus\'s soccer practice overlapped Saturday. Family Brain rescheduled the practice and notified both coaches.',
    icon: Calendar,
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/5',
    delay: '0ms',
  },
  {
    id: 'grocery',
    label: 'Grocery list auto-updated',
    detail: 'The recital rescheduling triggered a dinner prep suggestion. 3 items were added to the grocery list automatically.',
    icon: ShoppingCart,
    color: 'text-green-400',
    border: 'border-green-500/20',
    bg: 'bg-green-500/5',
    delay: '200ms',
  },
  {
    id: 'budget',
    label: 'Budget pattern detected',
    detail: 'Grocery spend is 18% over budget this month. Family Brain flagged 3 recurring purchases that match similar months.',
    icon: CreditCard,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
    bg: 'bg-amber-500/5',
    delay: '400ms',
  },
];

export function Phase3Intelligence({ transitionState }: { transitionState: PhaseTransitionState }) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 border border-purple-500/25 bg-purple-500/8 text-purple-400 rounded-full px-4 py-1.5 text-xs font-mono tracking-widest mb-4">
            <Brain className="w-3 h-3" aria-hidden="true" />
            AI INFRASTRUCTURE · NOT A CHATBOT
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
            It manages.<br />You decide.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Family Brain&rsquo;s AI works in the background, surfacing what matters, connecting what&rsquo;s related,
            without interrupting.
          </p>
        </div>

        {/* AI insight cards */}
        <div className="w-full max-w-2xl space-y-3">
          {AI_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className={`${insight.bg} backdrop-blur border ${insight.border} rounded-2xl px-5 py-4 flex items-start gap-4`}
            >
              <div className="w-9 h-9 bg-white/4 border border-white/8 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className={`w-4 h-4 ${insight.color}`} aria-hidden="true" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${insight.color} mb-1`}>{insight.label}</div>
                <div className="text-slate-400 text-xs leading-relaxed">{insight.detail}</div>
              </div>
              <div className="shrink-0 ml-auto">
                <insight.icon className={`w-4 h-4 ${insight.color} opacity-40`} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-700 text-xs text-center mt-6 font-mono max-w-sm">
          NONE OF THESE REQUIRED A CONVERSATION. THE APP JUST KNEW.
        </p>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase 4: Clarity ─────────────────────────────────────────────────────────

export function Phase4Clarity({
  transitionState,
  onBack,
}: {
  transitionState: PhaseTransitionState;
  onBack: () => void;
}) {
  return (
    <PhaseWrapper transitionState={transitionState}>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">

        <div className="text-purple-400 font-mono text-xs tracking-widest mb-6">
          FAMILY BRAIN APP · FOX HAVEN · LAUNCHING 2026
        </div>

        <h2
          className="font-black leading-tight mb-4 text-white"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          Your family.<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 60%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Finally organized.
          </span>
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
          Everything your household needs, in one place, with AI that quietly handles
          the connections you don&rsquo;t have time to make yourself.
        </p>

        {/* Feature summary */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { icon: Calendar,     label: 'Shared Calendar' },
            { icon: ShoppingCart, label: 'Grocery Lists'   },
            { icon: FileText,     label: 'Documents'       },
            { icon: CreditCard,   label: 'Budget'          },
            { icon: CheckSquare,  label: 'Chore Board'     },
            { icon: MessageCircle,label: 'Family Chat'     },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 border border-white/8 bg-white/3 rounded-full px-4 py-2"
            >
              <f.icon className="w-3.5 h-3.5 text-purple-400" aria-hidden="true" />
              <span className="text-slate-300 text-xs font-medium">{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 text-base"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 cursor-pointer"
          >
            ← Back to Family Brain overview
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-slate-700 text-xs font-mono">
          <span>92% FEWER SCHEDULING CONFLICTS</span>
          <span>·</span>
          <span>40% LESS &ldquo;WHERE IS THAT?&rdquo;</span>
          <span>·</span>
          <span>4 MEMBERS · 1 APP</span>
        </div>

      </div>
    </PhaseWrapper>
  );
}

// ─── Phase Navigation ─────────────────────────────────────────────────────────

const PHASE_LABELS = ['Chaos', 'Fragmented', 'Organize', 'Intelligence', 'Clarity'];

export function BrainPhaseNavigation({
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
      {/* Phase dots, purple accent */}
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
                ? 'w-8 h-2.5 bg-purple-500'
                : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
              }
            `}
          />
        ))}
      </div>

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
