'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Color interpolation helpers ── */
function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `rgb(${Math.round(lerp(ar, br, t))},${Math.round(lerp(ag, bg, t))},${Math.round(lerp(ab, bb, t))})`;
}

/* ── Temperature stops ── */
interface TempStop {
  t: number;
  bg: string;
  tc: string;
  ctx: string;
  co: number;
}

const STOPS: TempStop[] = [
  { t: 72,  bg: '#0b1c2e', tc: '#f4ede0', ctx: '',                                                                          co: 0 },
  { t: 85,  bg: '#0f1e2d', tc: '#f4ede0', ctx: 'A warm Phoenix morning. Life feels manageable.',                             co: 1 },
  { t: 98,  bg: '#1a1a0d', tc: '#f4ede0', ctx: 'Locals check the weather app before stepping out.',                          co: 1 },
  { t: 108, bg: '#2a1005', tc: '#ffd4a0', ctx: 'Heat advisory issued. Vulnerable residents stay indoors.',                    co: 1 },
  { t: 115, bg: '#360800', tc: '#ffaa60', ctx: 'Extreme heat warning. Walking outside can be dangerous.',                     co: 1 },
  { t: 118, bg: '#400500', tc: '#ff6820', ctx: 'Phoenix record. People still die on the walk to relief \u2014 not inside it.', co: 1 },
];

/* ── Particle data (generated once) ── */
interface Particle {
  left: string;
  bottom: string;
  size: string;
  color: string;
  duration: string;
  delay: string;
  dx: string;
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const size = 1 + Math.random() * 3;
    particles.push({
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 20 - 10}px`,
      size: `${size}px`,
      color: `hsl(${20 + Math.random() * 20},90%,${55 + Math.random() * 15}%)`,
      duration: `${3 + Math.random() * 6}s`,
      delay: `${Math.random() * 9}s`,
      dx: `${Math.random() * 80 - 40}px`,
    });
  }
  return particles;
}

const PARTICLES = generateParticles(70);

/* ── Keyframes injected once via <style> ── */
const KEYFRAMES = `
@keyframes tj-particle-rise {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  85%  { opacity: 0.4; }
  100% { transform: translateY(-100vh) translateX(var(--tj-dx)); opacity: 0; }
}
`;

/* ── Component ── */
export default function TemperatureJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion client-side to avoid hydration mismatch
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    const tempEl = tempRef.current;
    const ctxEl = ctxRef.current;
    const bgEl = bgRef.current;
    const partEl = particlesRef.current;
    if (!section || !tempEl || !ctxEl || !bgEl || !partEl) return;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const prog = Math.max(0, Math.min(1, -rect.top / total));

    const rawIdx = prog * (STOPS.length - 1);
    const idx = Math.min(Math.floor(rawIdx), STOPS.length - 2);
    const lt = rawIdx - idx;
    const from = STOPS[idx];
    const to = STOPS[idx + 1];

    const temp = Math.round(lerp(from.t, to.t, lt));
    const tc = lerpColor(from.tc, to.tc, lt);
    const bg = lerpColor(from.bg, to.bg, lt);

    tempEl.textContent = `${temp}\u00B0F`;
    tempEl.style.color = tc;
    section.style.background = bg;

    // Background glow intensifies in latter 60% of scroll
    const heat = Math.max(0, (prog - 0.4) / 0.6);
    bgEl.style.background = `radial-gradient(circle at 50% 50%, rgba(224,94,20,${heat * 0.14}) 0%, transparent 65%)`;

    // Particle opacity tied to heat
    partEl.style.opacity = String(heat);

    // Context text
    if (idx >= 1) {
      ctxEl.textContent = to.ctx || from.ctx;
      ctxEl.style.opacity = String(lerp(from.co, to.co, lt));
      ctxEl.style.color = tc;
    } else {
      ctxEl.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handler = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(onScroll);
    };

    window.addEventListener('scroll', handler, { passive: true });
    // Run once on mount to set initial state
    onScroll();

    return () => {
      window.removeEventListener('scroll', handler);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, prefersReducedMotion]);

  /* ── Reduced motion: static at 118 F ── */
  if (prefersReducedMotion) {
    const last = STOPS[STOPS.length - 1];
    return (
      <section
        className="relative"
        style={{ height: '100vh', background: last.bg }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="relative z-10 text-center">
            <div
              className="font-[var(--font-cormorant-garamond)] leading-[0.9] tracking-[-0.04em]"
              style={{
                fontFamily: 'var(--font-cormorant-garamond)',
                fontSize: 'clamp(120px, 18vw, 220px)',
                fontWeight: 300,
                color: last.tc,
              }}
            >
              {last.t}&deg;F
            </div>
            <div
              className="mt-[18px] text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: 'rgba(244,237,224,0.35)' }}
            >
              Phoenix Temperature
            </div>
            <div
              style={{
                fontFamily: 'var(--font-cormorant-garamond)',
                fontSize: 'clamp(18px, 2.2vw, 30px)',
                fontStyle: 'italic',
                color: last.tc,
                maxWidth: 560,
                margin: '22px auto 0',
                lineHeight: 1.45,
              }}
            >
              {last.ctx}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: '380vh', background: '#0b1c2e' }}
        data-cursor="dark"
      >
        {/* Sticky viewport container */}
        <div
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
        >
          {/* Background glow layer */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{ transition: 'background 0.05s', willChange: 'background' }}
          />

          {/* Particles layer */}
          <div
            ref={particlesRef}
            className="pointer-events-none absolute inset-0"
            style={{ opacity: 0, willChange: 'opacity' }}
          >
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: p.left,
                  bottom: p.bottom,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  animationName: 'tj-particle-rise',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite',
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                  opacity: 0,
                  ['--tj-dx' as string]: p.dx,
                } as React.CSSProperties}
              />
            ))}
          </div>

          {/* Main display */}
          <div className="relative z-[2] text-center">
            <div
              ref={tempRef}
              style={{
                fontFamily: 'var(--font-cormorant-garamond)',
                fontSize: 'clamp(120px, 18vw, 220px)',
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: '#f4ede0',
                transition: 'color 0.08s',
                willChange: 'transform',
              }}
            >
              72&deg;F
            </div>
            <div
              className="mt-[18px] text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: 'rgba(244,237,224,0.35)' }}
            >
              Phoenix Temperature &middot; Scroll to Feel the Heat
            </div>
            <div
              ref={ctxRef}
              style={{
                fontFamily: 'var(--font-cormorant-garamond)',
                fontSize: 'clamp(18px, 2.2vw, 30px)',
                fontStyle: 'italic',
                color: 'rgba(244,237,224,0.5)',
                maxWidth: 560,
                margin: '22px auto 0',
                lineHeight: 1.45,
                opacity: 0,
                transition: 'opacity 0.5s',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
