'use client';

import { useEffect, useRef } from 'react';
import { scrollToSection } from '@/lib/scroll';
import MagneticButton from '@/components/ui/MagneticButton';
import PortalCard from '@/components/portal/PortalCard';
import PortalOverlay from '@/components/portal/PortalOverlay';
import { PORTALS } from '@/components/portal/portalConfig';
import type { PortalId } from '@/components/portal/portalConfig';
import { usePortalExpansion } from '@/hooks/usePortalExpansion';

export default function CtaSection() {
  const { activePortal, isOpen, open, close } = usePortalExpansion();
  const sectionRef = useRef<HTMLElement>(null);

  // Listen for external portal open requests (e.g. from initiative cards)
  useEffect(() => {
    const handler = (e: Event) => {
      const portalId = (e as CustomEvent).detail as PortalId;
      // Use the section element as the anchor for the overlay
      if (sectionRef.current) {
        open(portalId, sectionRef.current);
      }
    };
    window.addEventListener('open-portal', handler);
    return () => window.removeEventListener('open-portal', handler);
  }, [open]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden bg-[#060f1d]"
      style={{ padding: '140px 0' }}
      data-cursor="dark"
    >
      {/* Radial orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(224,94,20,0.12) 0%, rgba(224,94,20,0.04) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[760px] mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-12 reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#e05e14]/25 bg-[#e05e14]/8 mb-6">
            <span className="w-[5px] h-[5px] rounded-full bg-[#e05e14]" />
            <span className="font-body text-[#e05e14] text-[11px] font-semibold tracking-[0.12em] uppercase">
              Get Involved
            </span>
          </div>
          <h2
            className="font-display text-[#f4ede0] leading-[1.1]"
            style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)' }}
          >
            Let&rsquo;s build something{' '}
            <em className="font-display italic text-[#e05e14]">meaningful</em>{' '}
            together
          </h2>
          <p className="font-body text-[#f4ede0]/45 text-base leading-relaxed mt-5 max-w-xl mx-auto">
            Whether you&rsquo;re a community partner, investor, future user, or
            just someone who cares, we&rsquo;d love to hear from you.
          </p>
        </div>

        {/* Portal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {PORTALS.map((portal, i) => (
            <PortalCard
              key={portal.id}
              config={portal}
              index={i}
              onOpen={open}
            />
          ))}
        </div>

        {/* Buttons, unchanged */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal">
          <MagneticButton
            onClick={() => scrollToSection('#contact')}
            className="px-8 py-3.5 bg-[#e05e14] hover:bg-[#c45212] text-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer shadow-lg"
          >
            Send Us a Message &rarr;
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollToSection('#initiatives')}
            className="px-8 py-3.5 border border-[#f4ede0]/20 hover:border-[#f4ede0]/40 text-[#f4ede0]/70 hover:text-[#f4ede0] rounded-full font-body text-sm font-semibold transition-all duration-200 cursor-pointer"
          >
            &larr; Back to Initiatives
          </MagneticButton>
        </div>
      </div>

      {/* Portal Overlay */}
      {activePortal && (
        <PortalOverlay
          portalId={activePortal}
          isOpen={isOpen}
          onClose={close}
        />
      )}
    </section>
  );
}
