import styles from '@/styles/fhg.module.css';
import { formatPrice, type Product } from '@/lib/services-data';

/**
 * Renders the priced products for a service detail page. Each block shows the
 * product name, a prominent price + quiet pricing model, and labelled
 * "What it is / Delivered / Who buys it" rows. Mobile-first; stacks under ~700px.
 */
export default function PricingTable({ products }: { products: Product[] }) {
  return (
    <div className={styles.priceList}>
      {products.map((p) => (
        <article className={styles.priceCard} key={p.id}>
          <div className={styles.priceCardHead}>
            <h3 className={styles.priceName}>{p.name}</h3>
            <div className={styles.priceAmountWrap}>
              <span className={styles.priceAmount}>{formatPrice(p)}</span>
              <span className={styles.tag}>{p.model}</span>
            </div>
          </div>

          <dl className={styles.priceMeta}>
            <div className={styles.priceMetaRow}>
              <dt className={styles.priceMetaLabel}>What it is</dt>
              <dd className={styles.priceMetaValue}>{p.whatItIs}</dd>
            </div>
            <div className={styles.priceMetaRow}>
              <dt className={styles.priceMetaLabel}>Delivered</dt>
              <dd className={styles.priceMetaValue}>{p.delivered}</dd>
            </div>
            <div className={styles.priceMetaRow}>
              <dt className={styles.priceMetaLabel}>Who buys it</dt>
              <dd className={styles.priceMetaValue}>{p.whoBuys}</dd>
            </div>
          </dl>

          {p.note && <p className={styles.priceProductNote}>{p.note}</p>}
        </article>
      ))}
    </div>
  );
}
