import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  FileSearch,
  Users,
  LayoutGrid,
  HandHeart,
  BarChart3,
  RefreshCw,
  Target,
  Wrench,
  Presentation,
  FileText,
  PieChart,
  Pill,
  Brain,
  Baby,
  ShieldCheck,
  HeartPulse,
  Shield,
  HeartHandshake,
  Landmark,
  Briefcase,
  Linkedin,
  Mail,
} from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header } from '@/components/fhg/SiteChrome';
import BrandMark from '@/components/fhg/BrandMark';
import SystemsMap from '@/components/fhg/SystemsMap';
import SubscribeForm from '@/components/fhg/SubscribeForm';

export const metadata: Metadata = {
  title: 'Fox Haven Group | Evidence into Action. Systems into Motion.',
  description:
    'Fox Haven Group helps public agencies, nonprofits, coalitions, and communities implement evidence-based solutions through strategy, technical assistance, training, facilitation, evaluation, and policy-to-practice support.',
};

const TEAL = '#00b8b5';
const PURPLE = '#7c4dd0';
const alt = (i: number) => (i % 2 === 0 ? TEAL : PURPLE);

const bridge = [
  { n: '1', t: 'Translate', d: 'Turn evidence, research, and policy into a clear, actionable strategy.', Icon: FileSearch },
  { n: '2', t: 'Align', d: 'Bring the right partners, agencies, and communities around shared goals.', Icon: Users },
  { n: '3', t: 'Build', d: 'Create the structures, plans, and tools that make implementation possible.', Icon: LayoutGrid },
  { n: '4', t: 'Support', d: 'Provide technical assistance, coaching, and facilitation to navigate real-world challenges.', Icon: HandHeart },
  { n: '5', t: 'Evaluate', d: "Measure what's working, learn what's not, and adapt as you go.", Icon: BarChart3 },
  { n: '6', t: 'Sustain', d: 'Embed the work into systems, funding, roles, and policies for lasting change.', Icon: RefreshCw },
];

const services = [
  { t: 'Strategic Planning', d: 'Build roadmaps that align priorities and resources.', Icon: Target },
  { t: 'Stakeholder Engagement', d: 'Facilitate alignment across agencies, partners, and communities.', Icon: Users },
  { t: 'Technical Assistance', d: 'Ongoing support that strengthens implementation.', Icon: Wrench },
  { t: 'Training & Facilitation', d: 'Build the skills and capacity that drive the work forward.', Icon: Presentation },
  { t: 'Policy Translation', d: 'Convert policy and funding into field-ready guidance.', Icon: FileText },
  { t: 'Evaluation & Learning', d: 'Measure progress, inform decisions, and improve outcomes.', Icon: PieChart },
];

const domains = [
  { t: 'Substance Use', Icon: Pill },
  { t: 'Behavioral Health', Icon: Brain },
  { t: 'Maternal Health', Icon: Baby },
  { t: 'Violence Prevention', Icon: ShieldCheck },
  { t: 'Community Health', Icon: HeartPulse },
  { t: 'Public Safety', Icon: Shield },
  { t: 'Nonprofit Capacity Building', Icon: HeartHandshake },
  { t: 'Government Modernization', Icon: Landmark },
  { t: 'Workforce Development', Icon: Briefcase },
  { t: 'Evaluation', Icon: BarChart3 },
];

// PLACEHOLDER metrics — verify before launch (brief §15). Numbers intentionally blank.
const proof = [
  'Communities supported',
  'Strategic plans & roadmaps built',
  'Trainings & facilitations delivered',
  'Agencies & coalitions receiving ongoing technical assistance',
  'Years of cross-sector implementation experience',
];

