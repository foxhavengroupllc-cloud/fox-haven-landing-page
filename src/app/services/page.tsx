import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Microscope, Scale, Users, LifeBuoy, Compass, LineChart } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import PricingNote from '@/components/fhg/PricingNote';

export const metadata: Metadata = {
  title: 'Services & Engagements | Fox Haven Group',
  description:
    'Four ways to engage — Systems Diagnostic, Implementation Blueprint, Technical Assistance Partner, and Systems Change Initiative — backed by six core capabilities.',
};

/* ── Core capabilities: what we bring to the table (static, per 6/28 list) ── */
const capabilities = [
  {
    Icon: Microscope,
    title: 'Implementation Science',
    body: 'Good ideas do not implement themselves. We help teams understand what makes a strategy work, what can be adapted for local context, and what conditions need to be in place for an evidence-based strategy to actually work in practice.',
  },
  {
    Icon: Scale,
    title: 'Policy Translation',
    body: 'We turn dense policy, research, and grant and funding language into something people can actually use. That means clear decisions, practical steps, and work that makes sense outside of a document.',
  },
  {
    Icon: Users,
    title: 'Stakeholder Engagement',
    body: 'Implementation works better when the people closest to the issue are part of shaping the solution. We help teams involve the people most affected by the work, the people expected to carry it out, and the partners needed to make it last.',
  },
  {
    Icon: LifeBuoy,
    title: 'Technical Assistance',
    body: 'Sometimes teams need more than a training or a toolkit. We provide practical guidance, coaching, troubleshooting, and hands-on support as the work moves from plan to practice. Real implementation gets messy. We help teams problem-solve as conditions change, questions come up, partners get stuck, and plans meet the real world.',
  },
  {
    Icon: Compass,
    title: 'Strategic Planning',
    body: 'A good plan should do more than sound good on paper. We help teams set priorities, sequence the work, define roles, and build a path that makes sense for the people and systems carrying it out.',
  },
  {
    Icon: LineChart,
    title: 'Evaluation & Learning',
    body: 'Evaluation should help people learn, not just prove they were busy. We help teams measure what matters, understand what is changing, and use what they learn to improve the work over time.',
  },
];

/* ── Engagement areas: what people can actually buy ── */
const engagements = [
  {
    kicker: 'Entry',
    title: 'Systems Diagnostic',
    price: 'Starting at $4,500',
    whatItIs:
      'A clear first look at the problem, the system, the people involved, and the practical next steps.',
    bestFor:
      'Teams that have an idea, grant requirement, strategy, or community challenge but need help figuring out what is really needed before they move forward.',
    youGet:
      'A clear read on the current system, implementation barriers, stakeholder landscape, readiness conditions, risks, and recommended next steps.',
    bridge: 'Clarify, Engage, Prepare.',
    href: '/services/systems-diagnostic',
    cta: 'Explore Systems Diagnostic',
  },
  {
    kicker: 'Core — Flagship',
    title: 'Implementation Blueprint',
    price: 'Starting at $9,500',
    whatItIs: 'A practical plan for turning a strategy into work people can actually carry.',
    bestFor:
      'Teams that have selected a strategy or direction and need a clear implementation roadmap, roles, sequencing, buy-in plan, fidelity guidance, and sustainability structure.',
    youGet:
      'An implementation roadmap, roles and responsibilities, timeline, fidelity and adaptation guidance, communication plan, and early learning measures.',
    bridge: 'Clarify, Engage, Design, Prepare.',
    href: '/services/implementation-blueprint',
    cta: 'Explore Implementation Blueprint',
  },
  {
    kicker: 'Recurring',
    title: 'Technical Assistance Partner',
    price: 'Starting at $2,250/month',
    whatItIs: 'Ongoing support while the work is happening.',
    bestFor:
      'Teams that are already implementing, troubleshooting, adapting, or trying to keep partners aligned as conditions change.',
    youGet:
      'Regular coaching, troubleshooting support, meeting or workplan review, practical recommendations, resource development, and implementation support that helps the work keep moving.',
    bridge: 'Implement, Learn & Adapt, Prepare.',
    href: '/services/technical-assistance-partner',
    cta: 'Explore Technical Assistance Partner',
  },
  {
    kicker: 'Premium',
    title: 'Systems Change Initiative',
    price: 'Starting at $20,000',
    whatItIs:
      'A larger engagement for funders, agencies, coalitions, and cross-sector efforts trying to move complex work at scale.',
    bestFor:
      'Multi-partner efforts where the challenge is bigger than one program, one meeting, or one organization.',
    youGet:
      'Shared strategy, governance structure, implementation infrastructure, partner facilitation, learning loops, and a practical path for moving complex systems over time.',
    bridge: 'The full Bridge.',
    href: '/services/systems-change-initiative',
    cta: 'Explore Systems Change Initiative',
  },
];

