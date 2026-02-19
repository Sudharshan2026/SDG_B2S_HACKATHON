'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import {
  getComplaints,
  updateComplaintStatus,
  departments,
} from '@/lib/mock-data';
import type { Complaint } from '@/lib/types';

/* 🔹 Demo complaints (ensures at least 6) */
const demoComplaints: Complaint[] = [
  {
    id: 'dc1',
    ticketId: 'CMP-1001',
    description: 'Street light not working near bus stand.',
    departmentId: 'electricity',
    status: 'pending',
    timeline: [
      {
        id: 't1',
        createdAt: new Date().toISOString(),
        statusTo: 'pending',
        note: 'Complaint registered',
      },
    ],
  },
  {
    id: 'dc2',
    ticketId: 'CMP-1002',
    description: 'Water supply interruption in Ward 5.',
    departmentId: 'water',
    status: 'in_progress',
    timeline: [
      {
        id: 't2',
        createdAt: new Date().toISOString(),
        statusTo: 'in_progress',
        note: 'Inspection team assigned',
      },
    ],
  },
  {
    id: 'dc3',
    ticketId: 'CMP-1003',
    description: 'Garbage not collected for 3 days.',
    departmentId: 'sanitation',
    status: 'pending',
    timeline: [
      {
        id: 't3',
        createdAt: new Date().toISOString(),
        statusTo: 'pending',
      },
    ],
  },
  {
    id: 'dc4',
    ticketId: 'CMP-1004',
    description: 'Road potholes causing traffic issues.',
    departmentId: 'public_works',
    status: 'resolved',
    timeline: [
      {
        id: 't4',
        createdAt: new Date().toISOString(),
        statusTo: 'resolved',
        note: 'Temporary repair completed',
      },
    ],
  },
  {
    id: 'dc5',
    ticketId: 'CMP-1005',
    description: 'Broken drainage cover on main road.',
    departmentId: 'sanitation',
    status: 'pending',
    timeline: [
      {
        id: 't5',
        createdAt: new Date().toISOString(),
        statusTo: 'pending',
      },
    ],
  },
  {
    id: 'dc6',
    ticketId: 'CMP-1006',
    description: 'Frequent power fluctuations reported.',
    departmentId: 'electricity',
    status: 'escalated',
    timeline: [
      {
        id: 't6',
        createdAt: new Date().toISOString(),
        statusTo: 'escalated',
        note: 'Forwarded to higher authority',
      },
    ],
  },
];

export default function AdminComplaintsPage() {
  const { panel } = useApp();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  /* ✅ LOAD ONLY ONCE — prevents delete bug */
  useEffect(() => {
    const real = getComplaints();
    const combined = [...real, ...demoComplaints].slice(0, 6);
    setComplaints(combined);
  }, []);

  /* 🔄 Refresh after status update */
  const refresh = () => {
    const real = getComplaints();
    const combined = [...real, ...demoComplaints].slice(0, 6);
    setComplaints(combined);
  };

  /* 🟡 Status Update */
  const handleStatusChange = (
    ticketId: string,
    status: Complaint['status']
  ) => {
    setLoading(true);

    const updated = updateComplaintStatus(ticketId, status, note);

    if (updated) {
      setSelected(updated);
      refresh();
      setNote('');
    }

    setLoading(false);
  };

  /* 🔴 DELETE — WORKING */
  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;

    setComplaints((prev) => prev.filter((c) => c.id !== id));
    setSelected(null);
  };

  if (panel !== 'admin') {
    return (
      <div className="py-6 text-slate-600">
        Switch to Admin panel.
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

      <Link
        href="/admin"
        className="text-sm text-slate-600 hover:text-slate-800"
      >
        ← Admin Dashboard
      </Link>

      <h2 className="font-semibold text-slate-900">
        Manage Complaints
      </h2>

      {/* 🔹 Complaint List */}
      <div className="space-y-2">
        {complaints.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            className={`p-4 rounded-xl border cursor-pointer ${
              selected?.id === c.id
                ? 'border-slate-300 bg-slate-50'
                : 'border-slate-200 bg-white'
            }`}
          >
            <p className="font-mono text-sm text-slate-600">
              {c.ticketId}
            </p>

            <p className="font-medium text-slate-900 mt-1 line-clamp-1">
              {c.description}
            </p>

            <span
              className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${
                statusColors[c.status]
              }`}
            >
              {c.status.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>

      {/* 🔹 MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6">

            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-slate-900">
                {selected.ticketId}
              </h3>

              <button
                onClick={() => setSelected(null)}
                className="text-slate-500"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-600">
              {selected.description}
            </p>

            <p className="text-sm text-slate-500 mt-2">
              {departments.find(
                (d) => d.id === selected.departmentId
              )?.name}
            </p>

            {/* 🔹 Note */}
            <div className="mt-4">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add note..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300"
              />
            </div>

            {/* 🔹 Actions */}
            <div className="flex flex-wrap gap-2 mt-4">

              <button
                onClick={() =>
                  handleStatusChange(selected.ticketId, 'in_progress')
                }
                className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm"
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  handleStatusChange(selected.ticketId, 'resolved')
                }
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
              >
                Resolved
              </button>

              <button
                onClick={() =>
                  handleStatusChange(selected.ticketId, 'closed')
                }
                className="px-4 py-2 rounded-lg bg-slate-600 text-white text-sm"
              >
                Close
              </button>

              {/* 🔴 DELETE BUTTON */}
              <button
                onClick={() => handleDelete(selected.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
              >
                Delete
              </button>

            </div>

            {/* 🔹 Timeline */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm font-medium text-slate-600 mb-2">
                Timeline
              </p>

              {selected.timeline.map((t) => (
                <div key={t.id} className="text-sm text-slate-500 py-1">
                  {new Date(t.createdAt).toLocaleString()} —{' '}
                  {t.statusTo.replace('_', ' ')}

                  {t.note && (
                    <span className="block text-slate-600">
                      {t.note}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {complaints.length === 0 && (
        <p className="text-center text-slate-500 py-8">
          No complaints assigned.
        </p>
      )}
    </div>
  );
}
