'use client';

import Link from 'next/link';
import { useApp } from '@/lib/store';
import { newsPosts } from '@/lib/mock-data';
import { ShieldCheck } from 'lucide-react';

export default function SuperContentPage() {
  const { panel } = useApp();

  if (panel !== 'super') {
    return (
      <div className="py-6 text-slate-600">
        Switch to Super Admin panel.
      </div>
    );
  }

  const pending = newsPosts.filter((p) => p.status === 'pending');
  const published = newsPosts.filter((p) => p.status === 'published');

  return (
    <div className="space-y-6 pb-6">
      <Link href="/super" className="text-sm text-slate-600 hover:text-slate-800">← Super Admin Dashboard</Link>
      <h2 className="font-semibold text-slate-900">Content Moderation</h2>
      <p className="text-sm text-slate-600">
        Moderate community posts and announcements. (Demo: read-only)
      </p>

      {pending.length > 0 && (
        <section>
          <h3 className="text-sm font-medium text-amber-600 uppercase mb-2">Pending Review</h3>
          <div className="space-y-3">
            {pending.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <p className="font-medium text-slate-900">{p.title}</p>
                <p className="text-sm text-slate-600 line-clamp-2">{p.content}</p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm">Approve</button>
                  <button className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-sm font-medium text-slate-600 uppercase mb-2">Published</h3>
        <div className="space-y-3">
          {published.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-2">
                {p.isVerified && <ShieldCheck size={16} className="text-slate-600" />}
                <p className="font-medium text-slate-900">{p.title}</p>
              </div>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.content}</p>
              <p className="text-xs text-slate-500 mt-2 capitalize">{p.category} • {new Date(p.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
