'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToSection } from '@/lib/scroll';

const LINKS = [
  { label: 'Mission', target: '#mission-band' },
  { label: 'Initiatives', target: '#initiatives' },
  { label: 'Community', target: '#voices' },
  { label: 'Get Involved', target: '#cta' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigateOrScroll = useCallback(
    (target: string) => {
      if (pathname === '/') {
        scrollToSection(target);
      } else {
        router.push('/' + target);
      }
    },
    [pathname, router],
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-400 ${
        scrolled
          ? 'py-[18px] px-8 lg:px-16 bg-navy-deep/[0.88] backdrop-blur-2xl border-b border-cream/[0.08]'
          : 'py-7 px-8 lg:px-16 bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigateOrScroll('#hero')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-[34px] h-[34px] bg-orange rounded-[9px] flex items-center justify-center">
            <span className="font-display text-white text-[15px] font-bold leading-none">
              F
            </span>
          </div>
          <span className="font-body text-[15px] font-medium tracking-[0.01em] text-cream">
            Fox{' '}
            <span className="font-bold">Haven</span>{' '}
            <span className="font-light opacity-55">Group</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => navigateOrScroll(link.target)}
              className="font-body text-[13px] font-medium tracking-[0.04em] text-cream/50 hover:text-cream transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => navigateOrScroll('#cta')}
            className="bg-orange text-white px-[22px] py-2.5 rounded-full font-body text-[13px] font-semibold tracking-[0.03em] hover:bg-[#f07033] hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(224,94,20,0.35)] transition-all duration-200 cursor-pointer"
          >
            Get Help Now &rarr;
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer text-cream"
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
        } bg-navy-deep/95 backdrop-blur-xl`}
      >
        <div className="py-4 border-t border-cream/[0.08]">
          {LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => {
                scrollToSection(link.target);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-6 py-3 font-body text-base font-medium text-cream/80 hover:text-cream transition-colors cursor-pointer"
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
              className="w-full inline-flex items-center justify-center py-3 bg-orange text-white rounded-full font-body text-sm font-semibold cursor-pointer"
            >
              Get Help Now &rarr;
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
