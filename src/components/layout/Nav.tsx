'use client';

import { useState, useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', target: '#mission' },
    { label: 'Initiatives', target: '#initiatives' },
    { label: 'Impact', target: '#impact' },
    { label: 'Get Involved', target: '#cta' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-solar-white/95 backdrop-blur-xl border-b border-black/6 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 bg-heat-amber group-hover:bg-heat-amber-light rounded-xl flex items-center justify-center transition-colors duration-200 shadow-sm">
              <span className="display-text text-white text-base leading-none">F</span>
            </div>
            <span className="font-display text-[1.1rem] tracking-tight leading-none">
              <span className="text-heat-amber">Fox</span>
              {' '}
              <span className={scrolled ? 'text-deep-slate' : 'text-white'}>Haven</span>
              {' '}
              <span className={`text-[0.75rem] font-body font-light ${scrolled ? 'text-warm-gray' : 'text-white/40'}`}>
                Group
              </span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className={`text-sm font-body font-medium transition-colors duration-200 cursor-pointer ${
                  scrolled
                    ? 'text-charcoal hover:text-heat-amber'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA — "Get Help Now" with pulse dot */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('#cta')}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-heat-amber hover:bg-heat-amber-light text-white rounded-full text-sm font-body font-semibold transition-colors duration-200 shadow-sm cursor-pointer"
            >
              {/* Pulse ring + dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="nav-dot-ring absolute inline-flex h-full w-full rounded-full bg-white/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Get Help Now
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 cursor-pointer ${
              scrolled ? 'text-charcoal' : 'text-white'
            }`}
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Toggle navigation"
          >
            <span
              className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          } ${scrolled ? 'bg-solar-white' : 'bg-deep-slate/95 backdrop-blur-sm'}`}
        >
          <div className="py-4 border-t border-white/10">
            {links.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  scrollToSection(link.target);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-3 text-base font-body font-medium transition-colors cursor-pointer ${
                  scrolled
                    ? 'text-charcoal hover:text-heat-amber'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="px-6 pt-3 pb-2">
              <button
                onClick={() => {
                  scrollToSection('#cta');
                  setMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-heat-amber text-white rounded-full text-sm font-body font-semibold cursor-pointer"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="nav-dot-ring absolute inline-flex h-full w-full rounded-full bg-white/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Get Help Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
