'use client';

import { useApp } from '@/lib/store';
import Link from 'next/link';
import { Zap, FileText } from 'lucide-react';

export default function AdminDashboardPage() {
  const { panel } = useApp();

  if (panel !== 'admin') {
    return (
      <div className="py-6 text-slate-600">
        Switch to Admin panel to access this area.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <h2 className="font-semibold text-slate-900">Admin Dashboard</h2>
      <p className="text-sm text-slate-600">
        Manage utilities and respond to assigned complaints.
      </p>

      <div className="grid gap-4">
        <Link
          href="/admin/utilities"
          className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200"
        >
          <div className="rounded-lg bg-amber-100 p-3">
            <Zap size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Update Utilities</p>
            <p className="text-sm text-slate-500">Water & electricity schedules</p>
          </div>
        </Link>

        <Link
          href="/admin/complaints"
          className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200"
        >
          <div className="rounded-lg bg-slate-100 p-3">
            <FileText size={24} className="text-slate-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Manage Complaints</p>
            <p className="text-sm text-slate-500">Respond and update status</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
