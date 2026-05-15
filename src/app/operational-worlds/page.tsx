import Link from 'next/link';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /operational-worlds, Platform layer detail page
 *
 * Q&A format. Deliberately not shaped like the other layer detail pages.
 * A short intro, then five questions a thoughtful partner would actually
 * ask before signing up, answered in 2–4 sentences each.
 */

const QA = [
  {
    q: 'Why does a heat-relief operation need a simulation layer?',
    a: 'Because heat operations have no rehearsal season. The first day a heat dome arrives is the day the plan gets tested for real. Operational Worlds is the place to test the plan before that day, against the same data the live system will see.',
  },
  {
    q: 'What does a partner actually do with it on day one?',
    a: 'Run a scenario against last summer. Pull the heat-stress data we observed, model the cooling-center inventory you actually had, and ask what would have changed if two more sites had been open from June to September. The answer comes back the same way a live recommendation would, with the signals it leaned on and the alternatives it considered.',
  },
  {
    q: 'How is this different from a dashboard?',
    a: 'A dashboard shows what happened. This layer lets you ask what would happen. The two share a model and a data layer; the simulation just runs the model forward with different inputs. Same engine, different timestamp.',
  },
  {
    q: 'What does the data come from?',
    a: 'For Phoenix, the same Civic Infrastructure feeds the live system uses, NWS, AirNow, Valley Metro, partner shelter and cooling-center inventories. Anything still pending in the pilot (vulnerability indicators from ACS, mobility partners) is clearly labeled in the scenario output so you never confuse modeled data for measured data.',
  },
  {
    q: 'Who is supposed to be using it?',
    a: 'Operations leads at partner organizations, primarily. City emergency-management staff. Hospital ops chiefs. The director of a community organization deciding whether to add a Saturday-shift outreach team for August. Not residents, Operational Worlds is for the people doing the planning.',
  },
];

export default function OperationalWorldsPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="Operational Worlds"
        className="relative isolate min-h-screen overflow-hidden bg-[#030711] text-[#f4ede0]"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(circle at 72% 18%, rgba(255,156,58,0.18), transparent 19rem), radial-gradient(circle at 27% 72%, rgba(244,237,224,0.07), transparent 22rem), linear-gradient(135deg, #07111c 0%, #02060d 58%, #050912 100%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(rgba(244,237,224,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(244,237,224,0.026)_1px,transparent_1px)] [background-size:56px_56px]" />

        <article className="relative z-10 mx-auto max-w-[760px] px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#f1a13a]">
            Platform · Layer 04
          </p>
          <h1 className="mt-3 font-display text-[2.6rem] font-light leading-[0.96] text-[#fff4df] sm:text-[3.1rem]">
            Operational Worlds
          </h1>
          <p className="mt-5 text-[#f4ede0]/74 sm:text-[1.05rem]">
            A simulation layer for the operations teams behind every Fox Haven deployment.
            Below are the five questions partners actually ask in the first call, with the
            answers we give.
          </p>

          <dl className="mt-10 divide-y divide-[#f4ede0]/10 border-y border-[#f4ede0]/10">
            {QA.map((item, i) => (
              <div key={item.q} className="py-7">
                <dt className="flex items-start gap-3">
                  <span
                    className="mt-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] text-[#f1a13a]"
                    aria-hidden="true"
                  >
                    Q{i + 1}
                  </span>
                  <span className="font-display text-[1.35rem] font-light leading-tight text-[#fff4df] sm:text-[1.55rem]">
                    {item.q}
                  </span>
                </dt>
                <dd className="mt-3 pl-[2.4rem] text-[#f4ede0]/72 leading-relaxed sm:text-[1.02rem]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <p className="text-[#f4ede0]/72">
              If your team is staring at next summer&rsquo;s operating plan and wondering
              what the alternatives look like, bring the data you have. We&rsquo;ll model the
              rest with you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#fff4df] shadow-[0_12px_28px_rgba(241,107,29,0.32)]"
                href="/partner"
              >
                Run a scenario with us <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[#f1a13a]/40 px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#fff4df]"
                href="/platform"
              >
                Back to the platform <span aria-hidden="true">▷</span>
              </Link>
            </div>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
