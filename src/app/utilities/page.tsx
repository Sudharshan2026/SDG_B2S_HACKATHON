'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { getUtilities, outages, alerts } from '@/lib/mock-data';
import { Zap, Droplets, AlertTriangle } from 'lucide-react';

export default function UtilitiesPage() {
  const { panel } = useApp();
  const [utilities, setUtilities] = useState(getUtilities());

  useEffect(() => setUtilities(getUtilities()), [panel]);

  if (panel !== 'user') {
    return (
      <div className="py-6 text-slate-600">
        Switch to User panel to view utilities.
      </div>
    );
  }

  const statusColors = {
    normal: 'text-green-600',
    reduced: 'text-amber-600',
    outage: 'text-red-600',
  };

  const statusLabels = {
    normal: 'Normal',
    reduced: 'Reduced',
    outage: 'Outage',
  };

  return (
    <div className="space-y-8 pb-8">

      {/* 🔴 EMERGENCY ALERTS */}
      {alerts.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-slate-500 uppercase mb-3">
            Emergency Alerts
          </h2>

          <div className="space-y-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`flex gap-3 p-4 rounded-lg border ${
                  a.severity === 'critical'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <AlertTriangle
                  size={24}
                  className="flex-shrink-0 text-amber-600"
                />

                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {a.title}
                  </p>
                  <p className="text-sm text-slate-600">{a.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ⚡ CURRENT STATUS */}
      <section>
        <h2 className="text-xs font-medium text-slate-500 uppercase mb-3">
          Current Status
        </h2>

        <div className="space-y-4">
          {utilities.map((u) => (
            <div
              key={u.id}
              className="p-4 bg-white rounded-lg border border-slate-200"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                {u.type === 'electricity' ? (
                  <Zap size={24} className="text-amber-500" />
                ) : (
                  <Droplets size={24} className="text-blue-500" />
                )}

                <span className="font-medium text-slate-800 capitalize">
                  {u.type}
                </span>

                <span
                  className={`ml-auto text-sm font-medium ${statusColors[u.status]}`}
                >
                  {statusLabels[u.status]}
                </span>
              </div>

              {/* 🔹 ALIGNED DETAILS (Fix for eligibility-style issues) */}
              <div className="text-sm grid grid-cols-[110px_1fr] gap-y-1">
                <span className="text-slate-500">Schedule</span>
                <span className="text-slate-700">{u.schedule}</span>

                <span className="text-slate-500">Last Updated</span>
                <span className="text-slate-700">
                  {new Date(u.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛠️ PLANNED OUTAGES */}
      {outages.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-slate-500 uppercase mb-3">
            Planned Outages
          </h2>

          <div className="space-y-3">
            {outages.map((o) => (
              <div
                key={o.id}
                className="p-4 bg-slate-50 rounded-lg border border-slate-200"
              >
                <p className="font-medium text-slate-800 text-sm">
                  {o.reason}
                </p>

                {/* 🔹 ALIGNED TIME DETAILS */}
                <div className="mt-2 text-sm grid grid-cols-[110px_1fr] gap-y-1">
                  <span className="text-slate-500">Start</span>
                  <span className="text-slate-700">
                    {new Date(o.startTime).toLocaleString()}
                  </span>

                  <span className="text-slate-500">End</span>
                  <span className="text-slate-700">
                    {new Date(o.endTime).toLocaleString()}
                  </span>
                </div>

                <span className="inline-block mt-3 text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                  Planned Maintenance
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
