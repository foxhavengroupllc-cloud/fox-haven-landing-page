import type { Metadata } from 'next';
import Link from 'next/link';
import HeroVisual from '@/components/new-home/HeroVisual';
import styles from '@/styles/design-system.module.css';
import { Header, Footer } from '@/components/new-home/SiteChrome';

/**
 * Fox Haven Group homepage, new design system.
 *
 * Replaces the legacy multi-section homepage with the design refresh.
 * Content rules:
 *   - Three featured initiatives in BuildingNow: System Solutions, Heat
 *     Relief App, Solar Shelters. Balm is intentionally excluded.
 *   - Card "Learn more" links point to existing production routes;
 *     those pages are being restyled in subsequent commits on this
 *     branch.
 */

export const metadata: Metadata = {
  title: 'Fox Haven Group | Building Systems People Want to Inhabit',
  description:
    'AI-native civic systems for real-world resilience, starting with extreme heat in Phoenix. Heat Relief App, Solar Cooling Shelters, and AI Solutions for everyone.',
  keywords:
    'Fox Haven Group, civic technology, heat relief, solar shelters, Phoenix, AI solutions, civic infrastructure, urban resilience',
  openGraph: {
    title: 'Fox Haven Group | Building Systems People Want to Inhabit',
    description:
      'AI-native civic systems for real-world resilience, starting with extreme heat in Phoenix.',
    type: 'website',
    url: 'https://foxhavengrouphq.com',
  },
};

const buildCards = [
  {
    number: '01',
    title: 'SYSTEM SOLUTIONS',
    body: 'Smarter operations. Smaller footprint.',
    cta: 'Learn more',
    visual: 'system',
    href: '/ai-solutions',
  },
  {
    number: '02',
    title: 'HEAT RELIEF APP',
    body: 'Real-time alerts, resources, and personalized guidance.',
    cta: 'Learn more',
    visual: 'phone',
    href: '/initiatives/heat-relief-app',
    image: '/images/new-design/homepage-redesign/heat-relief/screenshot-dashboard.jpg',
  },
  {
    number: '03',
    title: 'SOLAR SHELTERS',
    body: 'Safe, powered spaces for cooling, hydration, and rest.',
    cta: 'Learn more',
    visual: 'shelter',
    href: '/initiatives/solar-shelter',
    image: '/images/new-design/homepage-redesign/shelter/shelter-aerial.png',
  },
];

const platformCards = [
  {
    title: 'CIVIC INFRASTRUCTURE',
    body: 'Resilient systems. Smarter communities.',
    href: '/civic-infrastructure' as string | undefined,
    image: '/images/new-design/homepage-redesign/platform/civic-infrastructure.png',
  },
  {
    title: 'POPULATION FLOW',
    body: 'Urban activity pulse from public signals.',
    href: '/population-flow' as string | undefined,
    image: '/images/new-design/homepage-redesign/platform/population-flow.png',
  },
  {
    title: 'AI CONCIERGE',
    body: 'Ask. Understand. Get things done.',
    href: '/ai-concierge' as string | undefined,
    image: '/images/new-design/homepage-redesign/platform/ai-concierge.png',
  },
  {
    title: 'OPERATIONAL WORLDS',
    body: 'Design, simulate, and operate living worlds.',
    href: '/operational-worlds' as string | undefined,
    image: '/images/new-design/homepage-redesign/platform/operational-worlds.png',
  },
];

type VisualKind = 'phone' | 'shelter' | 'support' | 'network' | 'world' | 'system';

