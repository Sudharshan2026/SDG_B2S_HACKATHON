'use client';

import Link from 'next/link';
import { useApp } from '@/lib/store';

export function Header() {
  const { panel } = useApp();

  const titles: Record<string, string> = {
    user: 'Hometown Connect',
    admin: 'Admin Panel',
    super: 'Super Admin Panel',
  };

  const homeHref = panel === 'user' ? '/' : panel === 'admin' ? '/admin' : '/super';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <Link href={homeHref} className="block">
          <h1 className="text-base font-semibold tracking-tight text-slate-800">{titles[panel] || 'Hometown Connect'}</h1>
          <p className="text-xs text-slate-500 mt-0.5">Stay connected to your hometown</p>
        </Link>
      </div>
    </header>
  );
}
