'use client';

import { scrollToSection } from '@/lib/scroll';
import MagneticButton from '@/components/ui/MagneticButton';
import useTiltCard from '@/hooks/useTiltCard';

const CARDS = [
  {
    icon: '\u2600\uFE0F',
    title: 'Partner with Us',
    description:
      "Business, organization, or city agency? Let's build something together.",
    cta: 'Start a conversation \u2192',
  },
  {
    icon: '\uD83D\uDCF1',
    title: 'Join the App Beta',
    description:
      'Be first to use the Heat Relief App. Your feedback shapes the product.',
    cta: 'Get early access \u2192',
  },
  {
    icon: '\uD83E\uDD1D',
    title: 'Volunteer or Donate',
    description:
      "Help expand our reach. Time, skills, or resources \u2014 every bit matters.",
    cta: 'Get involved \u2192',
  },
];

function CtaCard({ card, index }: { card: typeof CARDS[number]; index: number }) {
  const tiltRef = useTiltCard<HTMLDivElement>({ maxTilt: 12, scale: 1.04, glareColor: 'rgba(224,94,20,0.08)' });
  return (
    <div
      ref={tiltRef}
      className="bg-[#0b1c2e]/60 border border-[#f4ede0]/8 rounded-[18px] p-[26px] text-left hover:bg-[#0b1c2e]/90 hover:border-[#e05e14]/20 transition-all duration-300 reveal"
      style={{ transitionDelay: `${index * 0.08}s`, transformStyle: 'preserve-3d' }}
    >
      <div className="text-2xl mb-3">{card.icon}</div>
      <h3 className="font-body text-[15px] font-bold text-[#f4ede0] mb-2">
        {card.title}
      </h3>
      <p className="font-body text-[13px] text-[#f4ede0]/40 leading-relaxed mb-4">
        {card.description}
      </p>
      <span className="font-body text-[13px] text-[#e05e14] font-medium">
        {card.cta}
      </span>
    </div>
  );
}

export default function CtaSection() {
  return (
    <section
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
            just someone who cares — we&rsquo;d love to hear from you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {CARDS.map((card, i) => (
            <CtaCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Buttons */}
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
    </section>
  );
}
