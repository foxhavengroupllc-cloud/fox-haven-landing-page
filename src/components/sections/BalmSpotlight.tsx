'use client';

import { useState, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────
   Types & feature config
   ───────────────────────────────────────────────────────────── */

type FeatureId =
  | 'mental-load'
  | 'shared-calendar'
  | 'task-templates'
  | 'ai-assistant'
  | 'shopping-list';

const CHIPS: { id: FeatureId; label: string }[] = [
  { id: 'mental-load',     label: 'Mental load dashboard' },
  { id: 'shared-calendar', label: 'Shared calendar' },
  { id: 'task-templates',  label: '200+ task templates' },
  { id: 'ai-assistant',    label: 'AI assistant' },
  { id: 'shopping-list',   label: 'Shopping list' },
];

// Header label shown in the frame, updates with the active view
const VIEW_LABEL: Record<FeatureId, string> = {
  'mental-load':     'Mental Load',
  'shared-calendar': 'Calendar',
  'task-templates':  'Templates',
  'ai-assistant':    'AI Assistant',
  'shopping-list':   'Shopping',
};

/* ─────────────────────────────────────────────────────────────
   Preview variants, each renders inside the stable Balm frame.
   All are designed to fill roughly the same vertical space.
   ───────────────────────────────────────────────────────────── */

function MentalLoadPreview() {
  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-[10px] text-white/40 uppercase tracking-wider">
            Weekly mental load
          </span>
          <span className="font-body text-[10px] text-heat-amber font-semibold">
            You're carrying 68%
          </span>
        </div>
        {/* Bar chart */}
        <div className="flex gap-1.5 items-end h-9">
          {[
            { h: '100%', color: 'bg-heat-amber',    label: 'You' },
            { h: '34%',  color: 'bg-sky-blue/60',   label: 'Partner' },
            { h: '20%',  color: 'bg-solar-gold/60', label: 'Kid 1' },
            { h: '12%',  color: 'bg-white/20',      label: 'Kid 2' },
          ].map((bar) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-0.5">
              <div className={`w-full rounded-sm ${bar.color}`} style={{ height: bar.h }} />
              <span className="font-body text-[8px] text-white/30">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Task rows */}
      <div className="space-y-1.5">
        {[
          { dot: 'bg-heat-amber', text: 'Dentist, schedule this week', who: 'You' },
          { dot: 'bg-sky-blue',   text: 'School pickup, 3:30pm',       who: 'Partner' },
          { dot: 'bg-solar-gold', text: 'Groceries synced ✓',           who: 'Kid' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-white/4 rounded-lg px-3 py-2">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
            <span className="font-body text-white/55 text-[10px] flex-1">{item.text}</span>
            <span className="font-body text-[9px] text-white/25">{item.who}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SharedCalendarPreview() {
  const days   = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dates  = [25, 26, 27, 28, 29, 30, 31];
  const todayI = 3; // March 28 = index 3
  const events = [
    { dayI: 0, label: 'Soccer practice 4pm', color: 'bg-sky-blue' },
    { dayI: 2, label: 'Dentist 2pm',         color: 'bg-heat-amber' },
    { dayI: 4, label: 'Date night',          color: 'bg-solar-gold/80' },
    { dayI: 6, label: 'Groceries run',       color: 'bg-white/20' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-body text-[10px] text-white/40 uppercase tracking-wider">March 2026</span>
        <span className="font-body text-[9px] text-sky-blue/70">Google synced ✓</span>
      </div>
      {/* Day-of-week + date row */}
      <div className="grid grid-cols-7 gap-px">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="font-body text-[8px] text-white/25">{d}</span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                i === todayI ? 'bg-sky-blue' : ''
              }`}
            >
              <span
                className={`font-body text-[9px] font-medium ${
                  i === todayI ? 'text-white' : 'text-white/40'
                }`}
              >
                {dates[i]}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Events */}
      <div className="space-y-1.5">
        {events.map((ev, i) => (
          <div key={i} className="flex items-center gap-2 bg-white/4 rounded-md px-2.5 py-1.5">
            <div className={`w-1 h-4 rounded-full ${ev.color} shrink-0`} />
            <span className="font-body text-white/55 text-[10px] flex-1">{ev.label}</span>
            <span className="font-body text-[9px] text-white/25">{days[ev.dayI]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskTemplatesPreview() {
  const templates = [
    { icon: '🌅', label: 'Morning routine',   count: '8 tasks' },
    { icon: '🎒', label: 'School prep',        count: '5 tasks' },
    { icon: '🛒', label: 'Weekly groceries',   count: '12 tasks' },
    { icon: '🌙', label: 'Bedtime routine',    count: '6 tasks' },
    { icon: '🏃', label: 'After-school tasks', count: '4 tasks' },
  ];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between mb-2">
        <span className="font-body text-[10px] text-white/40 uppercase tracking-wider">
          Choose a routine
        </span>
        <span className="font-body text-[9px] text-heat-amber font-semibold">200+ templates</span>
      </div>
      {templates.map((t, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white/4 rounded-lg px-3 py-1.5"
        >
          <span className="text-sm leading-none">{t.icon}</span>
          <span className="font-body text-white/60 text-[10px] flex-1">{t.label}</span>
          <span className="font-body text-[9px] text-white/25">{t.count}</span>
        </div>
      ))}
    </div>
  );
}

function AIAssistantPreview() {
  const insights = [
    {
      text: "You've handled 73% of morning tasks this week.",
      accent: 'border-heat-amber/40',
      label: 'Load insight',
    },
    {
      text: 'Partner has open bandwidth Tuesday, 3 tasks could shift.',
      accent: 'border-sky-blue/40',
      label: 'Suggestion',
    },
    {
      text: "Dentist is 6 weeks overdue. Want me to add it to the schedule?",
      accent: 'border-solar-gold/40',
      label: 'Action',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-1">
        <span className="font-body text-[10px] text-white/40 uppercase tracking-wider">
          This week's insights
        </span>
        <span className="font-body text-[9px] text-sky-blue/70">GPT-4o</span>
      </div>
      {insights.map((ins, i) => (
        <div key={i} className={`bg-white/4 border-l-2 ${ins.accent} rounded-r-lg px-3 py-2`}>
          <div className="font-body text-[8px] text-white/30 uppercase tracking-wider mb-0.5">
            {ins.label}
          </div>
          <p className="font-body text-white/55 text-[10px] leading-relaxed">{ins.text}</p>
        </div>
      ))}
    </div>
  );
}

function ShoppingListPreview() {
  const sections = [
    {
      category: 'Produce',
      items: [
        { name: 'Apples',  done: true },
        { name: 'Spinach', done: false },
        { name: 'Bananas', done: true },
      ],
    },
    {
      category: 'Dairy',
      items: [
        { name: 'Milk',   done: false },
        { name: 'Yogurt', done: true },
      ],
    },
    {
      category: 'Household',
      items: [
        { name: 'Paper towels', done: false },
        { name: 'Dish soap',   done: false },
      ],
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-body text-[10px] text-white/40 uppercase tracking-wider">
          Family list
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-sky-blue animate-pulse" />
          <span className="font-body text-[9px] text-sky-blue/70">Real-time</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {sections.map((sec) => (
          <div key={sec.category}>
            <span className="font-body text-[8px] text-white/25 uppercase tracking-wider">
              {sec.category}
            </span>
            <div className="mt-1 space-y-0.5">
              {sec.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2 px-1 py-0.5">
                  <div
                    className={`w-3 h-3 rounded border flex items-center justify-center shrink-0 ${
                      item.done
                        ? 'bg-sky-blue/25 border-sky-blue/50'
                        : 'border-white/15'
                    }`}
                  >
                    {item.done && (
                      <span className="text-[6px] text-sky-blue font-bold">✓</span>
                    )}
                  </div>
                  <span
                    className={`font-body text-[10px] ${
                      item.done ? 'text-white/25 line-through' : 'text-white/55'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Map feature IDs to preview components
const PREVIEWS: Record<FeatureId, React.ComponentType> = {
  'mental-load':     MentalLoadPreview,
  'shared-calendar': SharedCalendarPreview,
  'task-templates':  TaskTemplatesPreview,
  'ai-assistant':    AIAssistantPreview,
  'shopping-list':   ShoppingListPreview,
};

/* ─────────────────────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────────────────────── */

export default function BalmSpotlight() {
  // activeChip updates immediately (drives chip highlight)
  const [activeChip, setActiveChip] = useState<FeatureId>('mental-load');
  // displayedFeature updates after fade-out (drives frame content)
  const [displayedFeature, setDisplayedFeature] = useState<FeatureId>('mental-load');
  // fading = true during the outgoing transition
  const [fading, setFading] = useState(false);
  const pendingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Activate a feature: chip highlights immediately, frame content swaps after fade-out
  const activate = useCallback(
    (id: FeatureId) => {
      if (id === activeChip) return;
      setActiveChip(id);
      if (pendingRef.current) clearTimeout(pendingRef.current);
      setFading(true);
      pendingRef.current = setTimeout(() => {
        setDisplayedFeature(id);
        setFading(false);
      }, 150); // matches half the CSS transition duration for a clean crossfade feel
    },
    [activeChip]
  );

  const Preview = PREVIEWS[displayedFeature];

  return (
    <section className="bg-deep-slate border-y border-white/8 py-16 lg:py-20 overflow-hidden relative">
      {/* Ambient background glow, shifts subtly based on active feature */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 70% 50%, rgba(13,79,115,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">

          {/* ── Left column: badge, heading, copy, chips, CTAs ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Live pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-blue/12 border border-sky-blue/25 mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-blue animate-pulse" />
              <span className="font-body text-sky-blue text-[11px] font-semibold tracking-[0.2em] uppercase">
                Live now, free to join
              </span>
            </div>

            {/* Heading, linked to balm app */}
            <h2
              className="display-text text-white mb-3"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              <a
                href="https://balm-puyebvbqba-uc.a.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
              >
                Balm , {' '}
                <span className="display-italic text-sky-blue">Family Control Center</span>
              </a>
            </h2>

            <p className="font-body text-white/55 text-lg mb-2 leading-relaxed max-w-lg lg:max-w-none">
              Stop carrying it alone.
            </p>
            <p className="font-body text-white/40 text-base mb-8 leading-relaxed max-w-lg">
              Balm tracks your family's mental load, syncs schedules, and gives everyone
              a way to contribute, powered by an AI that takes action, not just suggests.
            </p>

            {/* ── Feature chips, control the frame preview ── */}
            <div
              role="tablist"
              aria-label="Balm features"
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10"
            >
              {CHIPS.map(({ id, label }) => {
                const isActive = id === activeChip;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="balm-preview"
                    // Desktop: hover activates; mobile: tap activates
                    onMouseEnter={() => activate(id)}
                    onClick={() => activate(id)}
                    className={[
                      'px-3 py-1.5 rounded-full border font-body text-xs',
                      'transition-all duration-150 cursor-pointer',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-blue/50 focus-visible:ring-offset-1 focus-visible:ring-offset-deep-slate',
                      isActive
                        ? 'bg-sky-blue/12 border-sky-blue/45 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-white/50 hover:border-white/22 hover:text-white/75 hover:bg-white/8',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="https://balm-puyebvbqba-uc.a.run.app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer"
              >
                Try Balm free
                <span className="text-white/70">→</span>
              </a>
              <a
                href="https://balm-puyebvbqba-uc.a.run.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/60 hover:border-white/30 hover:text-white font-body text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Sign in
              </a>
            </div>
          </div>

          {/* ── Right column: stable Balm frame, swappable inner content ── */}
          <div className="w-full max-w-sm lg:max-w-xs shrink-0">
            <div
              id="balm-preview"
              role="tabpanel"
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Stable app header, view label fades gently on transition */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-sky-blue-deep/20">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-sky-blue/30 border border-sky-blue/40 flex items-center justify-center">
                    <span className="font-body text-sky-blue text-[9px] font-bold">B</span>
                  </div>
                  <span className="font-display text-white text-sm">Balm</span>
                </div>
                {/* View label: transitions at half the fade speed for a trailing feel */}
                <span
                  className="font-body text-[9px] text-sky-blue/60 font-medium tracking-wide uppercase"
                  style={{
                    transition: 'opacity 220ms ease-out',
                    opacity: fading ? 0.35 : 1,
                  }}
                >
                  {VIEW_LABEL[displayedFeature]}
                </span>
              </div>

              {/* Swappable inner content, fades out, swaps, fades in */}
              <div
                className="px-5 pt-4 pb-3"
                style={{ minHeight: '200px' }}
              >
                <div
                  style={{
                    transition: 'opacity 200ms ease-out, transform 200ms ease-out',
                    opacity: fading ? 0 : 1,
                    transform: fading ? 'translateY(4px)' : 'translateY(0)',
                  }}
                >
                  <Preview />
                </div>
              </div>

              {/* Stable app footer */}
              <div className="flex items-center justify-between px-5 pb-4 pt-1 border-t border-white/6">
                <span className="font-body text-[10px] text-white/30">
                  Free forever · Pro $9.99/mo
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-blue animate-pulse" />
                  <span className="font-body text-[10px] text-sky-blue font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