function HeroPhoto() {
  return (
    <div className={styles.heroPhoto}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.heroPhotoImg}
        src="/images/grit/hero-photo.webp"
        alt="Community members gathered in an urban neighborhood beneath a city skyline at dusk"
      />
      <svg className={styles.heroDataOverlay} viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="#00b8b5" strokeWidth="1" opacity="0.5" fill="none">
          <path d="M30 70 L150 45 L260 95 L380 55 L500 105 L580 65" />
          <path d="M150 22 L150 45 M260 64 L260 95 M380 32 L380 55 M500 74 L500 105" />
        </g>
        {[[150, 45], [260, 95], [380, 55], [500, 105]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" fill="#00b8b5" />
        ))}
      </svg>
      <div className={styles.quoteBox}>
        <p>
          Where evidence survives contact with the <span className={styles.teal}>real world.</span>
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.gritShell}>
      <div className={styles.gritBg} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      {/* ── HERO ── */}
      <section className={styles.gritHero}>
        <div className={styles.gritHeroInner}>
          <div className={styles.gritHeroCopy}>
            <h1 className={styles.heroTitlePoster}>
              Evidence into action.
              <span className={styles.tealLine}>Systems into motion.</span>
            </h1>
            <p className={styles.gritSub}>
              We help public agencies, nonprofits, coalitions, and communities implement
              evidence-based solutions through strategy, technical assistance, training,
              facilitation, evaluation, and policy-to-practice support.
            </p>
            <div className={styles.gritActions}>
              <Link className={`${styles.gritBtn} ${styles.gritBtnSolid}`} href="/method">
                Map the System
                <ArrowRight size={16} />
              </Link>
              <Link className={`${styles.gritBtn} ${styles.gritBtnOutline}`} href="/contact">
                Build the Roadmap
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <HeroPhoto />
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className={styles.paperBand}>
        <div className={styles.container}>
          <div className={styles.problemGridG}>
            <div className="reveal">
              <span className={styles.kicker}>The Problem</span>
              <h2 className={styles.problemTitle}>
                Good ideas die in the{' '}
                <span className={styles.gapWrap}>
                  implementation gap.
                  <svg className={styles.gapCircle} viewBox="0 0 320 90" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M250 14 C150 -2 40 6 22 44 C8 76 130 86 210 82 C300 77 322 50 296 30 C276 14 210 10 150 14" />
                  </svg>
                </span>
              </h2>
              <p className={styles.problemBody}>
                Strategies don&rsquo;t fail because they lack evidence. They fail when policy,
                funding, workforce, data, public safety, and community trust don&rsquo;t line up.
              </p>
              <p className={styles.workGaps}>We work in the gaps.</p>
            </div>
            <div className="reveal">
              <SystemsMap />
            </div>
          </div>
        </div>
      </section>

      {/* ── APPROACH / BRIDGE ── */}
      <section className={`${styles.approach} ${styles.gridLines}`}>
        <div className={styles.container}>
          <span className={styles.kicker}>Our Approach</span>
          <h2 className={styles.poster} style={{ fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', color: 'var(--bone)' }}>
            The Implementation Bridge<span className={styles.teal} style={{ fontStyle: 'normal' }}>™</span>
          </h2>
          <div className={`${styles.bridgeRow} reveal`}>
            {bridge.map((s, i) => (
              <Link href="/method" className={styles.bridgeCol} key={s.n}>
                <span className={`${styles.bridgeCircle} ${i % 2 === 0 ? styles.bridgeTeal : styles.bridgePurple}`}>
                  <s.Icon size={28} strokeWidth={1.5} />
                </span>
                <h3 className={styles.bridgeTitleG}>{s.n}. {s.t}</h3>
                <p className={styles.bridgeDescG}>{s.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO / APPLICATIONS ── */}
      <section className={styles.paperBand}>
        <div className={styles.container}>
          <div className={styles.doInner}>
            <div className={`${styles.doLeft} reveal`}>
              <span className={styles.kicker}>What We Do</span>
              <h2 className={styles.bandTitle}>Practical solutions. Real-world results.</h2>
              <div className={styles.svcList}>
                {services.map((s, i) => (
                  <Link href="/services" className={styles.svcItem} key={s.t}>
                    <s.Icon size={22} strokeWidth={1.6} color={alt(i)} />
                    <div>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="reveal">
              <span className={styles.kicker}>Built for Complex Challenges</span>
              <h2 className={styles.bandTitle}>Our work. Many applications.</h2>
              <div className={styles.appGrid}>
                {domains.map((d, i) => (
                  <Link href="/systems" className={styles.appItem} key={d.t}>
                    <d.Icon size={26} strokeWidth={1.5} color={alt(i)} />
                    <span>{d.t}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className={styles.proofBand}>
        <div className={styles.container}>
          <div className={styles.proofInner}>
            <div className={styles.proofIntro}>
              <span className={styles.kicker}>Proof in Practice</span>
              <p>We partner with communities to turn strategy into systems that deliver results.</p>
            </div>
            {proof.map((label) => (
              <div className={styles.proofStat} key={label}>
                <div className={styles.proofNum}>—</div>
                <div className={styles.proofLabel}>{label}</div>
              </div>
            ))}
            <p className={styles.proofPlaceholderNote}>
              Metrics pending verification — real figures to be confirmed before launch.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER / CTA ── */}
      <footer className={styles.bigFooter}>
        <div className={styles.bigFooterInner}>
          <div className={styles.footerSlogan}>
            <Link href="/method"><b>Evidence</b></Link>
            <Link href="/systems"><b>Policy</b></Link>
            <Link href="/services"><b>Practice</b></Link>
            <Link href="/about"><b>People</b></Link>
            <Link className={styles.footerSloganBox} href="/method">That&rsquo;s the bridge.</Link>
          </div>

          <div className={styles.footerColG}>
            <h4>Stay Connected</h4>
            <p>Insights, tools, and field notes for people working to change systems from the inside out.</p>
            <SubscribeForm />
          </div>

          <div className={styles.footerColG}>
            <h2 className={styles.letsBuildTitle}>Let&rsquo;s build what works.</h2>
            <p>Ready to map your system and build a plan that moves?</p>
            <Link className={`${styles.gritBtn} ${styles.gritBtnSolid}`} href="/contact" style={{ marginTop: '1rem' }}>
              Start the Conversation
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.footerBrandG}>
            <Link href="/" className={styles.brand} aria-label="Fox Haven Group, home">
              <BrandMark />
              <span className={styles.brandText}>
                FOX HAVEN
                <small>GROUP</small>
              </span>
            </Link>
            <p className={styles.footerBrandTag}>Evidence into action. Systems into motion.</p>
            <div className={styles.socials}>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
              </a>
              <a href="mailto:hello@foxhavengrouphq.com" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottomG}>
          <span>© 2026 Fox Haven Group, LLC</span>
          <nav>
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