/* ── A la carte priced products, grouped (standalone or built into an engagement) ── */
const productGroups = [
  {
    group: 'Strategy and Readiness',
    products: [
      {
        name: 'Grant Readiness & Funding Strategy Assessment',
        price: 'Starting at $2,500',
        body: 'A practical review of what you can pursue, what needs to be in place, and what funding opportunities make the most sense.',
      },
      {
        name: 'Grant Application Strategy & Implementation Narrative Support',
        price: 'Starting at $5,000',
        body: 'Support for teams developing the strategy, workplan, logic model, implementation narrative, and budget justification for a funding opportunity.',
      },
      {
        name: 'Community Needs Assessment & Data Analysis',
        price: 'Starting at $7,500',
        body: 'A focused assessment using available data, stakeholder input, and local context to clarify need and guide strategy.',
      },
    ],
  },
  {
    group: 'Planning and Implementation',
    products: [
      {
        name: 'Strategic Planning & Action Plan Facilitation',
        price: 'Starting at $6,000',
        body: 'Facilitated planning that moves a group from broad goals to clear priorities, roles, timelines, and next steps.',
      },
      {
        name: 'Training Design & Delivery',
        price: 'Starting at $2,500',
        body: 'Custom training, workshop, or learning session design for teams, coalitions, agencies, and cross-sector partners.',
      },
    ],
  },
  {
    group: 'Policy and Learning',
    products: [
      {
        name: 'Policy Analysis & Briefing Papers',
        price: 'Starting at $3,500',
        body: 'Clear analysis of a policy issue, implementation question, or funding requirement, with practical recommendations.',
      },
      {
        name: 'External Program Evaluation',
        price: 'Starting at $10,000',
        body: 'Evaluation planning, data collection tools, analysis, reporting, and learning support for grant-funded or community programs.',
      },
    ],
  },
  {
    group: 'Speaking and Convenings',
    products: [
      {
        name: 'Speaking, Keynotes & Expert Panels',
        price: 'Starting at $2,000',
        body: 'Plain-language, action-oriented sessions on implementation, overdose prevention, harm reduction, public health and public safety collaboration, policy translation, and systems change.',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Our Services</p>
          <h1 className={styles.display}>Services that move evidence-based strategies into practice.</h1>
          <p className={styles.pageHeroLead}>
            Fox Haven Group helps communities, coalitions, agencies, and grant-funded teams move
            complex work from idea to implementation. We bring the structure, translation,
            facilitation, and learning support it takes to carry that work under real-world
            conditions.
          </p>
        </div>
      </section>

      {/* ── Core capabilities: static tiles, no detail links ── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>Core Capabilities</p>
            <h2 className={styles.h2}>What it takes to move the work.</h2>
          </div>
          <div className={`${styles.cardGrid} reveal`}>
            {capabilities.map(({ Icon, title, body }) => (
              <article className={styles.card} key={title}>
                <span className={styles.cardIcon}>
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement areas: what you can buy ── */}
      <section className={`${styles.section} ${styles.sectionDark} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>Engagements</p>
            <h2 className={styles.h2}>Four ways to engage.</h2>
            <p className={styles.offerSub}>From a focused first look to a full systems-change effort.</p>
            <p className={styles.body}>
              Each engagement uses The Implementation Bridge, our practical framework for moving
              from evidence and policy to real-world implementation. We meet partners where they
              are, then help build the next right piece of the work.
            </p>
          </div>
          <div className={`${styles.offerGrid} reveal`}>
            {engagements.map((e) => (
              <article className={styles.offer} key={e.title}>
                <span className={styles.cardKicker}>{e.kicker}</span>
                <h3>{e.title}</h3>
                <p className={styles.offerPrice}>{e.price}</p>
                <dl className={styles.offerMeta}>
                  <div>
                    <dt>What it is</dt>
                    <dd>{e.whatItIs}</dd>
                  </div>
                  <div>
                    <dt>Best for</dt>
                    <dd>{e.bestFor}</dd>
                  </div>
                  <div>
                    <dt>What you get</dt>
                    <dd>{e.youGet}</dd>
                  </div>
                  <div>
                    <dt>Bridge steps used most</dt>
                    <dd>{e.bridge}</dd>
                  </div>
                </dl>
                <Link className={`${styles.btn} ${styles.btnGhost} ${styles.offerBtn}`} href={e.href}>
                  {e.cta}
                  <ArrowRight size={15} className="arrow" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── A la carte priced products ── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`}>
            <p className={styles.eyebrow}>Priced Products</p>
            <h2 className={styles.h2}>Need something more specific?</h2>
            <p className={styles.body}>
              These defined products are available as standalone scopes or can be built into one of
              the four engagement areas.
            </p>
          </div>

          {productGroups.map((g) => (
            <div className={`${styles.productGroup} reveal`} key={g.group}>
              <h3 className={styles.productGroupTitle}>{g.group}</h3>
              <div className={styles.productList}>
                {g.products.map((p) => (
                  <article className={styles.productItem} key={p.name}>
                    <div className={styles.productHead}>
                      <h4>{p.name}</h4>
                      <span className={styles.productPrice}>{p.price}</span>
                    </div>
                    <p>{p.body}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <PricingNote />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>From insight to impact.</p>
              <h2 className={styles.h2}>Not sure which engagement fits? Start with a diagnostic.</h2>
            </div>
            <div className={styles.btnRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Start with a Systems Diagnostic
                <ArrowRight size={16} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
