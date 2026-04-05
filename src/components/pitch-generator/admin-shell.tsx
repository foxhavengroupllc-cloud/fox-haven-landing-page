'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface Props {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: '/admin/pitch-generator', label: 'Generator' },
  { href: '/admin/pitch-runs', label: 'Runs' },
];

export function useAdminAuth() {
  const [creds, setCreds] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-creds');
    if (stored) setCreds(stored);
    setChecking(false);
  }, []);

  const login = useCallback((user: string, pass: string) => {
    const encoded = btoa(`${user}:${pass}`);
    sessionStorage.setItem('admin-creds', encoded);
    setCreds(encoded);
  }, []);

  const authHeader = creds ? `Basic ${creds}` : '';

  return { creds, checking, login, authHeader };
}

export function AdminLogin({
  onLogin,
}: {
  onLogin: (user: string, pass: string) => void;
}) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="min-h-screen bg-[#060f1d] flex items-center justify-center">
      <div className="w-full max-w-sm bg-[#0b1c2e] border border-white/[.08] rounded-2xl p-8">
        <h1 className="font-display text-2xl font-semibold text-white mb-1">
          Fox Haven Admin
        </h1>
        <p className="text-[13px] text-white/40 mb-6">
          Pitch Engine access required
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(user, pass);
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full bg-white/[.04] border border-white/[.1] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#e05e14]/50 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full bg-white/[.04] border border-white/[.1] rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-white/25 focus:border-[#e05e14]/50 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#e05e14] text-white font-semibold text-[14px] hover:bg-[#c4500f] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#060f1d]">
      {/* Top bar */}
      <header className="border-b border-white/[.06] bg-[#0b1c2e]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-display text-[15px] font-semibold text-white/80 hover:text-white transition-colors"
            >
              Fox Haven
            </Link>
            <span className="text-white/15">|</span>
            <span className="text-[11px] tracking-[.1em] uppercase text-[#e05e14] font-semibold">
              Pitch Engine
            </span>
          </div>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-white/[.08] text-white'
                    : 'text-white/40 hover:text-white/70',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
