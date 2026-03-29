'use client';

import { scrollToSection } from '@/lib/scroll';

const VALUES = [
  {
    number: '1',
    title: 'Community First',
    body: 'Every product we build starts with a real community need. We work alongside the people we serve — not just for them.',
  },
  {
    number: '2',
    title: 'Innovation with Purpose',
    body: 'Technology is a tool, not a goal. We harness innovation to solve problems that matter: heat, safety, and family wellbeing.',
  },
  {
    number: '3',
    title: 'Scalable Impact',
    body: 'We design every solution to grow. What starts in Phoenix becomes a model for resilient, connected communities nationwide.',
  },
];

export default function Mission() {
  return (
    <section id="mission" className="mission-bg py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — statement */}
          <div className="lg:col-span-5 flex flex-col justify-center reveal">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 mb-8 w-fit">
              <span className="font-body text-white text-[11px] font-semibold tracking-widest uppercase">
                Our Mission
              </span>
            </div>

            <blockquote className="display-text text-white mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              "A haven isn't just a place — it's a feeling of{' '}
              <span className="display-italic text-solar-gold">safety</span>,
              connection, and possibility."
            </blockquote>

            <p className="font-body text-white/70 text-base leading-relaxed mb-8">
              We're a group of innovators, designers, and community advocates
              who believe that thoughtful technology and purposeful infrastructure
              can fundamentally improve lives.
            </p>

            <cite className="font-body text-white/45 text-sm not-italic mb-10">
              — Fox Haven Group Team, Phoenix AZ
            </cite>

            <button
              onClick={() => scrollToSection('#cta')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-heat-amber hover:bg-solar-white rounded-full font-body text-sm font-semibold transition-colors duration-200 cursor-pointer w-fit shadow-md"
            >
              Work With Us →
            </button>
          </div>

          {/* Right — values */}
          <div
            className="lg:col-span-7 space-y-6 reveal"
            style={{ transitionDelay: '0.15s' }}
          >
            <p className="font-body text-white/40 text-xs font-semibold tracking-widest uppercase mb-8">
              What We Stand For
            </p>

            {VALUES.map((val) => (
              <div
                key={val.number}
                className="flex gap-6 p-6 rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm hover:bg-white/12 transition-colors duration-200 card-lift"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                    <span className="font-display text-solar-gold text-lg">{val.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-body text-white font-semibold text-lg mb-2">
                    {val.title}
                  </h3>
                  <p className="font-body text-white/60 text-sm leading-relaxed">{val.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
