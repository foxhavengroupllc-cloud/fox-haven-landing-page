'use client';

import { scrollToSection } from '@/lib/scroll';

const sections = [
  { label: 'Initiatives', target: '#initiatives' },
  { label: 'Mission', target: '#mission' },
  { label: 'About', target: '#about' },
  { label: 'Get Involved', target: '#cta' },
];

const initiatives = [
  { label: 'Heat Relief Solar Shelters', target: '#initiatives' },
  { label: 'Heat Relief App', target: '#initiatives' },
  { label: 'Family Hub', target: '#initiatives' },
];

export default function Footer() {
  return (
    <footer className="bg-deep-slate text-white">
      {/* Top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-heat-amber/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-3 mb-6 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-heat-amber group-hover:bg-heat-amber-light rounded-xl flex items-center justify-center transition-colors shadow-md">
                <span className="display-text text-white text-lg leading-none">F</span>
              </div>
              <div>
                <div className="font-display text-lg text-white leading-none mb-0.5">
                  Fox Haven Group
                </div>
                <div className="font-body text-xs text-white/40 tracking-widest uppercase">
                  Phoenix, Arizona
                </div>
              </div>
            </button>

            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
              Building technology and infrastructure that protects lives, empowers
              communities, and simplifies modern family life — starting in Phoenix.
            </p>

            <div className="mt-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-heat-amber animate-pulse-slow" />
              <span className="font-body text-xs text-white/40 tracking-wider">
                Actively building — Est. 2024
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="font-body text-xs font-semibold text-white/40 tracking-widest uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {sections.map((s) => (
                <li key={s.target}>
                  <button
                    onClick={() => scrollToSection(s.target)}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-body text-xs font-semibold text-white/40 tracking-widest uppercase mb-5">
              Initiatives
            </h4>
            <ul className="space-y-3">
              {initiatives.map((i) => (
                <li key={i.label}>
                  <button
                    onClick={() => scrollToSection(i.target)}
                    className="font-body text-sm text-white/60 hover:text-heat-amber-light transition-colors cursor-pointer text-left"
                  >
                    {i.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-2xl border border-heat-amber/20 bg-heat-amber/5">
              <p className="font-body text-xs text-white/50 mb-3">
                Interested in partnering or investing?
              </p>
              <button
                onClick={() => scrollToSection('#cta')}
                className="font-body text-sm text-heat-amber-light hover:text-solar-gold transition-colors font-medium cursor-pointer"
              >
                Let's talk →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Fox Haven Group. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30">
            Built with purpose — for Phoenix and beyond.
          </p>
        </div>
      </div>
    </footer>
  );
}
