'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { officials, departments } from '@/lib/mock-data';
import { SearchBar } from '@/components/shared/SearchBar';
import { Phone, Mail } from 'lucide-react';

export default function DirectoryPage() {
  const { panel } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');

  if (panel !== 'user') {
    return (
      <div className="py-6 text-slate-600">
        Switch to User panel to view directory.
      </div>
    );
  }

  let filtered = officials;
  if (deptFilter !== 'all') {
    filtered = filtered.filter((o) => o.departmentId === deptFilter);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.designation.toLowerCase().includes(q) ||
        departments.find((d) => d.id === o.departmentId)?.name.toLowerCase().includes(q)
    );
  }

  return (
    <div className="space-y-4 pb-6">
      <SearchBar value={search} onChange={setSearch} placeholder="Search officials..." />
      <div>
        <label className="text-sm font-medium text-slate-600">Department</label>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="mt-1 w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm"
        >
          <option value="all">All Departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((o) => {
          const dept = departments.find((d) => d.id === o.departmentId);
          return (
            <div
              key={o.id}
              className="p-4 bg-white rounded-lg border border-slate-200"
            >
              <p className="font-medium text-slate-800">{o.name}</p>
              <p className="text-sm text-slate-600">{o.designation}</p>
              <p className="text-xs text-slate-500 mt-1">{dept?.name}</p>
              <p className="text-xs text-slate-500">Hours: {o.officeHours}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a
                  href={`tel:${o.phone}`}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                >
                  <Phone size={14} />
                  {o.phone}
                </a>
                <a
                  href={`mailto:${o.email}`}
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-800"
                >
                  <Mail size={14} />
                  Email
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="text-center text-slate-500 py-8">No officials found.</p>}
    </div>
  );
}
