'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUB_LINKS = [
  { label: 'Overview', href: '/ai-solutions' },
  { label: 'Services', href: '/ai-solutions/services' },
  { label: 'Process', href: '/ai-solutions/process' },
  { label: 'Pricing', href: '/ai-solutions/pricing' },
  // { label: 'Case Studies', href: '/ai-solutions/case-studies' },
  { label: 'FAQ', href: '/ai-solutions/faq' },
];

export default function SubNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/ai-solutions') return pathname === '/ai-solutions';
    return pathname.startsWith(href);
  }

  return (
    <div className="sticky top-[71px] z-[150] border-b border-[#1E293B] bg-[#0b1c2e]/90 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-6">
        <nav
          className="flex items-center gap-1 overflow-x-auto scrollbar-none -mx-1 px-1"
          aria-label="AI Solutions sections"
        >
          {SUB_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-shrink-0 px-3.5 py-3 text-[12px] font-medium tracking-[0.04em] transition-colors duration-200 border-b-2 ${
                  active
                    ? 'text-[#e05e14] border-[#e05e14]'
                    : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
