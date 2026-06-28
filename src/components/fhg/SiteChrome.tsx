'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import BrandMark from './BrandMark';
import styles from '@/styles/fhg.module.css';

export const navItems = [
  { label: 'Method', href: '/method' },
  { label: 'Services', href: '/services' },
  { label: 'Systems', href: '/systems' },
  // Field Notes is hidden from nav until we have published pieces to show.
  // The page still exists at /field-notes — just unlinked for now.
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Brand() {
  return (
    <Link href="/" className={styles.brand} aria-label="Fox Haven Group, home">
      <BrandMark />
      <span className={styles.brandText}>
        FOX HAVEN
        <small>GROUP</small>
      </span>
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
  { label: 'Method', href: '/method' },
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
          <p className={styles.footerBrandLine}>Evidence into action. Systems into motion.</p>
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
          <h4>Firm</h4>
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
