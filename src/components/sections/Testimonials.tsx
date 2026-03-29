const TESTIMONIALS = [
  {
    quote:
      "Phoenix summers are brutal — knowing there's a cooling center nearby that's actually open and accessible would be life-changing for families like ours.",
    name: 'Maria G.',
    role: 'Phoenix resident, South Mountain',
    initial: 'M',
    accentClass: 'bg-heat-amber/15 text-heat-amber border-heat-amber/20',
  },
  {
    quote:
      "The idea of an app that tells me exactly where to send my elderly mother during a heat wave is something I've needed for years. This can't come fast enough.",
    name: 'James T.',
    role: 'Caregiver, East Valley',
    initial: 'J',
    accentClass: 'bg-sky-blue/15 text-sky-blue border-sky-blue/20',
  },
  {
    quote:
      "As a community organizer, I've watched heat claim lives that could have been saved with better coordination and accessible resources. Fox Haven is building what's needed.",
    name: 'Sandra R.',
    role: 'Community Organizer, West Phoenix',
    initial: 'S',
    accentClass: 'bg-solar-gold/15 text-solar-gold border-solar-gold/20',
  },
];

export default function Testimonials() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-charcoal/15 bg-white mb-6">
            <span className="font-body text-charcoal text-[11px] font-semibold tracking-widest uppercase">
              Community Voices
            </span>
          </div>
          <h2
            className="display-text text-deep-slate mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            The people we're{' '}
            <span className="display-italic text-heat-amber">building for</span>
          </h2>
          <p className="font-body text-slate-medium max-w-xl mx-auto leading-relaxed">
            Real voices from the Phoenix community — the people whose lives Fox
            Haven's initiatives are designed to protect and improve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 card-lift reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Quote mark */}
              <div className="font-display text-5xl text-heat-amber/20 leading-none mb-4">
                "
              </div>

              <blockquote className="font-body text-charcoal text-base leading-relaxed mb-8">
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-3 pt-6 border-t border-black/6">
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-body font-bold ${t.accentClass}`}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-deep-slate">
                    {t.name}
                  </div>
                  <div className="font-body text-xs text-warm-gray">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center font-body text-xs text-warm-gray mt-10 reveal">
          * Quotes represent perspectives from community members engaged in early
          research — not product endorsements.
        </p>
      </div>
    </section>
  );
}
