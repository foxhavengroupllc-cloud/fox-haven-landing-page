'use client';

import { useState } from 'react';
import Image from 'next/image';
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
          onClick={() => {
            const target = initiative.primaryAction.scrollTo ?? '#cta';
            scrollToSection(target);
            // If scrolling to CTA, open the partner portal after scroll
            if (target === '#cta') {
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('open-portal', { detail: 'partner' }));
              }, 900);
            }
          }}
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
   CARD 1 — Balm (image gallery + live app link)
   ──────────────────────────────────────────────────── */

function BalmVisual() {
  const [activeImg, setActiveImg] = useState(0);

  const screens = [
    { src: '/images/balm/balm-home.png', alt: 'Balm dashboard — weekly overview, tasks, shopping list, and focus section', label: 'Dashboard' },
    { src: '/images/balm/balm-calendar.png', alt: 'Balm shared family calendar with Google sync', label: 'Calendar' },
    { src: '/images/balm/balm-tasks.png', alt: 'Balm task manager — assign tasks, set due dates, track progress', label: 'Tasks' },
    { src: '/images/balm/balm-shopping.png', alt: 'Balm shared shopping list — add items, browse categories', label: 'Shopping' },
    { src: '/images/balm/balm-ai.png', alt: 'Balm AI assistant — natural language task and event creation', label: 'AI' },
  ];

  const prev = () => setActiveImg((i) => (i - 1 + screens.length) % screens.length);
  const next = () => setActiveImg((i) => (i + 1) % screens.length);

  return (
    <div className="h-full bg-gradient-to-br from-[#1a1035] to-[#0d0b1a] flex flex-col min-h-[520px] lg:min-h-0 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(108,92,231,.12) 0%, transparent 60%)',
        }}
      />

      {/* Main image area */}
      <div className="relative flex-1 min-h-[320px] group">
        {screens.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{ opacity: i === activeImg ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a] via-[#0d0b1a]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b1a]/20 to-transparent" />
          </div>
        ))}

        {/* Floating badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          <div className="w-5 h-5 rounded-md bg-[#6c5ce7] flex items-center justify-center">
            <span className="text-[10px]">{'\u{1F9E0}'}</span>
          </div>
          <span className="text-[10px] text-white/80 font-semibold tracking-[.04em]">Live App</span>
        </div>

        {/* Image counter badge */}
        <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md border border-[#6c5ce7]/30 rounded-full px-3 py-1.5 flex items-center gap-2">
          <span className="text-[10px] text-[#6c5ce7] font-semibold tracking-[.06em]">{screens[activeImg].label}</span>
          <span className="text-[9px] text-white/40 font-mono">{activeImg + 1}/{screens.length}</span>
        </div>

        {/* Large arrow buttons — always visible */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#6c5ce7]/30 hover:border-[#6c5ce7]/50 transition-all cursor-pointer"
          aria-label="Previous screenshot"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#6c5ce7]/30 hover:border-[#6c5ce7]/50 transition-all cursor-pointer"
          aria-label="Next screenshot"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Nav dots + counter */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <div className="flex gap-2">
            {screens.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActiveImg(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeImg
                    ? 'bg-[#6c5ce7] w-7'
                    : 'bg-white/30 w-2.5 hover:bg-white/50'
                }`}
                aria-label={`View ${s.label}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/40 font-mono tracking-wider">Swipe to browse</span>
        </div>
      </div>

      {/* Feature highlights bar */}
      <div className="relative z-10 px-5 pb-5 -mt-16">
        {/* Feature grid */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { icon: '\u{1F4CB}', value: '200+', label: 'Templates' },
            { icon: '\u{1F4C5}', value: 'Sync', label: 'Calendar' },
            { icon: '\u{1F9E0}', value: 'AI', label: 'Assistant' },
            { icon: '\u{1F4CA}', value: 'Load', label: 'Dashboard' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/[.06] backdrop-blur-md border border-white/[.08] rounded-xl p-2.5 text-center"
            >
              <div className="text-[14px] mb-0.5">{s.icon}</div>
              <div className="font-mono text-[12px] text-[#6c5ce7] font-medium leading-none">
                {s.value}
              </div>
              <div className="text-[8px] text-white/35 uppercase tracking-[.08em] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Screen tabs — clickable to switch screenshots */}
        <div className="bg-white/[.04] backdrop-blur-md border border-white/[.06] rounded-xl px-2 py-2 flex items-center justify-between gap-1">
          {[
            { icon: '\u2302', label: 'Home', idx: 0 },
            { icon: '\u{1F4C5}', label: 'Calendar', idx: 1 },
            { icon: '\u2611', label: 'Tasks', idx: 2 },
            { icon: '\u{1F6D2}', label: 'Shopping', idx: 3 },
            { icon: '\u2728', label: 'AI', idx: 4 },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveImg(tab.idx)}
              className={`flex flex-col items-center gap-0.5 flex-1 transition-all cursor-pointer rounded-lg py-1.5 ${
                tab.idx === activeImg
                  ? 'text-[#6c5ce7] bg-[#6c5ce7]/10'
                  : 'text-white/30 hover:text-white/50 hover:bg-white/[.03]'
              }`}
            >
              <span className="text-[14px]">{tab.icon}</span>
              <span className="text-[8px] font-semibold tracking-[.04em]">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['Mental Load', 'Shared Calendar', 'Task Templates', 'AI Powered', 'Family Sync'].map((tag) => (
            <div
              key={tag}
              className="bg-white/[.04] border border-white/[.06] rounded-full px-2.5 py-0.5 text-[8px] text-white/30"
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
   CARD 2 — Solar Shelters (image gallery + specs)
   ──────────────────────────────────────────────────── */

function ShelterVisual() {
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    { src: '/images/shelter/shelter-front.png', alt: 'Solar cooling shelter — front view showing steel columns, PV roof, benches, and equipment kiosk' },
    { src: '/images/shelter/shelter-aerial.png', alt: 'Aerial view of 24×24 ft shelter footprint with four roof cassettes' },
    { src: '/images/shelter/shelter-people.png', alt: 'Community members seated under the shelter in Phoenix heat' },
    { src: '/images/shelter/shelter-angle.png', alt: 'Three-quarter angle showing high-SRI roof and open perimeter design' },
    { src: '/images/shelter/shelter-interior.png', alt: 'Interior view showing ceiling fans, steel frame, and shaded seating' },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-[#091728] via-[#0f2540] to-[#162d50] flex flex-col min-h-[520px] lg:min-h-0 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(224,94,20,.08) 0%, transparent 60%)',
        }}
      />

      {/* Main image area */}
      <div className="relative flex-1 min-h-[280px]">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{ opacity: i === activeImg ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={i === 0}
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#091728] via-[#091728]/40 to-transparent" />
          </div>
        ))}

        {/* Floating badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
          <div className="w-[5px] h-[5px] bg-[#e05e14] rounded-full animate-pulse" />
          <span className="text-[10px] text-white/80 font-semibold tracking-[.06em]">Concept Package Complete</span>
        </div>

        {/* Image nav dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImg(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeImg
                  ? 'bg-[#e05e14] w-6'
                  : 'bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Specs bar */}
      <div className="relative z-10 px-5 pb-5 -mt-12">
        {/* Compact spec grid */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { value: '24×24', unit: 'ft', label: 'Footprint' },
            { value: '4.4', unit: 'kW', label: 'Solar PV' },
            { value: '14.3', unit: 'kWh', label: 'Battery' },
            { value: '<4', unit: 'hrs', label: 'Assembly' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/[.06] backdrop-blur-md border border-white/[.08] rounded-xl p-2.5 text-center"
            >
              <div className="font-mono text-[15px] text-[#e05e14] font-medium leading-none">
                {s.value}<span className="text-[10px] text-[#e05e14]/60 ml-0.5">{s.unit}</span>
              </div>
              <div className="text-[8px] text-white/35 uppercase tracking-[.08em] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Deployment sequence */}
        <div className="bg-white/[.04] backdrop-blur-md border border-white/[.06] rounded-xl px-4 py-3">
          <div className="text-[8px] text-white/30 uppercase tracking-[.12em] mb-2.5">Deployment Sequence</div>
          <div className="flex items-center">
            {[
              { step: '1', label: 'Site Prep' },
              { step: '2', label: 'Columns' },
              { step: '3', label: 'Roof' },
              { step: '4', label: 'Commission' },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-5 h-5 rounded-full bg-[#e05e14]/20 border border-[#e05e14]/40 flex items-center justify-center text-[8px] font-bold text-[#e05e14]">
                    {s.step}
                  </div>
                  <div className="text-[7px] text-white/30 mt-1">{s.label}</div>
                </div>
                {i < 3 && (
                  <div className="h-px flex-1 -mt-3 bg-[#e05e14]/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['6 HSS Columns', 'DC Fans', 'LFP Battery', 'ADA Compliant', '2024 Phoenix Code'].map((tag) => (
            <div
              key={tag}
              className="bg-white/[.04] border border-white/[.06] rounded-full px-2.5 py-0.5 text-[8px] text-white/30"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes shelterFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
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

  // Card 1: Balm reversed (visual left, body right — taller for gallery)
  if (index === 1) {
    return (
      <div ref={tiltRef} className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] rounded-[22px] overflow-hidden border border-[#0b1c2e]/[.08] min-h-[560px] hover:shadow-[0_32px_80px_rgba(11,28,46,.12)] transition-shadow reveal" style={{ transformStyle: 'preserve-3d' }}>
        <div className="order-2 lg:order-1">
          <BalmVisual />
        </div>
        <div className="order-1 lg:order-2">
          <CardBody initiative={initiative} className="h-full" />
        </div>
      </div>
    );
  }

  // Card 2: Solar Shelters normal (body left, visual right — taller for gallery)
  if (index === 2) {
    return (
      <div ref={tiltRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] rounded-[22px] overflow-hidden border border-[#0b1c2e]/[.08] min-h-[560px] hover:shadow-[0_32px_80px_rgba(11,28,46,.12)] transition-shadow reveal" style={{ transformStyle: 'preserve-3d' }}>
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
