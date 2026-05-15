import Link from 'next/link';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /platform, The Platform
 *
 * Standalone page expanding the four platform pillars previewed on the
 * homepage. Each pillar gets a written breakdown, the existing platform
 * artwork, and a link out to the most relevant product surface.
 */

const PLATFORM_STATS = [
  { value: '4', label: 'Core platform layers' },
  { value: '8', label: 'Production AI services' },
  { value: '<3s', label: 'Concierge response time' },
  { value: '24/7', label: 'Operational coverage' },
];

const PILLARS = [
  {
    title: 'CIVIC INFRASTRUCTURE',
    eyebrow: '◉ LAYER 01',
    body: 'Resilient systems. Smarter communities.',
    body2:
      'A connective tissue that lets cities, healthcare providers, and community organizations share signals without sharing silos. We integrate cooling-center status, hydration-station inventory, shelter capacity, transit pulses, and resident-facing notifications into one operational picture.',
    bullets: [
      'Open data ingestion from city, county, and partner systems',
      'Resident-facing services routed through privacy-preserving APIs',
      'Field-tested in Phoenix, designed to travel to any heat-stressed metro',
    ],
    image: '/images/new-design/homepage-redesign/platform/civic-infrastructure.png',
    href: '/civic-infrastructure',
    linkLabel: 'Explore Civic Infrastructure',
  },
  {
    title: 'POPULATION FLOW',
    eyebrow: '◉ LAYER 02',
    body: 'Urban activity pulse from public signals.',
    body2:
      'Real-time understanding of where people are moving, where pressure is building, and where help should land, built only from public, aggregated, and consented signals. Population Flow turns scattered observations into something an operator can act on in the next ten minutes.',
    bullets: [
      'Aggregated mobility, transit, and event signals, never individual tracking',
      'Heat-stress overlays mapped to neighborhoods, not zip codes',
      'Operator dashboards designed for the people doing the work',
    ],
    image: '/images/new-design/homepage-redesign/platform/population-flow.png',
    href: '/population-flow',
    linkLabel: 'Explore Population Flow',
  },
  {
    title: 'AI CONCIERGE',
    eyebrow: '◉ LAYER 03',
    body: 'Ask. Understand. Get things done.',
    body2:
      'A conversational layer that meets residents where they already are, text, web, or in person at a partner site, and routes them to the right resource without forcing them through a directory tree. Concierge is honest about what it does not know and escalates to a human the moment that matters.',
    bullets: [
      'Multilingual by default, English, Spanish, and growing',
      'Grounded in your partner network, not a generic LLM with no context',
      'Human-in-the-loop escalation for clinical, legal, or safety-critical asks',
    ],
    image: '/images/new-design/homepage-redesign/platform/ai-concierge.png',
    href: '/ai-concierge',
    linkLabel: 'Explore AI Concierge',
  },
  {
    title: 'OPERATIONAL WORLDS',
    eyebrow: '◉ LAYER 04',
    body: 'Design, simulate, and operate living worlds.',
    body2:
      'A simulation layer for the operations teams behind every Fox Haven deployment. Run a scenario before committing to it. Model what happens when a cooling center goes offline at 2pm on a 116°F day. Stress-test the staffing plan before the heat dome arrives.',
    bullets: [
      'What-if simulation against real population and infrastructure data',
      'Scenario libraries for heat emergencies, outages, and surge events',
      'Pipes directly into Civic Infrastructure for live operations',
    ],
    image: '/images/new-design/homepage-redesign/platform/operational-worlds.png',
    href: '/operational-worlds',
    linkLabel: 'Explore Operational Worlds',
  },
];

const TECH_PRINCIPLES = [
  {
    title: 'AI-native, not AI-bolted-on',
    body: 'The platform is designed assuming reasoning models exist. Every layer accepts natural-language intent, every operator surface has a Concierge built in.',
  },
  {
    title: 'Privacy is a precondition',
    body: 'We use aggregated and consented signals only. Individual location data never leaves the partner system. We can prove what we ingest and what we do not.',
  },
  {
    title: 'Open by default',
    body: 'Schemas, methods, and as much code as we can responsibly publish flow back to partners. Every Phoenix deployment makes the next city cheaper.',
  },
  {
    title: 'Right-sized compute',
    body: 'We optimize for the cheapest model that gets the job done well. No frontier-model bills for things a fine-tuned small model handles in 200ms.',
  },
];

export default function PlatformPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ THE PLATFORM</p>
          <h2>Systems for human-centered outcomes.</h2>
          <p>
            Every Fox Haven product runs on a shared platform, four interoperable layers that
            let civic, healthcare, and community teams operate at the speed of the problem,
            not the speed of paperwork.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/initiatives/heat-relief-app">
              See the Heat Relief App
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/ai-solutions">
              AI services catalog
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <figure className={styles.detailShots}>
          <div
            className={styles.detailShotPrimary}
            style={{ aspectRatio: '16 / 10', maxHeight: '360px' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/new-design/homepage-redesign/platform/civic-infrastructure.png"
              alt="Civic infrastructure platform visualization"
              loading="lazy"
            />
            <figcaption>Civic infrastructure · live operational view</figcaption>
          </div>
        </figure>
      </section>

      {/* ── Stats strip ── */}
      <div className={styles.detailStats}>
        {PLATFORM_STATS.map((s) => (
          <div key={s.label} className={styles.detailStat}>
            <span className={styles.detailStatValue}>{s.value}</span>
            <span className={styles.detailStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Four pillars ── */}
      {PILLARS.map((pillar, i) => (
        <section
          key={pillar.title}
          id={pillar.title.toLowerCase().replace(/\s+/g, '-')}
          className={styles.detailSection}
          style={{ scrollMarginTop: '90px' }}
        >
          <div className={styles.detailIntro}>
            <p className={styles.eyebrow}>{pillar.eyebrow}</p>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
            <p>{pillar.body2}</p>
            {pillar.href && pillar.linkLabel && (
              <div className={styles.detailActions}>
                <Link className={styles.outlineButton} href={pillar.href}>
                  {pillar.linkLabel}
                  <span className={styles.linkArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            )}
          </div>

          <ul className={styles.detailFeatures}>
            {pillar.bullets.map((b, idx) => (
              <li key={idx}>
                <strong>0{idx + 1}</strong>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Place the image as a banner under the section text on every other pillar */}
          {(i === 1 || i === 3) && (
            <figure
              className={styles.detailShots}
              style={{ gridColumn: '1 / -1', gridTemplateColumns: 'minmax(0, 1fr)' }}
            >
              <div
                className={styles.detailShotPrimary}
                style={{ aspectRatio: '24 / 9', maxHeight: '280px' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pillar.image} alt={`${pillar.title} platform layer`} loading="lazy" />
                <figcaption>{pillar.title.toLowerCase()} · platform layer</figcaption>
              </div>
            </figure>
          )}
        </section>
      ))}

      {/* ── How it works (tech principles) ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ HOW WE BUILD IT</p>
          <h2>Four engineering principles. No exceptions.</h2>
          <p>
            How Fox Haven decides what to ship and what to leave on the cutting-room floor.
            These are the constraints we apply before anything reaches a partner.
          </p>
        </div>

        <ul className={styles.detailFeatures}>
          {TECH_PRINCIPLES.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong>
              <span>{p.body}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ NEXT</p>
          <h2>Want to build on the platform?</h2>
          <p>
            Whether you&rsquo;re a city ready to pilot, a healthcare system looking to plug
            in, or a business that needs the AI services for your own operations, every door
            starts with the same conversation.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/partner">
              Partner with us
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/audit">
              Free AI assessment
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
