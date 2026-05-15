'use client';

import Link from 'next/link';
import { scrollToSection } from '@/lib/scroll';

const NAV_LINKS = [
  { label: 'Mission', target: '#mission-band' },
  { label: 'Initiatives', target: '#initiatives' },
  { label: 'Community', target: '#voices' },
  { label: 'Get Involved', target: '#cta' },
];

const INITIATIVE_LINKS = [
  { label: 'Heat Relief App', target: '#ic1' },
  { label: 'Balm \u2014 Family Hub', target: '#ic2' },
  { label: 'Heat Relief Solar Shelters', target: '#ic3' },
];

const AI_SOLUTIONS_LINKS = [
  { label: 'AI Solutions', href: '/ai-solutions' },
  { label: 'All Services', href: '/ai-solutions/services' },
  { label: 'Pricing', href: '/ai-solutions/pricing' },
  { label: 'Free Audit', href: '/audit' },
];

export default function Footer() {
  return (
    <footer className="bg-[#040b14] border-t border-[#f4ede0]/8" style={{ padding: '56px 0 0' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-14"
          style={{ paddingBottom: 56 }}
        >
          {/* Brand column */}
          <div>
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-3 mb-5 group cursor-pointer"
            >
              <div className="w-9 h-9 bg-[#e05e14] group-hover:bg-[#c45212] rounded-lg flex items-center justify-center transition-colors">
                <span className="font-display text-white text-base font-bold leading-none">
                  F
                </span>
              </div>
              <div className="font-display text-[#f4ede0] text-lg leading-none">
                Fox <strong>Haven</strong>{' '}
                <span className="text-[#f4ede0]/40">Group</span>
              </div>
            </button>

            <p className="font-body text-[#f4ede0]/40 text-sm leading-relaxed max-w-xs mb-4">
              Building technology and infrastructure that protects lives,
              empowers communities, and simplifies modern family life, starting
              in Phoenix.
            </p>

            <p className="font-body text-[12px] text-[#f4ede0]/25 flex items-center gap-1.5">
              <span className="w-[5px] h-[5px] bg-[#16a34a] rounded-full inline-block" />
              Actively building, Est. 2024
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-[#f4ede0]/30 tracking-[0.14em] uppercase mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="font-body text-sm text-[#f4ede0]/50 hover:text-[#f4ede0] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives column */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-[#f4ede0]/30 tracking-[0.14em] uppercase mb-5">
              Initiatives
            </h4>
            <ul className="space-y-3">
              {INITIATIVE_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="font-body text-sm text-[#f4ede0]/50 hover:text-[#f4ede0] transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Solutions column */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-[#f4ede0]/30 tracking-[0.14em] uppercase mb-5">
              AI Solutions
            </h4>
            <ul className="space-y-3">
              {AI_SOLUTIONS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-[#f4ede0]/50 hover:text-[#f4ede0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f4ede0]/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs text-[#f4ede0]/25">
            &copy; {new Date().getFullYear()} Fox Haven Group. All rights
            reserved.
          </span>
          <span className="font-body text-xs text-[#f4ede0]/25">
            Built with purpose, for Phoenix and beyond.
          </span>
        </div>
      </div>
    </footer>
  );
}
