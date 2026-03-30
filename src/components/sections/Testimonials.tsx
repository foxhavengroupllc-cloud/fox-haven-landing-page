const TESTIMONIALS = [
  {
    quote:
      "Phoenix summers are brutal — knowing there's a cooling center nearby that's actually open and accessible would be life-changing for families like ours.",
    name: 'Maria G.',
    role: 'Phoenix Resident, South Mountain',
    initial: 'M',
    avatarColor: '#0b1c2e',
  },
  {
    quote:
      "The idea of an app that tells me exactly where to send my elderly mother during a heat wave is something I've needed for years. This can't come fast enough.",
    name: 'James T.',
    role: 'Caregiver, East Valley',
    initial: 'J',
    avatarColor: '#1e3a54',
  },
  {
    quote:
      "As a community organizer, I've watched heat claim lives that could have been saved with better coordination and accessible resources. Fox Haven is building what's needed.",
    name: 'Sandra R.',
    role: 'Community Organizer, West Phoenix',
    initial: 'S',
    avatarColor: '#e05e14',
  },
];

export default function Testimonials() {
  return (
    <section id="voices" className="bg-[#f4ede0]" style={{ padding: '120px 0' }} data-cursor="light">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#0b1c2e]/15 bg-white/60 mb-5">
            <span className="w-[5px] h-[5px] rounded-full bg-[#e05e14]" />
            <span className="font-body text-[#0b1c2e] text-[11px] font-semibold tracking-[0.12em] uppercase">
              Community Voices
            </span>
          </div>
          <h2
            className="font-display text-[#0b1c2e] leading-[1.15]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            The people we&rsquo;re{' '}
            <em className="font-display italic text-[#e05e14]">building for</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="bg-white rounded-[18px] p-[34px] border border-[#0b1c2e]/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 reveal"
              style={{ transitionDelay: `${i * 0.13}s` }}
            >
              {/* Quote mark */}
              <div
                className="font-display text-[56px] leading-none text-[#e05e14]/15 mb-2"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="font-body text-[15px] italic text-[#0b1c2e]/65 leading-relaxed mb-8">
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-[#0b1c2e]/8">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-body font-bold text-white shrink-0"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="font-body text-sm font-semibold text-[#0b1c2e]">
                    {t.name}
                  </div>
                  <div className="font-body text-xs text-[#0b1c2e]/45">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center font-body text-xs text-[#0b1c2e]/40 mt-10 reveal">
          * Quotes represent perspectives from community members engaged in early
          research — not product endorsements.
        </p>
      </div>
    </section>
  );
}
