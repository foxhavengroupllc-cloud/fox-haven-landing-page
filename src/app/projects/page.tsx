import Link from 'next/link';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';

/**
 * /projects, Active projects
 *
 * Hub for the three production initiatives currently in build: System
 * Solutions (AI Solutions for Everyone), Heat Relief App, and Solar
 * Cooling Shelters. Each card links to its dedicated experience page.
 *
 * Balm / Family Hub is intentionally excluded per the homepage rules.
 */

const PROJECT_STATS = [
  { value: '3', label: 'Active initiatives' },
  { value: 'Phoenix', label: 'First deployment city' },
  { value: '2026', label: 'Network launch year' },
  { value: 'Open', label: 'Now hiring partners' },
];

type Project = {
  number: string;
  title: string;
  tagline: string;
  body: string;
  status: string;
  image: string;
  href: string;
  features: string[];
};

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'SYSTEM SOLUTIONS',
    tagline: 'AI Solutions for Everyone',
    body:
      'AI-powered automation that eliminates the repetitive, manual drag costing teams time and money. Eight production services, lead response, reporting, scheduling, custom agents, and more, deployable in three to six weeks.',
    status: 'Now accepting clients',
    image: '/images/new-design/homepage-redesign/system-solutions/system-globe.png',
    href: '/ai-solutions',
    features: [
      'Free 12-minute AI readiness audit',
      'Scored report with dollar-impact estimates',
      'Three- to six-week deployment, dedicated consultant',
    ],
  },
  {
    number: '02',
    title: 'HEAT RELIEF APP',
    tagline: 'Real-time guidance when minutes matter',
    body:
      'A resident-facing mobile experience that turns scattered cooling resources into one clear answer. Real-time alerts, hydration-station and cooling-center directions, personalized risk guidance, and a one-tap call to the right service.',
    status: 'In active build · Phoenix pilot',
    image: '/images/new-design/homepage-redesign/heat-relief/screenshot-dashboard.jpg',
    href: '/initiatives/heat-relief-app',
    features: [
      'Multilingual, low-bandwidth, accessible by design',
      'Live cooling-center status from partner integrations',
      'Personalized heat-risk guidance for vulnerable residents',
    ],
  },
  {
    number: '03',
    title: 'SOLAR SHELTERS',
    tagline: 'Safe, powered spaces for the worst hours',
    body:
      'Solar-powered cooling and hydration shelters designed for the hours when grid pressure is highest and shade is hardest to find. Built to deploy at transit stops, parks, encampment outreach sites, and partner properties.',
    status: 'Prototype unit · partner conversations open',
    image: '/images/new-design/homepage-redesign/shelter/shelter-aerial.png',
    href: '/initiatives/solar-shelter',
    features: [
      'Off-grid solar generation with battery buffer',
      'Cooling, hydration, and rest in a footprint that fits a sidewalk',
      'Modular: deploy one, scale to a network',
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ WHAT WE&rsquo;RE BUILDING NOW</p>
          <h2>The Phoenix Heat Relief Network, three connected initiatives, one mission.</h2>
          <p>
            Fox Haven Group is in active build on three production initiatives, each one
            designed to interoperate with the others. Resident-facing tools, physical
            infrastructure, and the operational systems that keep both running.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/partner">
              Partner with us
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/platform">
              See the platform
              <span className={styles.playArrow} aria-hidden="true">
                ▷
              </span>
            </Link>
          </div>
        </div>

        <figure className={styles.detailShots}>
          <div className={styles.detailShotPrimary}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/new-design/homepage-redesign/shelter/shelter-aerial.png"
              alt="Aerial concept rendering of a solar-powered cooling shelter network"
              loading="lazy"
            />
            <figcaption>Solar cooling shelter · aerial concept</figcaption>
          </div>
        </figure>
      </section>

      {/* ── Stats strip ── */}
      <div className={styles.detailStats}>
        {PROJECT_STATS.map((s) => (
          <div key={s.label} className={styles.detailStat}>
            <span className={styles.detailStatValue}>{s.value}</span>
            <span className={styles.detailStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Project list ── */}
      {PROJECTS.map((project) => (
        <section key={project.title} className={styles.detailSection}>
          <div className={styles.detailIntro}>
            <p className={styles.eyebrow}>
              ◉ {project.number} · {project.tagline}
            </p>
            <h2>{project.title}</h2>
            <p>{project.body}</p>
            <p className={styles.missionCite}>{project.status}</p>
            <div className={styles.detailActions}>
              <Link className={styles.solidButton} href={project.href}>
                Learn more
                <span className={styles.linkArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>

          <figure className={styles.detailShots}>
            <div className={styles.detailShotPrimary}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
              <figcaption>
                {project.title.toLowerCase()} · {project.tagline.toLowerCase()}
              </figcaption>
            </div>
          </figure>

          <ul className={styles.detailFeatures}>
            {project.features.map((f, idx) => (
              <li key={idx}>
                <strong>{`0${idx + 1}`}</strong>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* ── Shelter gallery ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ ON THE GROUND</p>
          <h2>What the Solar Shelter actually looks like.</h2>
          <p>
            Renders, prototype shots, and field studies from the shelter design process. Every
            decision, from the canopy angle to the seating layout, is shaped by how people
            actually use shaded space during a Phoenix summer.
          </p>
        </div>
      </section>

      <div className={styles.detailGallery}>
        {[
          { src: '/images/new-design/homepage-redesign/shelter/shelter-front.png', caption: 'Front elevation' },
          { src: '/images/new-design/homepage-redesign/shelter/shelter-angle.png', caption: 'Three-quarter view' },
          { src: '/images/new-design/homepage-redesign/shelter/shelter-interior.png', caption: 'Interior · cooling + hydration' },
          { src: '/images/new-design/homepage-redesign/shelter/shelter-people.png', caption: 'In use · sidewalk deployment' },
        ].map((shot) => (
          <figure key={shot.src} className={styles.detailGalleryItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.caption} loading="lazy" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* ── CTA ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ GET INVOLVED</p>
          <h2>Help us deploy faster.</h2>
          <p>
            Every active project needs partners, cities to host, healthcare providers to
            integrate, community organizations to ground-truth, and funders to accelerate.
          </p>
          <div className={styles.detailActions}>
            <Link className={styles.solidButton} href="/partner">
              Partner with us
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </Link>
            <Link className={styles.outlineButton} href="/contact">
              Just say hi
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
