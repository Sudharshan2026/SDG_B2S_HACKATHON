'use client';

import Link from 'next/link';
import { useApp } from '@/lib/store';
import { districts, departments, officials } from '@/lib/mock-data';

export default function SuperMasterPage() {
  const { panel } = useApp();

  if (panel !== 'super') {
    return (
      <div className="py-6 text-slate-600">
        Switch to Super Admin panel.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <Link href="/super" className="text-sm text-slate-600 hover:text-slate-800">← Super Admin Dashboard</Link>
      <h2 className="font-semibold text-slate-900">Master Data</h2>
      <p className="text-sm text-slate-600">
        View districts, departments, and officials. (Demo: read-only)
      </p>

      <section>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Districts</h3>
        <div className="space-y-2">
          {districts.map((d) => (
            <div key={d.id} className="p-3 rounded-lg bg-white border border-slate-200">
              <p className="font-medium text-slate-900">{d.name}</p>
              <p className="text-sm text-slate-500">{d.state} • {d.type}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium text-slate-600 uppercase mb-2">Departments</h3>
        <div className="space-y-2">
          {departments.map((d) => (
            <div key={d.id} className="p-3 rounded-lg bg-white border border-slate-200">
              <p className="font-medium text-slate-900">{d.name}</p>
              <p className="text-sm text-slate-400">{d.code}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-medium text-slate-600 uppercase mb-2">Officials</h3>
        <div className="space-y-2">
          {officials.map((o) => {
            const dept = departments.find((d) => d.id === o.departmentId);
            return (
              <div key={o.id} className="p-3 rounded-lg bg-white border border-slate-200">
                <p className="font-medium text-slate-900">{o.name}</p>
                <p className="text-sm text-slate-600">{o.designation}</p>
                <p className="text-xs text-slate-500">{dept?.name}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
