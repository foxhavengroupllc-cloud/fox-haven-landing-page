import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Activity,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Users,
  Shield,
  Landmark,
  GraduationCap,
  HeartHandshake,
  Briefcase,
  Building2,
  LineChart,
} from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';

export const metadata: Metadata = {
  title: 'Systems | Fox Haven Group',
  description:
    'Implementation and systems change transfer across behavioral health, public safety, substance use, maternal health, community health, government, and more. Applications, not identity.',
};

const domains = [
  { Icon: Activity, title: 'Substance Use', body: 'Prevention, harm reduction, treatment, and recovery systems — including overdose prevention.' },
  { Icon: HeartPulse, title: 'Behavioral Health', body: 'Systems of care, crisis response, and recovery.' },
  { Icon: Stethoscope, title: 'Maternal & Child Health', body: 'Better outcomes across the care continuum.' },
  { Icon: ShieldCheck, title: 'Violence Prevention', body: 'Coordinated, evidence-based prevention and response.' },
  { Icon: Users, title: 'Community Health', body: 'Equity, social determinants, and population health.' },
  { Icon: Shield, title: 'Public Safety', body: 'Reentry, diversion, and cross-system coordination.' },
  { Icon: Landmark, title: 'Public Policy & Systems', body: 'Policy-to-practice translation and systems transformation.' },
  { Icon: GraduationCap, title: 'Education & Youth', body: 'School climate, attendance, and opportunity pathways.' },
  { Icon: HeartHandshake, title: 'Aging & Care Systems', body: 'Coordinated care for aging populations and caregivers.' },
  { Icon: Briefcase, title: 'Workforce Development', body: 'Pipelines, capacity, and credentialing.' },
  { Icon: Building2, title: 'Government Modernization', body: 'Process improvement and digital transformation.' },
  { Icon: LineChart, title: 'Evaluation', body: 'Measurement, learning, and continuous improvement.' },
];

export default function SystemsPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Where We Work</p>
          <h1 className={styles.display}>Many applications. One purpose.</h1>
          <p className={styles.pageHeroLead}>
            Our core expertise is not a single issue area. It is helping complex systems implement
            evidence-based work with fidelity, fit, and buy-in.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark} ${styles.gridLines}`}>
        <div className={styles.container}>
          <div className={`${styles.domainGrid} reveal`}>
            {domains.map(({ Icon, title, body }) => (
              <article className={styles.domainCard} key={title}>
                <Icon size={22} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.sectionHead} reveal`} style={{ maxWidth: '62ch' }}>
            <p className={styles.eyebrow}>Applications, not identity</p>
            <h2 className={styles.h2}>
              Overdose prevention is one visible application of our work, not the boundary of it.
            </h2>
            <p className={styles.body}>
              We work across public health, safety, and community systems to help teams overcome a
              common hurdle: making good policy work in the real world. No matter the specific topic,
              our focus is always on taking evidence and strategy and putting them into practice.
            </p>
            <p className={styles.closingLine}>
              If your challenge crosses systems, it&rsquo;s in our domain.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>Built for complex community challenges.</p>
              <h2 className={styles.h2}>Don&rsquo;t see your issue area? It probably still fits.</h2>
            </div>
            <div className={styles.btnRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contact">
                Start a Conversation
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
