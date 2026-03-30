'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { InitiativeConfig } from '@/lib/intent-config';
import { scrollToSection } from '@/lib/scroll';
import useTiltCard from '@/hooks/useTiltCard';

interface Props {
  initiative: InitiativeConfig;
  index: number;
}

/* ────────────────────────────────────────────────────
   Shared sub-components
   ──────────────────────────────────────────────────── */

function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[.1em] uppercase text-[#e05e14] font-semibold mb-3.5">
      <span className="w-[5px] h-[5px] rounded-full bg-[#e05e14] animate-pulse" />
      {text}
    </div>
  );
}

function StatsGrid({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#ede3d2] rounded-[10px] border border-[#0b1c2e]/[.07] px-3.5 py-3"
        >
          <div className="font-mono text-[20px] font-medium text-[#0b1c2e]">{s.value}</div>
          <div className="text-[10px] tracking-[.1em] uppercase text-[#0b1c2e]/[.38] mt-0.5">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CtaLink({
  initiative,
}: {
  initiative: InitiativeConfig;
}) {
  const label =
    initiative.number === '01'
      ? 'Open the app'
      : initiative.number === '02'
        ? 'Try Balm free'
        : initiative.number === '04'
          ? 'Start a conversation'
          : 'Partner with us';

  return (
    <div className="flex flex-wrap items-center gap-4">
      {initiative.primaryAction.href ? (
        <a
          href={initiative.primaryAction.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e05e14] text-[13px] font-semibold tracking-[.04em] inline-flex items-center gap-1.5 transition-[gap] duration-200 hover:gap-2.5"
        >
          {label} &rarr;
        </a>
      ) : (
        <button
          onClick={() => scrollToSection(initiative.primaryAction.scrollTo ?? '#cta')}
          className="text-[#e05e14] text-[13px] font-semibold tracking-[.04em] inline-flex items-center gap-1.5 transition-[gap] duration-200 hover:gap-2.5 cursor-pointer"
        >
          {label} &rarr;
        </button>
      )}
      <Link
        href={initiative.experienceHref}
        className="text-[#0b1c2e]/50 text-[12px] font-medium hover:text-[#e05e14] transition-colors inline-flex items-center gap-1.5"
      >
        <span aria-hidden="true">&#9654;</span>
        {initiative.experienceLabel}
      </Link>
    </div>
  );
}

function CardBody({
  initiative,
  className,
}: {
  initiative: InitiativeConfig;
  className?: string;
}) {
  return (
    <div className={`bg-white p-[52px_48px] flex flex-col justify-between ${className ?? ''}`}>
      <div>
        <div
          className="font-display text-[72px] font-light leading-none -ml-[3px] -mb-2"
          style={{ color: 'rgba(224,94,20,.12)' }}
          aria-hidden="true"
        >
          {initiative.number}
        </div>
        <Badge text={initiative.status} />
        <h3 className="font-display text-[30px] font-semibold text-[#0b1c2e] leading-[1.15] mb-2.5">
          {initiative.name}
        </h3>
        <p className="text-[13px] italic text-[#e05e14] mb-[18px]">{initiative.tagline}</p>
        <p className="text-[14px] leading-[1.8] text-[#0b1c2e]/60 font-light mb-7">
          {initiative.description}
        </p>
      </div>
      <div>
        {initiative.performanceStats && <StatsGrid stats={initiative.performanceStats} />}
        <CtaLink initiative={initiative} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   CARD 0 — Heat App (full-bleed immersive)
   ──────────────────────────────────────────────────── */

function HeatAppVisual() {
  return (
    <div className="relative h-full bg-gradient-to-br from-[#0a1828] via-[#0f2848] to-[#1a1005] overflow-hidden p-7 grid grid-cols-2 grid-rows-[1fr_auto] gap-4 items-start min-h-[340px] lg:min-h-0">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 40% 30%, rgba(224,94,20,.14) 0%, transparent 60%)',
        }}
      />

      {/* S1: Dashboard — spans both columns */}
      <div className="col-span-2 bg-white/[.06] border border-white/10 rounded-[14px] backdrop-blur-[8px] overflow-hidden relative z-[1]">
        {/* Chrome bar */}
        <div className="bg-black/30 px-3 py-2 flex items-center gap-1.5 border-b border-white/[.07]">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <span className="font-mono text-[9px] text-white/35 ml-2 tracking-[.04em]">
            &#128274; heat-relief-web&hellip;run.app
          </span>
        </div>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-3.5">
            <span className="text-[11px] font-bold text-[#e05e14] tracking-[.06em]">
              &#128293; PHOENIX HEAT RELIEF
            </span>
            <span className="text-[10px] text-white/40">Phoenix, AZ</span>
          </div>
          {/* Hero temp */}
          <div className="mb-4">
            <div className="font-display text-[52px] font-light text-white leading-none tracking-[-0.02em]">
              109<span className="text-[24px] align-super text-[#e05e14]">&deg;F</span>
            </div>
            <div className="flex gap-3.5 items-center text-[11px] mt-1">
              <span className="text-white/50">
                Feels Like <strong className="text-[#e05e14]">118&deg;F</strong>
              </span>
              <span className="text-white/55">&#9728;&#65039; Sunny</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-[#e05e14]/15 border border-[#e05e14]/30 rounded-full px-2.5 py-1 text-[10px] font-semibold text-[#e05e14] mt-2 tracking-[.04em]">
              <span className="w-[5px] h-[5px] bg-[#e05e14] rounded-full animate-pulse" />
              Extreme Heat Alert Active
            </div>
          </div>
          {/* 3-day forecast */}
          <div className="mb-3.5">
            <div className="text-[10px] text-white/35 tracking-[.1em] uppercase mb-2">
              3-Day Forecast
            </div>
            <div className="flex gap-2">
              {[
                { day: 'Thu', icon: '&#9728;&#65039;', hi: '109\u00B0', lo: 'L 87\u00B0' },
                { day: 'Fri', icon: '&#9728;&#65039;', hi: '107\u00B0', lo: 'L 85\u00B0' },
                { day: 'Sat', icon: '&#9728;&#65039;', hi: '105\u00B0', lo: 'L 84\u00B0' },
              ].map((d) => (
                <div
                  key={d.day}
                  className="flex-1 bg-white/5 border border-white/[.07] rounded-lg py-2 px-1.5 text-center"
                >
                  <div className="text-[10px] text-white/40 mb-1">{d.day}</div>
                  <div className="text-[14px] mb-1" dangerouslySetInnerHTML={{ __html: d.icon }} />
                  <div className="font-mono text-[13px] text-white font-medium">{d.hi}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">{d.lo}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Quick stats */}
          <div className="flex items-center bg-white/[.04] border border-white/[.07] rounded-[10px] px-3.5 py-2.5">
            <div className="flex-1 text-center">
              <div className="font-mono text-[13px] text-[#e05e14] font-medium">52</div>
              <div className="text-[9px] text-white/30 tracking-[.08em] uppercase mt-0.5">
                Cooling Centers
              </div>
            </div>
            <div className="w-px h-7 bg-white/[.08]" />
            <div className="flex-1 text-center">
              <div className="font-mono text-[13px] text-[#e05e14] font-medium">Live</div>
              <div className="text-[9px] text-white/30 tracking-[.08em] uppercase mt-0.5">
                Map Active
              </div>
            </div>
            <div className="w-px h-7 bg-white/[.08]" />
            <div className="flex-1 text-center">
              <div className="font-mono text-[13px] text-[#e05e14] font-medium">Weekly</div>
              <div className="text-[9px] text-white/30 tracking-[.08em] uppercase mt-0.5">
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* S2: Location card */}
      <div className="bg-white/[.06] border border-white/10 rounded-[14px] backdrop-blur-[8px] overflow-hidden relative z-[1] p-3.5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-[#e05e14] font-semibold tracking-[.06em]">
            &#127963; Cooling Center
          </span>
          <span className="text-[9px] text-[#16a34a] font-bold bg-[#16a34a]/[.12] border border-[#16a34a]/25 rounded-full px-[7px] py-0.5">
            &#10003; Verified
          </span>
        </div>
        <div className="text-[12px] font-bold text-white mb-1 leading-tight">
          Burton Barr Central Library
        </div>
        <div className="text-[10px] text-white/35 mb-2.5">
          1221 N Central Ave, Phoenix, AZ 85004
        </div>
        <div className="mb-2.5">
          {[
            ['Mon', '9a \u2013 5p'],
            ['Tue\u2013Thu', '9a \u2013 7p'],
            ['Fri\u2013Sat', '9a \u2013 5p'],
          ].map(([day, hours]) => (
            <div
              key={day}
              className="flex justify-between text-[10px] text-white/50 py-0.5 border-b border-white/5"
            >
              <span>{day}</span>
              <span>{hours}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 mb-2.5">
          <div className="text-[9px] text-white/45">&#128246; Free outdoor Wi-Fi &middot; 8a\u20139p</div>
          <div className="text-[9px] text-white/45">&#128187; Public computer access</div>
          <div className="text-[9px] text-white/45">&#10052;&#65039; Air-conditioned interior</div>
        </div>
        <div className="flex justify-between items-center border-t border-white/[.07] pt-2">
          <span className="text-[9px] text-white/25 italic">Last verified Feb 19, 2026</span>
          <span className="text-[10px] text-[#e05e14] font-semibold">&#128222; 602-262-4636</span>
        </div>
      </div>

      {/* S3: Map chip */}
      <div className="bg-white/[.06] border border-white/10 rounded-[14px] backdrop-blur-[8px] overflow-hidden relative z-[1]">
        <div className="relative w-full h-[110px] bg-gradient-to-br from-[#0a1f10] to-[#0f2815]">
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0px, transparent 1px, transparent 20px, rgba(255,255,255,.04) 21px), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0px, transparent 1px, transparent 20px, rgba(255,255,255,.04) 21px)',
            }}
          />
          {/* Pins */}
          <div className="absolute" style={{ top: '38%', left: '42%' }}>
            <div className="w-2.5 h-2.5 bg-[#e05e14] rounded-full border-2 border-white/50 shadow-[0_0_10px_#e05e14] relative z-[1]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-[#e05e14]/40 rounded-full animate-[pinRing_2s_ease-out_infinite]" />
          </div>
          <div className="absolute" style={{ top: '55%', left: '28%' }}>
            <div className="w-[7px] h-[7px] bg-[#e05e14]/60 rounded-full shadow-[0_0_6px_#e05e14]" />
          </div>
          <div className="absolute" style={{ top: '25%', left: '60%' }}>
            <div className="w-[7px] h-[7px] bg-[#e05e14]/60 rounded-full shadow-[0_0_6px_#e05e14]" />
          </div>
          <div className="absolute bottom-2 left-2.5 font-mono text-[9px] text-white/50 tracking-[.06em]">
            52 locations mapped &middot; Phoenix
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   CARD 1 — Balm (reversed layout, cream visual)
   ──────────────────────────────────────────────────── */

function BalmVisual() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: '\u2616', label: 'Home' },
    { icon: '\u{1F4C5}', label: 'Calendar' },
    { icon: '\u2611', label: 'Tasks' },
    { icon: '\u{1F6D2}', label: 'Shopping' },
    { icon: '\u2728', label: 'AI' },
  ];

  /* ── Screen content renderers ── */

  const HomeScreen = () => (
    <div className="px-4 pt-3 pb-2 overflow-y-auto" style={{ height: 340 }}>
      {/* Date badge */}
      <div className="inline-block bg-[#2a2b44] rounded-full px-3 py-1 text-[10px] text-white/60 tracking-[.08em] uppercase mb-2">
        MON &middot; MAR 30
      </div>
      {/* Greeting */}
      <div className="text-[18px] font-bold text-white mb-0.5">Up late, Stu.</div>
      <div className="text-[11px] text-white/40 mb-4">Clear today, Stu. Nothing on your list.</div>
      {/* Week strip */}
      <div className="flex gap-1.5 mb-4">
        {[
          { day: 'Mon', date: '30', active: true },
          { day: 'Tue', date: '31', active: false },
          { day: 'Wed', date: '1', active: false },
          { day: 'Thu', date: '2', active: false },
          { day: 'Fri', date: '3', active: false },
        ].map((d) => (
          <div
            key={d.day}
            className={`flex-1 text-center py-1.5 rounded-lg text-[10px] ${d.active ? 'bg-[#6c5ce7] text-white' : 'bg-[#2a2b44] text-white/40'}`}
          >
            <div className="font-medium">{d.day}</div>
            <div className="text-[13px] font-bold mt-0.5">{d.date}</div>
          </div>
        ))}
      </div>
      {/* Two cards side by side */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#2a2b44] rounded-xl p-3">
          <div className="text-[10px] text-white/40 uppercase tracking-[.06em] mb-1">Shopping List</div>
          <div className="text-[20px] font-bold text-white">0</div>
          <div className="text-[10px] text-white/30">items</div>
        </div>
        <div className="bg-[#2a2b44] rounded-xl p-3">
          <div className="text-[10px] text-white/40 uppercase tracking-[.06em] mb-1">Open Tasks</div>
          <div className="text-[20px] font-bold text-white">0</div>
          <div className="text-[10px] text-white/30">tasks</div>
        </div>
      </div>
      {/* Focus now */}
      <div className="mb-3">
        <div className="text-[9px] text-white/30 uppercase tracking-[.12em] mb-1.5">Focus Now</div>
        <div className="bg-[#2a2b44] rounded-xl p-3.5">
          <div className="text-[12px] text-white/70">Nothing urgent, Stu.</div>
        </div>
      </div>
      {/* Stat counters */}
      <div className="flex justify-between mb-3">
        {[
          { val: '0', lbl: 'Events' },
          { val: '0', lbl: 'Open' },
          { val: '0', lbl: 'Items' },
          { val: '1', lbl: 'People' },
        ].map((s) => (
          <div key={s.lbl} className="text-center flex-1">
            <div className="text-[16px] font-bold text-[#6c5ce7]">{s.val}</div>
            <div className="text-[9px] text-white/30 uppercase tracking-[.06em]">{s.lbl}</div>
          </div>
        ))}
      </div>
      {/* Quick tiles */}
      <div className="grid grid-cols-2 gap-1.5">
        {['All tasks', 'Shopping', 'Family Load', 'Unlock AI'].map((t) => (
          <div key={t} className="bg-[#2a2b44] rounded-lg px-3 py-2 text-[10px] text-white/50 text-center">
            {t}
          </div>
        ))}
      </div>
    </div>
  );

  const CalendarScreen = () => (
    <div className="px-4 pt-3 pb-2 overflow-y-auto" style={{ height: 340 }}>
      <div className="text-[14px] font-bold text-white mb-3">March 2026</div>
      {/* Calendar grid header */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={`${d}${i}`} className="text-[9px] text-white/30 text-center py-1">{d}</div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 mb-4">
        {/* offset for March 2026 starting on Sunday */}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
          <div
            key={d}
            className={`text-[10px] text-center py-1.5 rounded-md ${d === 30 ? 'bg-[#6c5ce7] text-white font-bold' : 'text-white/40 hover:bg-[#2a2b44]'}`}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <div className="bg-[#6c5ce7]/20 border border-[#6c5ce7]/30 rounded-xl py-2.5 text-center text-[11px] text-[#7c6df0] font-semibold">
          Connect Google
        </div>
        <div className="bg-[#6c5ce7] rounded-xl py-2.5 text-center text-[11px] text-white font-semibold">
          Add event
        </div>
      </div>
    </div>
  );

  const TasksScreen = () => (
    <div className="px-4 pt-3 pb-2 overflow-y-auto" style={{ height: 340 }}>
      {/* Add task input */}
      <div className="bg-[#2a2b44] rounded-xl px-3.5 py-2.5 text-[11px] text-white/25 mb-3">
        Add a task...
      </div>
      {/* Filter tabs */}
      <div className="flex gap-1 mb-3 overflow-x-auto">
        {['All', 'Mine', 'To Do', 'In Progress', 'Done'].map((f, i) => (
          <div
            key={f}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] ${i === 0 ? 'bg-[#6c5ce7] text-white' : 'bg-[#2a2b44] text-white/40'}`}
          >
            {f}
          </div>
        ))}
      </div>
      {/* Task items */}
      {[
        { text: 'Dentist appointment', assignee: 'ST', color: '#6c5ce7', status: 'To Do' },
        { text: 'Grocery run', assignee: 'ST', color: '#e05e14', status: 'In Progress' },
        { text: 'School pickup at 3:30', assignee: 'ST', color: '#16a34a', status: 'Done' },
      ].map((t) => (
        <div key={t.text} className="flex items-center gap-2.5 bg-[#2a2b44] rounded-xl px-3.5 py-2.5 mb-1.5">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: t.color }} />
          <div className="flex-1 min-w-0">
            <div className={`text-[11px] text-white/80 ${t.status === 'Done' ? 'line-through text-white/30' : ''}`}>{t.text}</div>
            <div className="text-[9px] text-white/25 mt-0.5">{t.status}</div>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#6c5ce7] flex items-center justify-center text-[8px] text-white font-bold shrink-0">
            {t.assignee}
          </div>
        </div>
      ))}
    </div>
  );

  const ShoppingScreen = () => (
    <div className="px-4 pt-3 pb-2 overflow-y-auto" style={{ height: 340 }}>
      {/* Add item input */}
      <div className="bg-[#2a2b44] rounded-xl px-3.5 py-2.5 text-[11px] text-white/25 mb-3">
        Add item...
      </div>
      {/* Category + Browse */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-[#2a2b44] rounded-xl px-3 py-2 text-[10px] text-white/35 flex items-center justify-between">
          <span>Category</span>
          <span className="text-white/20">&darr;</span>
        </div>
        <div className="bg-[#6c5ce7] rounded-xl px-4 py-2 text-[10px] text-white font-semibold">
          Browse
        </div>
      </div>
      {/* Sample list */}
      <div className="text-[10px] text-white/30 uppercase tracking-[.08em] mb-2">Your List</div>
      <div className="text-center py-8">
        <div className="text-[24px] mb-2 opacity-30">{'\u{1F6D2}'}</div>
        <div className="text-[11px] text-white/25">No items yet</div>
        <div className="text-[10px] text-white/15 mt-1">Add items above to get started</div>
      </div>
    </div>
  );

  const AIScreen = () => (
    <div className="px-4 pt-3 pb-2 overflow-y-auto" style={{ height: 340 }}>
      <div className="text-[14px] font-bold text-white mb-1">AI Assistant</div>
      <div className="text-[11px] text-white/40 mb-4">Powered by GPT-4o</div>
      {/* Feature card */}
      <div className="bg-[#2a2b44] rounded-xl p-4 mb-3">
        <div className="text-[11px] text-[#7c6df0] font-semibold mb-2.5 uppercase tracking-[.06em]">What I can do</div>
        {[
          'Create events from natural language',
          'Assign tasks by just asking',
          'Add shopping items by voice',
          'Family schedule queries',
        ].map((f) => (
          <div key={f} className="flex items-start gap-2 mb-2 last:mb-0">
            <span className="text-[#6c5ce7] text-[10px] mt-px shrink-0">{'\u2728'}</span>
            <span className="text-[11px] text-white/60">{f}</span>
          </div>
        ))}
      </div>
      {/* Chat input mock */}
      <div className="bg-[#2a2b44] rounded-xl px-3.5 py-2.5 text-[11px] text-white/25 flex items-center justify-between">
        <span>Ask Balm anything...</span>
        <span className="text-[#6c5ce7]">&uarr;</span>
      </div>
    </div>
  );

  const screens = [HomeScreen, CalendarScreen, TasksScreen, ShoppingScreen, AIScreen];
  const ActiveScreen = screens[activeTab];

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1035] to-[#0d0b1a] flex items-center justify-center p-8 min-h-[340px] lg:min-h-0">
      {/* Phone frame */}
      <div
        className="w-full max-w-[300px] rounded-[28px] overflow-hidden relative"
        style={{
          background: '#1a1b2e',
          boxShadow: '0 0 40px rgba(108,92,231,.25), 0 20px 60px rgba(0,0,0,.4)',
        }}
      >
        {/* Status bar */}
        <div className="flex justify-between items-center px-4 pt-2.5 pb-1">
          <span className="text-[10px] text-white/30 font-medium">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-2 border border-white/25 rounded-sm relative">
              <div className="absolute inset-[1px] right-[2px] bg-white/25 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* App header bar */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-white/[.06]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#6c5ce7] flex items-center justify-center">
              <span className="text-[11px]">{'\u{1F9E0}'}</span>
            </div>
            <span className="text-[13px] font-bold text-white">Fox Fam</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#6c5ce7] flex items-center justify-center text-[10px] font-bold text-white">
            ST
          </div>
        </div>

        {/* Screen content with fade transition */}
        <div className="relative" style={{ height: 340 }}>
          <div
            key={activeTab}
            style={{
              animation: 'balmFadeIn 250ms ease-out',
            }}
          >
            <ActiveScreen />
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex border-t border-white/[.06] bg-[#1a1b2e]">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors cursor-pointer ${
                i === activeTab ? 'text-[#6c5ce7]' : 'text-white/25 hover:text-white/40'
              }`}
            >
              <span className="text-[16px]">{tab.icon}</span>
              <span className="text-[8px] font-medium tracking-[.04em]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1 bg-[#1a1b2e]">
          <div className="w-[100px] h-[4px] bg-white/15 rounded-full" />
        </div>
      </div>

      {/* Inline keyframes for fade animation */}
      <style>{`
        @keyframes balmFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   CARD 2 — Solar Shelters (normal layout, dark visual)
   ──────────────────────────────────────────────────── */

function ShelterVisual() {
  return (
    <div className="h-full bg-gradient-to-br from-[#091728] via-[#0f2540] to-[#162d50] flex items-center justify-center p-11 min-h-[260px] lg:min-h-0">
      <div className="w-full max-w-[340px] bg-white/[.04] border border-white/[.09] rounded-[18px] p-[30px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-[22px]">
          <div>
            <div className="text-[17px] font-bold text-white">&#9728;&#65039; Solar Shelter</div>
            <div className="text-[11px] text-white/40 mt-[3px]">
              8&prime; &times; 12&prime; &middot; R-16 &middot; Off-Grid
            </div>
          </div>
          <div className="flex items-center gap-[5px] bg-[#e05e14]/15 border border-[#e05e14]/30 rounded-full px-[9px] py-1 text-[10px] text-[#e05e14] font-semibold shrink-0">
            <div className="w-[5px] h-[5px] bg-[#e05e14] rounded-full animate-pulse" />
            Dev
          </div>
        </div>
        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { value: '\u226530%', label: 'Heat Reduction' },
            { value: '<2hr', label: 'Deploy' },
            { value: 'ADA', label: 'Compliant' },
            { value: '100%', label: 'Solar' },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white/5 border border-white/[.07] rounded-[10px] p-3 text-center"
            >
              <div className="font-mono text-[19px] text-[#e05e14] font-medium">{m.value}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-[.08em] mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="mt-4 flex justify-between items-center text-[11px] text-white/30">
          <span>Pilot &middot; Summer 2026</span>
          <span className="bg-[#e05e14]/10 border border-[#e05e14]/20 rounded-[6px] px-2 py-[3px] text-[10px] text-[#e05e14]/70">
            Phoenix, AZ
          </span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   CARD 3 — AI for Small Business (reversed, dark green)
   ──────────────────────────────────────────────────── */

function AIConsultingVisual() {
  return (
    <div className="h-full bg-gradient-to-br from-[#071a0e] via-[#0a2818] to-[#0d1f15] flex items-center justify-center p-11 min-h-[380px] lg:min-h-0 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(22,163,74,.04) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(22,163,74,.04) 0px, transparent 1px, transparent 40px)',
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(22,163,74,.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full max-w-[380px] space-y-3.5">
        {/* Header card */}
        <div className="bg-white/[.05] border border-white/[.08] rounded-[16px] p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#16a34a]/20 border border-[#16a34a]/30 flex items-center justify-center">
                <span className="text-[16px]">&#x1F331;</span>
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">AI Readiness</div>
                <div className="text-[10px] text-white/35">Assessment Report</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#16a34a]/15 border border-[#16a34a]/30 rounded-full px-2.5 py-1 text-[9px] text-[#16a34a] font-semibold">
              <div className="w-[4px] h-[4px] bg-[#16a34a] rounded-full animate-pulse" />
              Active
            </div>
          </div>
          {/* Progress bars */}
          <div className="space-y-2.5">
            {[
              { label: 'Workflow Automation', pct: 72, color: '#16a34a' },
              { label: 'Data Organization', pct: 45, color: '#e05e14' },
              { label: 'AI Integration', pct: 28, color: '#6c5ce7' },
              { label: 'Sustainability Score', pct: 88, color: '#06b6d4' },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-white/50">{bar.label}</span>
                  <span className="text-white/70 font-mono">{bar.pct}%</span>
                </div>
                <div className="h-[5px] bg-white/[.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${bar.pct}%`, background: bar.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-column cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Savings card */}
          <div className="bg-white/[.05] border border-white/[.08] rounded-[14px] p-4 backdrop-blur-sm">
            <div className="text-[9px] text-white/30 uppercase tracking-[.1em] mb-2">Est. Savings</div>
            <div className="font-mono text-[28px] text-[#16a34a] font-medium leading-none">40%</div>
            <div className="text-[10px] text-white/35 mt-1.5">operational cost reduction</div>
            <div className="flex items-center gap-1 mt-2.5 text-[9px] text-[#16a34a]">
              <span>&#8593;</span>
              <span>vs. manual processes</span>
            </div>
          </div>

          {/* Carbon card */}
          <div className="bg-white/[.05] border border-white/[.08] rounded-[14px] p-4 backdrop-blur-sm">
            <div className="text-[9px] text-white/30 uppercase tracking-[.1em] mb-2">Carbon Impact</div>
            <div className="font-mono text-[28px] text-[#06b6d4] font-medium leading-none">60%</div>
            <div className="text-[10px] text-white/35 mt-1.5">less compute waste</div>
            <div className="flex items-center gap-1 mt-2.5 text-[9px] text-[#06b6d4]">
              <span>&#x1F33F;</span>
              <span>right-sized models</span>
            </div>
          </div>
        </div>

        {/* Service pipeline */}
        <div className="bg-white/[.05] border border-white/[.08] rounded-[14px] p-4 backdrop-blur-sm">
          <div className="text-[9px] text-white/30 uppercase tracking-[.1em] mb-3">Implementation Pipeline</div>
          <div className="flex items-center gap-0">
            {[
              { step: '01', label: 'Assess', active: true },
              { step: '02', label: 'Plan', active: true },
              { step: '03', label: 'Build', active: false },
              { step: '04', label: 'Train', active: false },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      s.active
                        ? 'bg-[#16a34a] text-white'
                        : 'bg-white/[.06] text-white/25 border border-white/[.08]'
                    }`}
                  >
                    {s.step}
                  </div>
                  <div className={`text-[8px] mt-1 ${s.active ? 'text-[#16a34a]' : 'text-white/20'}`}>
                    {s.label}
                  </div>
                </div>
                {i < 3 && (
                  <div
                    className="h-px flex-1 -mt-3"
                    style={{ background: i < 1 ? '#16a34a' : 'rgba(255,255,255,.06)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {['Workflow AI', 'Data Strategy', 'Green Compute', 'Staff Training', 'Cost Optimization'].map((tag) => (
            <div
              key={tag}
              className="bg-white/[.04] border border-white/[.07] rounded-full px-2.5 py-1 text-[9px] text-white/35"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────────────── */

export default function InitiativeCard({ initiative, index }: Props) {
  const tiltRef = useTiltCard<HTMLDivElement>({ maxTilt: 4, scale: 1.01, glareColor: 'rgba(224,94,20,0.04)' });

  // Card 0: Heat App full-bleed (body left, screens right, wider right col)
  if (index === 0) {
    return (
      <div ref={tiltRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] rounded-[22px] overflow-hidden border border-[#0b1c2e]/[.08] min-h-[520px] bg-white hover:shadow-[0_32px_80px_rgba(11,28,46,.12)] transition-shadow reveal" style={{ transformStyle: 'preserve-3d' }}>
        <CardBody initiative={initiative} />
        <HeatAppVisual />
      </div>
    );
  }

  // Card 1: Balm reversed (visual left, body right)
  if (index === 1) {
    return (
      <div ref={tiltRef} className="grid grid-cols-1 lg:grid-cols-2 rounded-[22px] overflow-hidden border border-[#0b1c2e]/[.08] min-h-[480px] hover:shadow-[0_32px_80px_rgba(11,28,46,.12)] transition-shadow reveal" style={{ transformStyle: 'preserve-3d' }}>
        <div className="order-2 lg:order-1">
          <BalmVisual />
        </div>
        <div className="order-1 lg:order-2">
          <CardBody initiative={initiative} className="h-full" />
        </div>
      </div>
    );
  }

  // Card 2: Solar Shelters normal (body left, visual right)
  if (index === 2) {
    return (
      <div ref={tiltRef} className="grid grid-cols-1 lg:grid-cols-2 rounded-[22px] overflow-hidden border border-[#0b1c2e]/[.08] min-h-[480px] hover:shadow-[0_32px_80px_rgba(11,28,46,.12)] transition-shadow reveal" style={{ transformStyle: 'preserve-3d' }}>
        <CardBody initiative={initiative} />
        <ShelterVisual />
      </div>
    );
  }

  // Card 3: AI Consulting reversed (visual left, body right)
  return (
    <div ref={tiltRef} className="grid grid-cols-1 lg:grid-cols-2 rounded-[22px] overflow-hidden border border-[#0b1c2e]/[.08] min-h-[480px] hover:shadow-[0_32px_80px_rgba(11,28,46,.12)] transition-shadow reveal" style={{ transformStyle: 'preserve-3d' }}>
      <div className="order-2 lg:order-1">
        <AIConsultingVisual />
      </div>
      <div className="order-1 lg:order-2">
        <CardBody initiative={initiative} className="h-full" />
      </div>
    </div>
  );
}
