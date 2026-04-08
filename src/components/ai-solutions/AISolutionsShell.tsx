'use client';

import { useEffect } from 'react';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { ConstellationBg } from '@/components/ui/ConstellationBg';
import SubNav from './SubNav';

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
    <div className="relative min-h-screen text-[#F1F5F9]">
      {/* Constellation canvas */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <ConstellationBg />
      </div>

      <div className="relative z-10">
        <Nav />
        <SubNav />
        {children}
        <Footer />
      </div>
    </div>
  );
}