function CardVisual({ kind, image, imageAlt }: { kind: VisualKind; image?: string; imageAlt?: string }) {
  return (
    <div
      className={`${styles.visualMock} ${styles[kind]} ${image ? styles.visualMockImage : ''}`}
      aria-hidden={image ? undefined : true}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={imageAlt ?? ''} className={styles.cardScreenshot} loading="lazy" />
      ) : (
        <>
          {kind === 'phone' && (
            <div className={styles.phoneMock}>
              <span>Heat Risk</span>
              <i />
              <i />
              <i />
            </div>
          )}
          {kind === 'shelter' && (
            <div className={styles.shelterMock}>
              <span />
              <span />
              <span />
            </div>
          )}
          {kind === 'support' && (
            <div className={styles.supportMock}>
              <span />
              <span />
              <i />
            </div>
          )}
          {kind === 'network' && <div className={styles.networkMock} />}
          {kind === 'world' && <div className={styles.worldMock} />}
          {kind === 'system' && <div className={styles.systemMock} />}
        </>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>AI-NATIVE SYSTEMS. REAL-WORLD IMPACT.</p>
        <h1 aria-label="BUILDING SYSTEMS PEOPLE WANT TO INHABIT.">
          <span>BUILDING</span>{' '}
          <span>SYSTEMS</span>{' '}
          <span className={styles.orangeWord}>PEOPLE</span>{' '}
          <span>WANT TO</span>{' '}
          <span>INHABIT.</span>
        </h1>
        <p className={styles.heroBody}>
          Fox Haven Group builds AI-native civic systems for real-world resilience, starting with extreme heat in Phoenix.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.solidButton} href="/projects">
            Explore Heat Relief
            <span className={styles.linkArrow} aria-hidden="true">
              →
            </span>
          </Link>
          <Link className={styles.outlineButton} href="/platform">
            View the Platform
            <span className={styles.playArrow} aria-hidden="true">
              ▷
            </span>
          </Link>
        </div>

        <div className={styles.heroVideoTile}>
          <video
            className={styles.heroVideoTileMedia}
            src="/videos/digital-globe.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Animated glowing digital globe with radiating data connections"
          />
          <div className={styles.heroVideoTileCaption} aria-hidden="true">
            HUMAN-CENTERED · BY DESIGN
          </div>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}

function BuildingNow() {
  return (
    <section id="building-now" className={styles.buildingNow}>
      <div className={styles.sectionIntro}>
        <p className={styles.eyebrow}>WHAT WE ARE BUILDING NOW</p>
        <h2>Phoenix Heat Relief Network</h2>
        <p>A connected network of tools, places, and people designed to keep communities safe during extreme heat.</p>
        <Link className={styles.solidButton} href="/projects">
          Explore the Network
          <span className={styles.linkArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <div className={styles.moduleGrid}>
        {buildCards.map((card) => (
          <article className={styles.moduleCard} key={card.title}>
            <div className={styles.cardImage}>
              <CardVisual
                kind={card.visual as VisualKind}
                image={card.image}
                imageAlt={card.image ? `${card.title} preview` : undefined}
              />
              <span>{card.number}</span>
            </div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            {(() => {
              const href = card.href ?? '#partnership';
              const isRoute = href.startsWith('/');
              const arrow = (
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              );
              return isRoute ? (
                <Link href={href}>
                  {card.cta}
                  {arrow}
                </Link>
              ) : (
                <a href={href}>
                  {card.cta}
                  {arrow}
                </a>
              );
            })()}
          </article>
        ))}
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section id="platform" className={styles.platform}>
      <div className={styles.platformHeader}>
        <div>
          <p className={styles.eyebrow}>THE PLATFORM BEHIND IT</p>
          <h2>AI-native systems for human-centered outcomes.</h2>
        </div>
        <Link className={styles.outlineButton} href="/platform">
          Explore the Platform
          <span className={styles.playArrow} aria-hidden="true">
            ▷
          </span>
        </Link>
      </div>

      <div className={styles.platformGrid}>
        {platformCards.map((card) => {
          const inner = (
            <>
              {card.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  className={styles.platformCardImage}
                  loading="lazy"
                />
              )}
              <div className={styles.cardGlyph} aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              {!card.image && (
                <div className={styles.signalLines} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </>
          );
          return card.href ? (
            <Link
              className={`${styles.platformCard} ${styles.platformCardLink}`}
              href={card.href}
              key={card.title}
            >
              {inner}
            </Link>
          ) : (
            <article className={styles.platformCard} key={card.title}>
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function BottomCta() {
  return (
    <section id="partnership" className={styles.bottomCta}>
      <div>
        <p className={styles.eyebrow}>PARTNERS. COMMUNITIES. CHANGE MAKERS.</p>
        <h2>Help build the first deployable heat resilience network in Phoenix.</h2>
        <p>
          We&rsquo;re moving fast and building in the open.
          <br />
          Your partnership powers real-world impact.
        </p>
      </div>
      <div className={styles.ctaActions}>
        <Link className={styles.solidButton} href="/partner">
          Partner With Us
          <span className={styles.linkArrow} aria-hidden="true">
            →
          </span>
        </Link>
        <Link className={styles.outlineLightButton} href="/partner#partner-form">
          Join the Beta
          <span className={styles.linkArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.pageShell}>
      <Header />
      <Hero />
      <BuildingNow />
      <Platform />
      <BottomCta />
      <Footer />
    </main>
  );
}
