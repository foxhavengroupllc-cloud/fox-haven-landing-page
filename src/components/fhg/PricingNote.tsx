import styles from '@/styles/fhg.module.css';

/**
 * Standing pricing/ethics note shown on every service detail page.
 * Non-negotiable per the catalog: grant work is never priced as a
 * percentage of the award.
 */
export default function PricingNote() {
  return (
    <aside className={styles.priceNoteBlock}>
      <p>
        {/* Block heading with breathing room below, per the 6/28 punch list. */}
        <strong style={{ display: 'block', marginBottom: '0.5rem' }}>How we price.</strong>
        Every engagement is a flat fee, an hourly rate, or a
        retainer with a defined deliverable you can put in a purchase order. We never price grant
        work as a percentage of the award — federal agencies and major funders prohibit contingency
        and success-fee pricing, and it can disqualify an application. Application-development fees
        are paid from non-federal funds; post-award services are billed into the award budget as
        allowable contractual costs. Standard rate $150/hour ($1,200/day); custom and overflow work
        quoted accordingly. Ranges are scoped per engagement — ask and we&rsquo;ll quote yours.
      </p>
    </aside>
  );
}
