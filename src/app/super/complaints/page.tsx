'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { getComplaints, updateComplaintStatus } from '@/lib/mock-data';
import { departments } from '@/lib/mock-data';
import type { Complaint } from '@/lib/types';

export default function SuperComplaintsPage() {
  const { panel } = useApp();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    setComplaints(getComplaints());
  }, [selected]);

  const refresh = () => setComplaints(getComplaints());

  const filtered = filter === 'all'
    ? complaints
    : complaints.filter((c) => c.status === filter);

  const handleEscalate = (ticketId: string) => {
    updateComplaintStatus(ticketId, 'escalated', 'Escalated by Super Admin');
    setSelected(null);
    refresh();
  };

  if (panel !== 'super') {
    return (
      <div className="py-6 text-slate-600text-slate-400">
        Switch to Super Admin panel.
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-slate-100 text-slate-700',
    in_progress: 'bg-amber-100 text-amber-700',
    resolved: 'bg-green-100 text-green-700',
    closed: 'bg-slate-100 text-slate-500',
    escalated: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-4 pb-6">
      <Link href="/super" className="text-sm text-slate-600 hover:text-slate-800">← Super Admin Dashboard</Link>
      <h2 className="font-semibold text-slate-900text-white">All Complaints</h2>

      <div className="flex gap-2 overflow-x-auto">
        {['all', 'pending', 'in_progress', 'resolved', 'closed', 'escalated'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === s ? 'bg-slate-700 text-white' : 'bg-slate-100bg-slate-800 text-slate-600'
            }`}
          >
            {s === 'all' ? 'All' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className="p-4 rounded-xl border border-slate-200border-slate-700 bg-whitebg-slate-800 cursor-pointer"
          >
            <p className="font-mono text-sm text-slate-600">{c.ticketId}</p>
            <p className="font-medium text-slate-900text-white mt-1 line-clamp-1">{c.description}</p>
            <p className="text-xs text-slate-500 mt-1">{departments.find((d) => d.id === c.departmentId)?.name}</p>
            <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${statusColors[c.status] || 'bg-slate-100'}`}>
              {c.status.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-whitebg-slate-800 rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-900text-white">{selected.ticketId}</h3>
              <button onClick={() => setSelected(null)} className="text-slate-500">✕</button>
            </div>
            <p className="text-slate-600text-slate-400">{selected.description}</p>
            <p className="text-sm text-slate-500 mt-2">{departments.find((d) => d.id === selected.departmentId)?.name}</p>
            <div className="mt-4">
              <button
                onClick={() => handleEscalate(selected.ticketId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
              >
                Escalate
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-600 mb-2">Timeline</p>
              {selected.timeline.map((t) => (
                <div key={t.id} className="text-sm text-slate-500 py-1">
                  {new Date(t.createdAt).toLocaleString()} — {t.statusTo.replace('_', ' ')}
                  {t.note && <span className="block text-slate-600">{t.note}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-8">No complaints found.</p>
      )}
    </div>
  );
}
