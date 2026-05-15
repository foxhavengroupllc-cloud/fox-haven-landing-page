'use client';

import { scrollToSection } from '@/lib/scroll';
import StrategicCore from '@/components/strategic-core/StrategicCore';
import ParticleField from '@/components/ui/ParticleField';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  return (
    <section
      id="hero"
      data-cursor="dark"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: '140px 40px 100px' }}
    >
      {/* ── Layered background ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 90% 70% at 50% 40%, rgba(224,94,20,0.07) 0%, transparent 55%)',
              'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(17,36,64,0.8) 0%, transparent 50%)',
              'radial-gradient(ellipse 50% 60% at 80% 20%, rgba(11,28,46,0.9) 0%, transparent 50%)',
              'linear-gradient(170deg, #0b1c2e 0%, #060f1d 55%, #0a1826 100%)',
            ].join(', '),
          }}
        />

        {/* Grain texture */}
        <div
          className="absolute inset-0 animate-grain-shift"
          style={{
            opacity: 0.028,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: '200px',
          }}
        />

        {/* Radiant rays */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg at 50% 42%,
              transparent 0deg, rgba(224,94,20,0.018) 2deg, transparent 4deg,
              transparent 20deg, rgba(224,94,20,0.012) 22deg, transparent 24deg,
              transparent 45deg, rgba(224,94,20,0.015) 47deg, transparent 49deg,
              transparent 90deg, rgba(224,94,20,0.018) 92deg, transparent 94deg,
              transparent 180deg, rgba(224,94,20,0.014) 182deg, transparent 184deg,
              transparent 270deg, rgba(224,94,20,0.01) 272deg, transparent 274deg,
              transparent 360deg)`,
          }}
        />

        {/* Floating ambient orbs */}
        <div
          className="absolute rounded-full pointer-events-none animate-orb-drift"
          style={{
            width: 500, height: 500,
            background: 'rgba(224,94,20,0.055)',
            top: '-10%', left: '-8%',
            filter: 'blur(80px)',
            animationDuration: '14s',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none animate-orb-drift"
          style={{
            width: 400, height: 400,
            background: 'rgba(17,36,64,0.7)',
            bottom: '-5%', right: '-5%',
            filter: 'blur(80px)',
            animationDuration: '18s',
            animationDelay: '-6s',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none animate-orb-drift"
          style={{
            width: 300, height: 300,
            background: 'rgba(224,94,20,0.03)',
            top: '40%', right: '10%',
            filter: 'blur(80px)',
            animationDuration: '22s',
            animationDelay: '-10s',
          }}
        />

        <ParticleField particleCount={100} className="z-[1]" />
      </div>

      {/* ── Hero Content, 2 column on desktop ── */}
      <div className="relative z-[2] w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left: Text */}
        <div className="text-center lg:text-left">
          {/* Kicker */}
          <div
            className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-[#e05e14] font-semibold mb-9 hero-anim"
            style={{ '--hero-delay': '0.15s' } as React.CSSProperties}
          >
            <span className="w-7 h-px bg-[#e05e14]" />
            Phoenix &middot; Arizona &middot; Est. 2024
          </div>

          {/* Main statement */}
          <h1
            className="font-display tracking-[-0.02em] text-[#f4ede0] mb-0"
            style={{
              fontSize: 'clamp(42px, 6vw, 90px)',
              lineHeight: 1.05,
              fontWeight: 300,
            }}
          >
            <span className="block overflow-hidden">
              <span className="block hero-line-anim" style={{ '--hero-delay': '0.3s' } as React.CSSProperties}>
                A haven is not
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block hero-line-anim" style={{ '--hero-delay': '0.48s' } as React.CSSProperties}>
                just a place &mdash;
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block hero-line-anim" style={{ '--hero-delay': '0.64s' } as React.CSSProperties}>
                it&rsquo;s a <em className="italic text-[#e05e14] font-normal">feeling.</em>
              </span>
            </span>
          </h1>

          {/* Orange divider */}
          <div
            className="w-[60px] h-px bg-[#e05e14]/40 mx-auto lg:mx-0 my-10 hero-anim"
            style={{ '--hero-delay': '0.9s' } as React.CSSProperties}
          />

          {/* Sub text */}
          <p
            className="font-body text-[#f4ede0]/50 font-light max-w-[560px] mx-auto lg:mx-0 mb-10 leading-[1.75] hero-anim"
            style={{
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              '--hero-delay': '1.05s',
            } as React.CSSProperties}
          >
            Fox Haven Group builds technology and infrastructure that protect
            vulnerable communities, connect families, and turn the harshest
            conditions into moments of relief.
          </p>

          {/* Action buttons */}
          <div
            className="flex gap-4 items-center justify-center lg:justify-start flex-wrap hero-anim"
            style={{ '--hero-delay': '1.2s' } as React.CSSProperties}
          >
            <MagneticButton
              onClick={() => scrollToSection('#initiatives')}
              className="bg-[#e05e14] text-white px-8 py-4 rounded-full font-body text-sm font-semibold tracking-[0.04em] inline-flex items-center gap-2 hover:bg-[#f07033] hover:shadow-[0_14px_44px_rgba(224,94,20,0.38)] transition-all duration-200 cursor-pointer"
            >
              See Our Initiatives &rarr;
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollToSection('#mission-band')}
              className="border border-[#f4ede0]/[0.08] text-[#f4ede0] px-7 py-4 rounded-full font-body text-sm font-medium tracking-[0.02em] inline-flex items-center gap-2 hover:border-[#f4ede0]/[0.28] hover:bg-[#f4ede0]/[0.05] transition-all duration-200 cursor-pointer"
            >
              &#9654; Our Mission
            </MagneticButton>
          </div>
        </div>

        {/* Right: Strategic Core Orb */}
        <div className="hidden lg:flex items-center justify-center">
          <StrategicCore />
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 hero-anim"
        style={{ '--hero-delay': '1.6s' } as React.CSSProperties}
      >
        <span className="font-body text-[10px] tracking-[0.18em] uppercase text-[#f4ede0]/[0.28] font-medium">
          Scroll to explore
        </span>
        <div
          className="w-px h-11 animate-pulse-slow"
          style={{
            background: 'linear-gradient(to bottom, #e05e14, transparent)',
          }}
        />
      </div>
    </section>
  );
}
