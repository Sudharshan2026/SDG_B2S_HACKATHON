'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { utilities } from '@/lib/mock-data';
import { Zap, Droplets, Loader2 } from 'lucide-react';
import type { Utility } from '@/lib/types';

export default function AdminUtilitiesPage() {
  const { panel } = useApp();
  const [electricity, setElectricity] = useState<Utility>(
    utilities.find((u) => u.type === 'electricity') || utilities[0]
  );
  const [water, setWater] = useState<Utility>(
    utilities.find((u) => u.type === 'water') || utilities[1]
  );
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const res = await fetch('/api/utilities');
        if (res.ok) {
          const data = await res.json();
          const elec = data.find((u: Utility) => u.type === 'electricity');
          const wat = data.find((u: Utility) => u.type === 'water');
          if (elec) setElectricity(elec);
          if (wat) setWater(wat);
        }
      } catch (error) {
        console.error('Failed to fetch utilities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilities();
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/utilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ electricity, water }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('Failed to save utilities:', error);
    } finally {
      setSaving(false);
    }
  };

  if (panel !== 'admin') {
    return (
      <div className="py-6 text-slate-600">
        Switch to Admin panel.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Loading utilities...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <Link
        href="/admin"
        className="text-sm text-slate-600 hover:text-slate-800"
      >
        ← Admin Dashboard
      </Link>
      <h2 className="font-semibold text-slate-900">Update Utilities</h2>

      <section className="p-4 rounded-xl bg-white border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={20} className="text-amber-500" />
          <span className="font-medium">Electricity</span>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Schedule</label>
          <input
            type="text"
            value={electricity.schedule}
            onChange={(e) =>
              setElectricity((u) => ({ ...u, schedule: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
            placeholder="e.g. 24 hours"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-slate-600 mb-1">Status</label>
          <select
            value={electricity.status}
            onChange={(e) =>
              setElectricity((u) => ({
                ...u,
                status: e.target.value as 'normal' | 'reduced' | 'outage',
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          >
            <option value="normal">Normal</option>
            <option value="reduced">Reduced</option>
            <option value="outage">Outage</option>
          </select>
        </div>
      </section>

      <section className="p-4 rounded-xl bg-white border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={20} className="text-blue-500" />
          <span className="font-medium">Water Supply</span>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Schedule</label>
          <input
            type="text"
            value={water.schedule}
            onChange={(e) =>
              setWater((u) => ({ ...u, schedule: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
            placeholder="e.g. 6-8 AM, 5-7 PM"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-slate-600 mb-1">Status</label>
          <select
            value={water.status}
            onChange={(e) =>
              setWater((u) => ({
                ...u,
                status: e.target.value as 'normal' | 'reduced' | 'outage',
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-200"
          >
            <option value="normal">Normal</option>
            <option value="reduced">Reduced</option>
            <option value="outage">Outage</option>
          </select>
        </div>
      </section>

      <button
        onClick={save}
        disabled={saving}
        className="w-full py-3 rounded-lg bg-slate-700 text-white font-medium disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
        {saved ? 'Saved!' : 'Save Changes'}
      </button>

      <p className="text-xs text-slate-500">
        Note: Changes are now synced to the backend API.
      </p>
    </div>
  );
}
