'use client';

import { useState } from 'react';
import StrategicCore from '@/components/strategic-core/StrategicCore';

const SUGGESTIONS = [
  'Find cooling near me',
  'Join the app beta',
  'How can I help?',
  'Heat emergency',
];

function openWidget(message?: string): void {
  window.dispatchEvent(
    new CustomEvent('foxhaven:open-widget', {
      detail: { message: message ?? null },
    })
  );
}

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const x = Math.round((cx + r * Math.cos(angle)) * 1e4) / 1e4;
    const y = Math.round((cy + r * Math.sin(angle)) * 1e4) / 1e4;
    return `${x},${y}`;
  }).join(' ');
}

// Pre-computed at module level so SSR and client produce identical floating-point values.
// Values are rounded to 4 decimal places to ensure string equality between Node.js and browser.
const HEX_POLYGON_POINTS = [175, 140, 105, 70, 35].map((r) => hexPoints(200, 200, r));
const HEX_SPOKE_COORDS = [0, 60, 120, 180, 240, 300].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x1: Math.round((200 + Math.cos(rad) * 35) * 1e4) / 1e4,
    y1: Math.round((200 + Math.sin(rad) * 35) * 1e4) / 1e4,
    x2: Math.round((200 + Math.cos(rad) * 175) * 1e4) / 1e4,
    y2: Math.round((200 + Math.sin(rad) * 175) * 1e4) / 1e4,
  };
});
const HEX_DOT_COORDS = [0, 60, 120, 180, 240, 300].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    cx: Math.round((200 + Math.cos(rad) * 140) * 1e4) / 1e4,
    cy: Math.round((200 + Math.sin(rad) * 140) * 1e4) / 1e4,
  };
});

function HexIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      suppressHydrationWarning
    >
      <defs>
        <radialGradient id="hex-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8821A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hex-mid" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A64A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#E8821A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="200" cy="200" r="190" fill="url(#hex-mid)" />

      {/* Concentric hexagons — outermost to innermost */}
      {HEX_POLYGON_POINTS.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          stroke="#E8821A"
          strokeWidth={i === 0 ? 1 : 0.75}
          strokeOpacity={0.08 + i * 0.07}
          fill={i === 2 ? 'url(#hex-mid)' : 'none'}
        />
      ))}

      {/* Radiating spokes */}
      {HEX_SPOKE_COORDS.map((c, i) => (
        <line
          key={i}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="#F2C94C"
          strokeWidth="0.6"
          strokeOpacity="0.18"
        />
      ))}

      {/* Corner accent dots */}
      {HEX_DOT_COORDS.map((c, i) => (
        <circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r="2.5"
          fill="#F2C94C"
          fillOpacity="0.4"
        />
      ))}

      {/* Center orb */}
      <circle cx="200" cy="200" r="22" fill="url(#hex-center)" opacity="0.5" />
      <circle cx="200" cy="200" r="7" fill="#F2C94C" opacity="0.8" />
    </svg>
  );
}

export default function Hero() {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = inputValue.trim();
    if (!msg) return;
    openWidget(msg);
    setInputValue('');
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 hero-shimmer-bg"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-3xl bg-heat-amber" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.08] blur-3xl bg-sky-blue" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 w-full">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-center">

          {/* ── Left: Content ── */}
          <div>
            {/* Eyebrow */}
            <p
              className="hero-item font-body text-sky-blue text-[11px] font-semibold tracking-[0.3em] uppercase mb-8"
              style={{ animationDelay: '0.2s' }}
            >
              Phoenix · Arizona · Innovation for Community
            </p>

            {/* H1 line 1 */}
            <div className="hero-item" style={{ animationDelay: '0.4s' }}>
              <h1
                className="display-text text-white"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', lineHeight: 1.08 }}
              >
                Technology built
              </h1>
            </div>

            {/* H1 line 2 + animated amber underline */}
            <div className="hero-item mb-9" style={{ animationDelay: '0.6s' }}>
              <h1
                className="display-text text-white"
                style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', lineHeight: 1.08 }}
              >
                <span
                  className="hero-underline"
                  style={{ '--underline-delay': '1.5s' } as React.CSSProperties}
                >
                  for what matters.
                </span>
              </h1>
            </div>

            {/* Subhead */}
            <p
              className="hero-item font-body text-white/55 text-lg sm:text-xl max-w-xl mb-12 leading-relaxed"
              style={{ animationDelay: '0.8s' }}
            >
              Fox Haven Group creates innovative solutions to the challenges
              defining community life — from life-saving heat relief
              infrastructure to the family coordination tools that help
              people thrive.
            </p>

            {/* Intent input bar */}
            <div
              className="hero-item max-w-md mb-5"
              style={{ animationDelay: '1.0s' }}
            >
              <form onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="How can Fox Haven help you?"
                    className="w-full px-6 py-4 pr-24 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/35 font-body text-sm focus:outline-none focus:border-heat-amber/50 transition-all duration-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-5 py-2.5 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full text-sm font-body font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Go →
                  </button>
                </div>
              </form>
            </div>

            {/* Suggestion chips */}
            <div
              className="hero-item flex flex-wrap gap-2"
              style={{ animationDelay: '1.0s' }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => openWidget(s)}
                  className="px-4 py-1.5 rounded-full border border-white/12 text-white/50 text-xs font-body hover:border-heat-amber/35 hover:text-heat-amber-light transition-all duration-200 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Strategic Core (interactive sphere) ── */}
          <div
            className="hero-item-right hidden lg:flex items-center justify-center"
            style={{ animationDelay: '1.2s' }}
          >
            <div className="relative w-full max-w-[460px]">
              {/* Atmospheric radial glow behind the sphere */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-25%',
                  background: 'radial-gradient(ellipse at center, rgba(13,79,115,0.28) 0%, rgba(13,79,115,0.06) 45%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <StrategicCore />
            </div>
          </div>
        </div>

        {/* Scroll cue — CSS-only, 2s delay */}
        <div className="scroll-arrow-wrap flex flex-col items-center gap-3 mt-20 text-white/30">
          <span className="font-body text-[10px] tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="scroll-arrow-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
