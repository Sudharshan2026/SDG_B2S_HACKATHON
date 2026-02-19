'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { newsPosts } from '@/lib/mock-data';
import { SearchBar } from '@/components/shared/SearchBar';
import { ShieldCheck } from 'lucide-react';

const categories = ['all', 'event', 'business', 'notice', 'offer', 'general'];

/* 🔹 Demo fallback news (ensures at least 8 posts) */
const demoNews = [
  {
    id: 'd1',
    title: 'New Community Health Camp Announced',
    content: 'Free medical checkups will be provided this Sunday at the town hall.',
    category: 'event',
    createdAt: new Date().toISOString(),
    isVerified: true,
    status: 'published',
  },
  {
    id: 'd2',
    title: 'Weekly Market Relocated',
    content: 'The Friday market has been temporarily shifted due to road repairs.',
    category: 'notice',
    createdAt: new Date().toISOString(),
    isVerified: true,
    status: 'published',
  },
  {
    id: 'd3',
    title: 'New Grocery Store Opening',
    content: 'A new supermarket will open near the bus stand with launch discounts.',
    category: 'business',
    createdAt: new Date().toISOString(),
    isVerified: false,
    status: 'published',
  },
  {
    id: 'd4',
    title: 'Electricity Maintenance Scheduled',
    content: 'Power supply will be interrupted between 10 AM and 2 PM tomorrow.',
    category: 'notice',
    createdAt: new Date().toISOString(),
    isVerified: true,
    status: 'published',
  },
  {
    id: 'd5',
    title: 'School Admission Forms Released',
    content: 'Government school admissions for the next academic year are now open.',
    category: 'general',
    createdAt: new Date().toISOString(),
    isVerified: true,
    status: 'published',
  },
  {
    id: 'd6',
    title: 'Local Festival Preparations Begin',
    content: 'Preparations for the annual temple festival are underway.',
    category: 'event',
    createdAt: new Date().toISOString(),
    isVerified: false,
    status: 'published',
  },
  {
    id: 'd7',
    title: 'Discount Week at Textile Shops',
    content: 'Several local shops are offering up to 40% off this week.',
    category: 'offer',
    createdAt: new Date().toISOString(),
    isVerified: false,
    status: 'published',
  },
  {
    id: 'd8',
    title: 'Road Repair Work Completed',
    content: 'Main road repairs have been completed ahead of schedule.',
    category: 'general',
    createdAt: new Date().toISOString(),
    isVerified: true,
    status: 'published',
  },
];

export default function NewsPage() {
  const { panel } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<'date' | 'popularity'>('date');

  if (panel !== 'user') {
    return (
      <div className="py-6 text-slate-600">
        Switch to User panel to view news.
      </div>
    );
  }

  /* 🔹 Combine real + demo data */
  let basePosts = [...newsPosts, ...demoNews];

  let filtered = basePosts.filter((p) => p.status === 'published');

  if (category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    );
  }

  filtered = [...filtered].sort((a, b) =>
    sort === 'date'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : 0
  );

  /* 🔹 Limit to 8 posts for clean demo */
  filtered = filtered.slice(0, 8);

  return (
    <div className="space-y-4 pb-6">

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search news..."
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

      {/* 🔹 Sort buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setSort('date')}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            sort === 'date' ? 'bg-slate-200' : 'bg-slate-100'
          }`}
        >
          Latest
        </button>

        <button
          onClick={() => setSort('popularity')}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            sort === 'popularity' ? 'bg-slate-200' : 'bg-slate-100'
          }`}
        >
          Popular
        </button>
      </div>

      {/* 🔹 News list */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="p-4 bg-white rounded-lg border border-slate-200"
          >
            <div className="flex items-center gap-2 mb-2">
              {post.isVerified && (
                <span className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                  <ShieldCheck size={14} />
                  Verified
                </span>
              )}

              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 capitalize">
                {post.category}
              </span>
            </div>

            <h2 className="font-medium text-slate-800 text-sm">
              {post.title}
            </h2>

            <p className="text-sm text-slate-600 mt-1 line-clamp-3">
              {post.content}
            </p>

            <p className="text-xs text-slate-500 mt-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-8">
          No posts found.
        </p>
      )}
    </div>
  );
}
