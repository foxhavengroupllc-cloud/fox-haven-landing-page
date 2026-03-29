import { INITIATIVES } from '@/lib/intent-config';
import InitiativeCard from '@/components/initiatives/InitiativeCard';

export default function Initiatives() {
  return (
    <section id="initiatives" className="py-24 lg:py-36 bg-solar-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="max-w-2xl mb-20 lg:mb-28 reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-heat-amber/25 bg-heat-amber/8 mb-6">
            <span className="font-body text-heat-amber text-[11px] font-semibold tracking-widest uppercase">
              Our Initiatives
            </span>
          </div>
          <h2 className="display-text text-deep-slate mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            Three ways we're{' '}
            <span className="display-italic text-heat-amber underline-amber">
              building
            </span>{' '}
            a better Phoenix
          </h2>
          <p className="font-body text-slate-medium text-lg leading-relaxed">
            Each initiative addresses a real, urgent need — and every one is
            designed to scale beyond Phoenix to communities everywhere.
          </p>
        </div>

        {/* Initiative rows */}
        <div className="space-y-24 lg:space-y-36">
          {INITIATIVES.map((initiative, i) => (
            <InitiativeCard key={initiative.id} initiative={initiative} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
