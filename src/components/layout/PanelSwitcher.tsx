'use client';

import { useApp } from '@/lib/store';
import { User, Shield, Crown } from 'lucide-react';

export function PanelSwitcher() {
  const { panel, setPanel } = useApp();

  return (
    <div className="flex gap-1 p-1 bg-slate-100 rounded-lg mb-6">
      <button
        onClick={() => setPanel('user')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          panel === 'user' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <User size={16} />
        User
      </button>
      <button
        onClick={() => setPanel('admin')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          panel === 'admin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Shield size={16} />
        Admin
      </button>
      <button
        onClick={() => setPanel('super')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
          panel === 'super' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        <Crown size={16} />
        Super
      </button>
    </div>
  );
}
