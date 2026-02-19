'use client';

import { useMemo } from 'react';
import { useApp } from '@/lib/store';
import Link from 'next/link';
import {
  FileText,
  Zap,
  Newspaper,
  MessageCircle,
  Users,
  Bot,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { schemes, alerts } from '@/lib/mock-data';

export default function HomePage() {

  // ✅ Prevent infinite re-render
  const { panel } = useApp();

  // ✅ Memoized data
  const activeSchemes = useMemo(
    () => schemes.filter((s) => s.status === 'active').slice(0, 3),
    []
  );

  const activeAlerts = useMemo(
    () =>
      alerts.filter(
        (a) => !a.endAt || new Date(a.endAt) > new Date()
      ),
    []
  );

  // 🔹 Panel redirects for demo
  if (panel === 'admin') {
    return (
      <div className="py-8">
        <Link
          href="/admin"
          className="px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg"
        >
          Admin Dashboard →
        </Link>
      </div>
    );
  }

  if (panel === 'super') {
    return (
      <div className="py-8">
        <Link
          href="/super"
          className="px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg"
        >
          Super Admin Dashboard →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">

      {/* HERO */}
      <section className="bg-slate-800 text-white rounded-xl p-6">
        <h1 className="text-lg font-semibold">
          Stay connected to your district
        </h1>

        <p className="text-sm text-slate-200 mt-1">
          Get real-time updates, services, and support from your hometown —
          wherever you are.
        </p>

        <Link
          href="/chatbot"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-slate-800 text-sm font-medium rounded-lg hover:bg-slate-100"
        >
          <Bot size={18} />
          Ask AI Assistant
        </Link>
      </section>

      {/* QUICK ACCESS */}
      <section>
        <h2 className="text-xs font-medium text-slate-500 uppercase mb-3">
          Quick Access
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {[
            { href: '/schemes', icon: FileText, label: 'Welfare Programs' },
            { href: '/utilities', icon: Zap, label: 'Utilities' },
            { href: '/news', icon: Newspaper, label: 'Local Updates' },
            {
              href: '/chatbot?action=complaint',
              icon: MessageCircle,
              label: 'File Complaint',
            },
            { href: '/directory', icon: Users, label: 'Authorities' },
            { href: '/chatbot', icon: Bot, label: 'AI Assistant' },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300"
            >
              <Icon size={20} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-700">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* UTILITY STATUS */}
      <section>
        <h2 className="text-xs font-medium text-slate-500 uppercase mb-3">
          Utility Status
        </h2>

        <div className="space-y-2">
          {activeAlerts.length > 0 ? (
            activeAlerts.map((a) => (
              <div
                key={a.id}
                className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <AlertTriangle size={20} className="text-amber-600" />

                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {a.title}
                  </p>

                  <p className="text-sm text-slate-600">
                    {a.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 font-medium">
                All utilities operating normally
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SCHEMES */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium text-slate-500 uppercase">
            Latest Welfare Programs
          </h2>

          <Link
            href="/schemes"
            className="text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            View all
          </Link>
        </div>

        <div className="space-y-2">
          {activeSchemes.map((s) => (
            <Link
              key={s.id}
              href={`/schemes/${s.id}`}
              className="block p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300"
            >
              <p className="font-medium text-slate-800 text-sm">
                {s.title}
              </p>

              <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                {s.description}
              </p>

              <span className="inline-block mt-2 text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">
                {s.category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPLAINT CTA */}
      <section className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h2 className="font-semibold text-slate-800 text-sm">
          Have a complaint?
        </h2>

        <p className="text-sm text-slate-600 mt-1">
          Report civic issues from anywhere.
        </p>

        <Link
          href="/chatbot?action=complaint"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700"
        >
          File Complaint
          <ArrowRight size={16} />
        </Link>
      </section>

    </div>
  );
}
