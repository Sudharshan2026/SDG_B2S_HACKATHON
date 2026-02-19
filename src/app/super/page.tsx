'use client';

import { useApp } from '@/lib/store';
import Link from 'next/link';
import { Building2, Users, FileText, Layout } from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const { panel } = useApp();

  if (panel !== 'super') {
    return (
      <div className="py-6 text-slate-600">
        Switch to Super Admin panel to access this area.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <h2 className="font-semibold text-slate-900">Super Admin Dashboard</h2>
      <p className="text-sm text-slate-600">
        Manage districts, departments, officials, and content moderation.
      </p>

      <div className="grid gap-4">
        <Link
          href="/super/master"
          className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200"
        >
          <div className="rounded-lg bg-slate-100 p-3">
            <Building2 size={24} className="text-slate-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Master Data</p>
            <p className="text-sm text-slate-500">Districts, departments, officials</p>
          </div>
        </Link>

        <Link
          href="/super/complaints"
          className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200"
        >
          <div className="rounded-lg bg-amber-100 p-3">
            <FileText size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">All Complaints</p>
            <p className="text-sm text-slate-500">View and escalate complaints</p>
          </div>
        </Link>

        <Link
          href="/super/content"
          className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200"
        >
          <div className="rounded-lg bg-teal-100 p-3">
            <Layout size={24} className="text-teal-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Content Moderation</p>
            <p className="text-sm text-slate-500">Moderate news and announcements</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
