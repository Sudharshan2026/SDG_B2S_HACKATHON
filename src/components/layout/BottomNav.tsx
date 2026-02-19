'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Zap, Newspaper, MessageCircle, Users } from 'lucide-react';
import { useApp } from '@/lib/store';

const userNav = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/schemes', icon: FileText, label: 'Schemes' },
  { href: '/utilities', icon: Zap, label: 'Utilities' },
  { href: '/news', icon: Newspaper, label: 'News' },
  { href: '/chatbot', icon: MessageCircle, label: 'Chatbot' },
  { href: '/directory', icon: Users, label: 'Directory' },
];

export function BottomNav() {
  const pathname = usePathname();
  const { panel } = useApp();

  if (panel !== 'user') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-pb z-50">
      <div className="flex justify-around py-3 max-w-2xl mx-auto">
        {userNav.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] transition-colors ${
                isActive ? 'text-slate-800 font-medium' : 'text-slate-500'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
