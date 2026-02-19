'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/shared/SearchBar';
import { useApp } from '@/lib/store';
import { schemes } from '@/lib/mock-data';
import { Bookmark, BookmarkCheck } from 'lucide-react';

/* 🔹 Demo schemes to ensure at least 10 */
const demoSchemes = [
  {
    id: 'ds1',
    title: 'Farmer Support Grant',
    description: 'Financial assistance for small and marginal farmers.',
    category: 'agriculture',
    status: 'active',
  },
  {
    id: 'ds2',
    title: 'Student Scholarship Program',
    description: 'Scholarships for economically weaker students.',
    category: 'education',
    status: 'active',
  },
  {
    id: 'ds3',
    title: 'Women Self-Employment Scheme',
    description: 'Loan subsidies for women entrepreneurs.',
    category: 'welfare',
    status: 'active',
  },
  {
    id: 'ds4',
    title: 'Free Health Insurance',
    description: 'Medical coverage for low-income families.',
    category: 'healthcare',
    status: 'active',
  },
  {
    id: 'ds5',
    title: 'Housing Assistance Scheme',
    description: 'Financial support for rural housing construction.',
    category: 'welfare',
    status: 'active',
  },
  {
    id: 'ds6',
    title: 'Skill Development Training',
    description: 'Free training programs for unemployed youth.',
    category: 'education',
    status: 'active',
  },
  {
    id: 'ds7',
    title: 'Senior Citizen Pension',
    description: 'Monthly pension for eligible elderly citizens.',
    category: 'welfare',
    status: 'active',
  },
  {
    id: 'ds8',
    title: 'Startup Support Program',
    description: 'Funding assistance for local startups.',
    category: 'business',
    status: 'active',
  },
  {
    id: 'ds9',
    title: 'Free School Transport',
    description: 'Transport support for rural students.',
    category: 'education',
    status: 'active',
  },
  {
    id: 'ds10',
    title: 'Clean Water Initiative',
    description: 'Safe drinking water supply project.',
    category: 'healthcare',
    status: 'active',
  },
];

export default function SchemesPage() {
  const { panel, bookmarks, toggleBookmark } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  /* 🔹 Combine real + demo schemes */
  const baseSchemes = useMemo(() => [...schemes, ...demoSchemes], []);

  const categories = useMemo(
    () => [
      'all',
      ...Array.from(new Set(baseSchemes.map((s) => s.category))),
    ],
    [baseSchemes]
  );

  const filtered = useMemo(() => {
    let list = baseSchemes.filter(
      (s) => s.status === 'active' || category === 'all'
    );

    if (category !== 'all')
      list = list.filter((s) => s.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    /* 🔹 Limit to 10 for demo */
    return list.slice(0, 10);
  }, [search, category, baseSchemes]);

  if (panel !== 'user') {
    return (
      <div className="py-6 text-slate-600">
        Switch to User panel to view schemes.
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search schemes..."
      />

      {/* 🔹 Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              category === c
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* 🔹 Scheme list */}
      <div className="space-y-3">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex justify-between items-start gap-2">
              <Link
                href={`/schemes/${s.id}`}
                className="flex-1 min-w-0"
              >
                <p className="font-medium text-slate-800 text-sm">
                  {s.title}
                </p>

                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {s.description}
                </p>

                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">
                    {s.category}
                  </span>

                  {s.status === 'expired' && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                      Expired
                    </span>
                  )}
                </div>
              </Link>

              <button
                onClick={() => toggleBookmark(s.id)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                aria-label="Bookmark"
              >
                {bookmarks.includes(s.id) ? (
                  <BookmarkCheck
                    size={20}
                    className="text-slate-600 fill-slate-600"
                  />
                ) : (
                  <Bookmark size={20} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-8">
          No schemes found.
        </p>
      )}
    </div>
  );
}
