'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Linkedin, Mail, ArrowUpRight, ChevronDown } from 'lucide-react';
import styles from '@/styles/fhg.module.css';

export const navItems = [
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Services', href: '/services' },
  { label: 'Systems', href: '/systems' },
  // Field Notes is hidden from nav until we have published pieces to show.
  // The page still exists at /field-notes — just unlinked for now.
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** The four engagement areas, shown as a dropdown under Services. */
export const serviceChildren = [
  { label: 'Systems Diagnostic', href: '/services/systems-diagnostic' },
  { label: 'Implementation Blueprint', href: '/services/implementation-blueprint' },
  { label: 'Technical Assistance Partner', href: '/services/technical-assistance-partner' },
  { label: 'Systems Change Initiative', href: '/services/systems-change-initiative' },
];

export function Brand() {
  return (
    <Link href="/" className={styles.brand} aria-label="Fox Haven Group, home">
      {/* Full reversed horizontal lockup from the 2026 brand sheet (886x340 source). */}
      <Image
        src="/images/brand/lockup-horizontal.png"
        width={209}
        height={80}
        alt="Fox Haven Group — Overdose-response. Strategy. Evaluation. Implementation. Public health solutions that save lives."
        priority
      />
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Brand />
        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;
            // Services carries a dropdown listing the four engagement areas.
            if (item.href === '/services') {
              return (
                <span className={styles.navDrop} key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                  >
                    {item.label}
                  </Link>
                  <ChevronDown size={12} className={styles.navDropCaret} aria-hidden="true" />
                  <div className={styles.navDropMenu}>
                    <div className={styles.navDropMenuInner}>
                      {serviceChildren.map((c) => (
                        <Link key={c.href} href={c.href}>
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </span>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/contact" className={styles.headerCta}>
          Start the conversation
        </Link>
        <button
          type="button"
          className={`${styles.menuToggle} ${styles.headerCta}`}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <ul className={styles.mobileMenu}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
              {item.href === '/services' &&
                serviceChildren.map((c) => (
                  <div className={styles.mobileSubItem} key={c.href}>
                    <Link href={c.href} onClick={() => setOpen(false)}>
                      {c.label}
                    </Link>
                  </div>
                ))}
            </li>
          ))}
          <li>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Start the conversation
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

const footerExplore = [
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Services', href: '/services' },
  { label: 'Systems', href: '/systems' },
];

const footerFirm = [
  // Field Notes hidden until we publish pieces (page still lives at /field-notes).
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <Brand />
          <p className={styles.footerBrandLine}>Evidence. Policy. Practice. People. That&rsquo;s The Bridge.</p>
        </div>
        <div className={styles.footerCol}>
          <h4>Explore</h4>
          {footerExplore.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className={styles.footerCol}>
          <h4>Fox Haven Group</h4>
          {footerFirm.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <a href="mailto:hello@foxhavengrouphq.com">hello@foxhavengrouphq.com</a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 Fox Haven Group. All rights reserved.</span>
        <div className={styles.socials}>
          <a href="https://www.linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} />
          </a>
          <a href="mailto:hello@foxhavengrouphq.com" aria-label="Email">
            <Mail size={16} />
          </a>
          <a href="/contact" aria-label="Contact">
            <ArrowUpRight size={16} />
          </a>
        </div>
        <nav>
          <Link href="/contact">Privacy</Link>
          <Link href="/contact">Terms</Link>
          <Link href="/contact">Accessibility</Link>
        </nav>
      </div>
    </footer>
  );
}
