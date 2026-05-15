import Link from 'next/link';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /civic-infrastructure — Platform layer detail page
 *
 * Short-form essay layout. Single column. A hero image, three or four
 * substantive paragraphs, a single CTA at the end. Deliberately not
 * shaped like the other layer detail pages so the section reads as
 * written, not assembled.
 */

export default function CivicInfrastructurePage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      <section
        aria-label="Civic Infrastructure"
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

        <article className="relative z-10 mx-auto max-w-[720px] px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#f1a13a]">
            Platform · Layer 01
          </p>
          <h1 className="mt-3 font-display text-[2.6rem] font-light leading-[0.96] text-[#fff4df] sm:text-[3.1rem]">
            Civic Infrastructure
          </h1>

          {/* Hero image */}
          <figure className="mt-7 overflow-hidden rounded-[8px] border border-[#f1a13a]/14 bg-[#04101a]/62 shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/new-design/homepage-redesign/platform/civic-infrastructure.png"
              alt="Conceptual illustration of civic infrastructure connecting agencies, services, and the people they serve"
              className="aspect-[16/9] w-full object-cover opacity-90"
              loading="lazy"
            />
          </figure>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-[#f4ede0]/74 sm:text-[1.05rem]">
            <p>
              Resilient systems, smarter communities. That is the whole idea behind this layer
              of the platform, and it is also the part of the work that takes the longest to
              build, because it is mostly about getting other people&rsquo;s systems to talk
              to each other.
            </p>

            <p>
              When extreme heat lands on Phoenix, the operational picture lives in pieces. The
              cooling-center inventory is in one agency&rsquo;s spreadsheet, the hydration
              partners are tracked in a different CRM, transit alerts are in a third feed, and
              the residents who need all of it are scattered across the metro asking
              questions in three or four languages. Civic Infrastructure is the connective
              tissue we wire between those pieces. We don&rsquo;t ask partners to migrate.
              They keep the systems they already run; we read from them.
            </p>

            <p>
              We do this with a hard privacy line. Partners aggregate their data before it
              reaches us. Fox Haven never receives an individual record, a household address,
              or a movement trail. The product physically cannot answer questions at the
              individual level, and that is intentional. Civic infrastructure that gets used
              against the people it serves stops getting used at all.
            </p>

            <p>
              Phoenix is the first city we&rsquo;ve wired up because the problem here is the
              most acute, but the integration shapes are not Phoenix-specific. Once a feed
              format is documented and tested, the next metro plugs in faster. That is the
              long game: every partner we onboard makes the next one cheaper.
            </p>
          </div>

          <div className="mt-12 border-t border-[#f4ede0]/10 pt-8">
            <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#f1a13a]">
              Run a system that should plug in?
            </p>
            <p className="mt-3 text-[#f4ede0]/72">
              Onboarding starts with a short conversation about the feed you already have. No
              migration, no rip-and-replace.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f26b1d] to-[#c4500f] px-4 py-2.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#fff4df] shadow-[0_12px_28px_rgba(241,107,29,0.32)]"
                href="/partner"
              >
                Partner with us <span aria-hidden="true">→</span>
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
