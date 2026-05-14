import styles from '@/styles/design-system.module.css';

/**
 * Shared chrome (Header, Footer, Brand) for the homepage-redesign sandbox
 * and its sub-pages (e.g. /heat-relief-app).
 *
 * Nav anchors are absolute (pointing back to `/preview/new-home#…`)
 * so the same Header works from any page in this group.
 */

const HOMEPAGE_PATH = '/';

export const navItems = [
  { label: 'Platform', href: '/platform' },
  { label: 'Projects', href: '/projects' },
  { label: 'Mission', href: '/mission' },
  { label: 'Partner', href: '/partner' },
  { label: 'Contact', href: '/contact' },
];

export function Brand() {
  return (
    <a className={styles.brand} href={HOMEPAGE_PATH} aria-label="FOXHAVEN GROUP">
      <span className={styles.brandMark} aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className={styles.brandText}>
        FOXHAVEN
        <span>GROUP</span>
      </span>
    </a>
  );
}

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Brand />
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className={styles.primaryNavButton} href="/partner">
          Get Involved
          <span className={styles.linkArrow} aria-hidden="true">
            →
          </span>
        </a>
        <details className={styles.mobileNav}>
          <summary>Menu</summary>
          <div>
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="/partner">Get Involved</a>
          </div>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footerBrand}>
        <strong>FOXHAVEN GROUP</strong>
        <span>Systems for a hotter world. Built for human thriving.</span>
      </div>
    </footer>
  );
}
