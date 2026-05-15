import Link from 'next/link';
import { Mail, MapPin, Clock, Shield } from 'lucide-react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import PartnerLeadForm from '@/components/partner/PartnerLeadForm';
import styles from '@/styles/design-system.module.css';

/**
 * /contact, Get in touch
 *
 * Single front door for every kind of inbound message. Routes specific
 * intents to the right form (partner, audit) and provides a general-purpose
 * message form for everything else. Every submission flows through the same
 * /api/leads endpoint with a contact-page source tag.
 */

const CONTACT_FACTS = [
  { Icon: Clock, label: 'Reply time', value: 'Two business days' },
  { Icon: Mail, label: 'Email', value: 'hello@foxhavengrouphq.com' },
  { Icon: MapPin, label: 'Headquartered', value: 'Phoenix, Arizona' },
  { Icon: Shield, label: 'Designation', value: 'SDVOSB · Veteran-owned' },
];

const ROUTES = [
  {
    title: 'You want to partner',
    body: 'Cities, community organizations, healthcare providers, and mission-aligned businesses ready to deploy with us.',
    href: '/partner',
    cta: 'Open the partner page',
  },
  {
    title: 'You run a business and want AI to actually help',
    body: 'A free 12-minute audit that scores your operations, estimates dollar impact, and surfaces the three highest-ROI fixes.',
    href: '/audit',
    cta: 'Take the free assessment',
  },
  {
    title: 'You want to know what we&rsquo;re building',
    body: 'Three active initiatives in production: Heat Relief App, Solar Shelters, and System Solutions. See them all in one place.',
    href: '/projects',
    cta: 'See the projects',
  },
  {
    title: 'You want the technical picture',
    body: 'The platform behind every Fox Haven product, four layers: civic infrastructure, population flow, AI concierge, and operational worlds.',
    href: '/platform',
    cta: 'Read the platform overview',
  },
];

export default function ContactPage() {
  return (
    <main className={styles.pageShell}>
      <Header />

      {/* ── Hero ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◈ GET IN TOUCH</p>
          <h2>Every message reaches a real human.</h2>
          <p>
            No call-center queues. No auto-responder drip. The form below goes to a small team
            in Phoenix and we reply within two business days, even when the answer is
            &ldquo;we&rsquo;re not the right fit, here&rsquo;s who is.&rdquo;
          </p>
          <div className={styles.detailActions}>
            <a className={styles.solidButton} href="#contact-form">
              Send a message
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </a>
            <a className={styles.outlineButton} href="mailto:hello@foxhavengrouphq.com">
              Email us directly
              <span className={styles.linkArrow} aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        <ul className={styles.detailFeatures}>
          {CONTACT_FACTS.map((fact) => (
            <li key={fact.label}>
              <strong>
                <fact.Icon
                  size={14}
                  strokeWidth={2.2}
                  style={{ verticalAlign: 'middle', marginRight: '0.4rem' }}
                />
                {fact.label}
              </strong>
              <span>{fact.value}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Stats / facts strip ── */}
      <div className={styles.detailStats}>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>2 days</span>
          <span className={styles.detailStatLabel}>Typical response time</span>
        </div>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>100%</span>
          <span className={styles.detailStatLabel}>Human-read messages</span>
        </div>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>Free</span>
          <span className={styles.detailStatLabel}>Discovery calls</span>
        </div>
        <div className={styles.detailStat}>
          <span className={styles.detailStatValue}>0</span>
          <span className={styles.detailStatLabel}>Sales-pressure tactics</span>
        </div>
      </div>

      {/* ── Pick your door ── */}
      <section className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ PICK YOUR DOOR</p>
          <h2>Most questions already have a better front door.</h2>
          <p>
            Some asks belong on a purpose-built page so you get the right context up front.
            Find yours below, or skip straight to the form if none fit.
          </p>
        </div>
      </section>

      <div className={styles.serviceGrid}>
        {ROUTES.map((route) => (
          <Link key={route.href} href={route.href} className={styles.serviceCard}>
            <span className={styles.serviceCategory}>Route</span>
            <h3 className={styles.serviceTitle} dangerouslySetInnerHTML={{ __html: route.title }} />
            <p className={styles.serviceOutcome}>{route.body}</p>
            <span style={{ marginTop: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--terracotta)', fontWeight: 600, fontSize: '0.9rem' }}>
              {route.cta} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>

      {/* ── General contact form ── */}
      <section id="contact-form" className={styles.detailSection}>
        <div className={styles.detailIntro}>
          <p className={styles.eyebrow}>◉ GENERAL MESSAGE</p>
          <h2>Or just write to us.</h2>
          <p>
            Anything that doesn&rsquo;t fit one of the doors above, press, careers,
            collaboration ideas, feedback, an honest question. The same team reads everything.
          </p>
          <p className={styles.auditFooterCopy} style={{ textAlign: 'left', marginTop: '0.6rem' }}>
            Prefer email?{' '}
            <a className={styles.auditFooterLink} href="mailto:hello@foxhavengrouphq.com">
              hello@foxhavengrouphq.com
            </a>
          </p>
        </div>

        <PartnerLeadForm source="partner-contact" />
      </section>

      <Footer />
    </main>
  );
}
