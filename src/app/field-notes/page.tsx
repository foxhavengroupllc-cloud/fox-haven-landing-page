import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/fhg.module.css';
import { Header, Footer } from '@/components/fhg/SiteChrome';
import { supabase } from '@/db';

export const metadata: Metadata = {
  title: 'Field Notes | Fox Haven Group',
  description:
    'Practical thinking on what it actually takes to move systems — from policy to practice. Field notes from the implementation gap.',
};

// Published issues are fetched at request time so a new publish shows up
// immediately, with no redeploy.
export const dynamic = 'force-dynamic';

type PublishedIssue = {
  slug: string;
  issue_number: string;
  title: string;
  source_tag: string;
};

async function getPublishedIssues(): Promise<PublishedIssue[]> {
  try {
    const { data } = await supabase
      .from('newsletter_issues')
      .select('slug, issue_number, title, source_tag')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    return (data as PublishedIssue[]) ?? [];
  } catch {
    // Table not migrated yet, or Supabase unavailable: fall back gracefully.
    return [];
  }
}

// Upcoming pieces — titles only. Bodies are intentionally not written yet;
// each card is clearly marked "Coming soon" rather than fabricated. Published
// issues from the dashboard take the lead slots in the same grid below; the
// first placeholder was replaced by the first published issue.
const notes = [
  { tag: 'Policy', title: 'The Implementation Gap Between Policy and Practice' },
  { tag: 'Coalitions', title: 'What Coalitions Need After the Strategic Plan' },
  { tag: 'Practice', title: 'Technical Assistance Is Not Training' },
  { tag: 'Cross-sector', title: 'Public Health and Public Safety Need a Shared Operating Model' },
  { tag: 'Funding', title: 'How to Translate Grant Requirements Into Field Action' },
  { tag: 'Governance', title: 'Why Systems Change Requires Governance, Not Just Goodwill' },
  { tag: 'Teams', title: 'The Difference Between a Workgroup and an Implementation Team' },
  { tag: 'Science', title: 'What Implementation Science Looks Like in Community Systems' },
  { tag: 'Infrastructure', title: 'Why Good Policy Still Fails Without Implementation Infrastructure' },
];

export default async function FieldNotesPage() {
  const issues = await getPublishedIssues();

  return (
    <main className={styles.shell}>
      <div className={styles.grain} aria-hidden="true" />
      <Header />

      <section className={styles.pageHero}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Field Notes</p>
          <h1 className={styles.display}>Field notes from the implementation gap.</h1>
          <p className={styles.pageHeroLead}>
            Practical thinking on what it actually takes to move systems — from policy to practice,
            from strategy to execution. Our first pieces are in the works.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={`${styles.notesGrid} reveal`}>
            {/* Published issues — same card format, leading the grid. */}
            {issues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/field-notes/${issue.slug}`}
                className={styles.noteCard}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className={styles.noteMeta}>
                  <span>{issue.source_tag || 'The Signal'}</span>
                  <span>{issue.issue_number}</span>
                </div>
                <h3>{issue.title}</h3>
                <span className={styles.tag}>Read issue</span>
              </Link>
            ))}

            {/* Upcoming pieces. */}
            {notes.map((n) => (
              <article className={styles.noteCard} key={n.title}>
                <div className={styles.noteMeta}>
                  <span>{n.tag}</span>
                  <span>Coming soon</span>
                </div>
                <h3>{n.title}</h3>
                <span className={styles.tag}>Draft in progress</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionPlum}`}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div>
              <p className={styles.eyebrow}>Want these in your inbox?</p>
              <h2 className={styles.h2}>Tell us what you&rsquo;re working on.</h2>
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
