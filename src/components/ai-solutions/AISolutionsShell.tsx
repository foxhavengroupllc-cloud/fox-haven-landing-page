'use client';

import { useEffect } from 'react';
import { Header, Footer } from '@/components/new-home/SiteChrome';
import styles from '@/styles/design-system.module.css';
import SubNav from './SubNav';

/**
 * Wraps every /ai-solutions/* page with the new design system's chrome
 * (Header + Footer from SiteChrome), keeping the existing SubNav for
 * inter-page navigation between the hub and its sub-routes.
 *
 * The body bg is forced to a dark navy here because some pages inside
 * mix dark sections with the cream design-system sections, and a dark
 * floor reads better in transition gaps than the default cream.
 */
export default function AISolutionsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0b1c2e';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return (
    <main className={styles.pageShell}>
      <Header />
      <SubNav />
      {children}
      <Footer />
    </main>
  );
}
