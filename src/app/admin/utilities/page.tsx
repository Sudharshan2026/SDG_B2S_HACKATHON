'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { utilities, UTILITIES_STORAGE_KEY } from '@/lib/mock-data';
import { Zap, Droplets } from 'lucide-react';

// Demo: use in-memory updates (would be API in prod)

export default function AdminUtilitiesPage() {
  const { panel } = useApp();
  const [electricity, setElectricity] = useState(utilities.find((u) => u.type === 'electricity') || utilities[0]);
  const [water, setWater] = useState(utilities.find((u) => u.type === 'water') || utilities[1]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(UTILITIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.electricity) setElectricity(parsed.electricity);
        if (parsed.water) setWater(parsed.water);
      }
    } catch (error) {
      console.error('Error loading utilities from localStorage:', error);
    }
  }, []);

  const save = () => {
    try {
      localStorage.setItem(UTILITIES_STORAGE_KEY, JSON.stringify({ electricity, water }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving utilities to localStorage:', error);
    }
  };

  if (panel !== 'admin') {
    return (
      <div className="py-6 text-slate-600text-slate-400">
        Switch to Admin panel.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      <Link href="/admin" className="text-sm text-slate-600 hover:text-slate-800">← Admin Dashboard</Link>
      <h2 className="font-semibold text-slate-900text-white">Update Utilities</h2>

      <section className="p-4 rounded-xl bg-whitebg-slate-800 border border-slate-200border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={20} className="text-amber-500" />
          <span className="font-medium">Electricity</span>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Schedule</label>
          <input
            type="text"
            value={electricity.schedule}
            onChange={(e) => setElectricity((u) => ({ ...u, schedule: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-slate-200border-slate-600 bg-whitebg-slate-800"
            placeholder="e.g. 24 hours"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-slate-400 mb-1">Status</label>
          <select
            value={electricity.status}
            onChange={(e) => setElectricity((u) => ({ ...u, status: e.target.value as 'normal' | 'reduced' | 'outage' }))}
            className="w-full px-4 py-2 rounded-lg border border-slate-200border-slate-600 bg-whitebg-slate-800"
          >
            <option value="normal">Normal</option>
            <option value="reduced">Reduced</option>
            <option value="outage">Outage</option>
          </select>
        </div>
      </section>

      <section className="p-4 rounded-xl bg-whitebg-slate-800 border border-slate-200border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={20} className="text-blue-500" />
          <span className="font-medium">Water Supply</span>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Schedule</label>
          <input
            type="text"
            value={water.schedule}
            onChange={(e) => setWater((u) => ({ ...u, schedule: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg border border-slate-200border-slate-600 bg-whitebg-slate-800"
            placeholder="e.g. 6-8 AM, 5-7 PM"
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm text-slate-600 mb-1">Status</label>
          <select
            value={water.status}
            onChange={(e) => setWater((u) => ({ ...u, status: e.target.value as 'normal' | 'reduced' | 'outage' }))}
            className="w-full px-4 py-2 rounded-lg border border-slate-200border-slate-600 bg-whitebg-slate-800"
          >
            <option value="normal">Normal</option>
            <option value="reduced">Reduced</option>
            <option value="outage">Outage</option>
          </select>
        </div>
      </section>

      <button
        onClick={save}
        className="w-full py-3 rounded-lg bg-slate-700 text-white font-medium"
      >
        {saved ? 'Saved!' : 'Save Changes'}
      </button>

      <p className="text-xs text-slate-500">
        Note: Changes are saved locally for this demo. In production, this would sync to the backend.
      </p>
    </div>
  );
}
