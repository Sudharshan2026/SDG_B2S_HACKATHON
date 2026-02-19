'use client';

import { useRouter } from 'next/navigation';
import { schemes } from '@/lib/mock-data';
import { useApp } from '@/lib/store';
import { Bookmark, BookmarkCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SchemeDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { panel, bookmarks, toggleBookmark } = useApp();
  const scheme = schemes.find((s) => s.id === id);

  if (panel !== 'user') {
    return (
      <div className="py-6 text-slate-600">
        Switch to User panel to view scheme details.
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="py-6">
        <p className="text-slate-500">Scheme not found.</p>
        <Link href="/schemes" className="mt-4 inline-block text-slate-600 hover:text-slate-800">Back to Schemes</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-600">
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={() => toggleBookmark(scheme.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100"
        >
          {bookmarks.includes(scheme.id) ? <BookmarkCheck size={18} className="text-slate-600 fill-slate-600" /> : <Bookmark size={18} />}
          <span className="text-sm">{bookmarks.includes(scheme.id) ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      <div>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">
          {scheme.category}
        </span>
        {scheme.status === 'expired' && (
          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700">Expired</span>
        )}
      </div>

      <h1 className="text-xl font-bold text-slate-900">{scheme.title}</h1>
      <p className="text-slate-600">{scheme.description}</p>

      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Eligibility</h2>
        <div className="p-4 rounded-lg bg-slate-50">
          <pre className="text-sm text-slate-600 whitespace-pre-wrap">
            {JSON.stringify(scheme.eligibility, null, 2)}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Benefits</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          {scheme.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Required Documents</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          {scheme.documents.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-2">Important Dates</h2>
        <p className="text-slate-600">
          Start: {new Date(scheme.startDate).toLocaleDateString()} — End: {new Date(scheme.endDate).toLocaleDateString()}
        </p>
      </section>
    </div>
  );
}
