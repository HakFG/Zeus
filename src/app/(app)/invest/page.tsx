'use client';

import { useState } from 'react';
import InvestmentSimulator from '@/components/invest/InvestmentSimulator';

export default function InvestPage() {
  const [activeTab, setActiveTab] = useState<'investimentos' | 'metas'>('investimentos');

  return (
    <div className="space-y-6 pb-6">
      <div className="flex rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
        <button
          onClick={() => setActiveTab('investimentos')}
          className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
            activeTab === 'investimentos'
              ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Investimentos
        </button>
        <button
          onClick={() => setActiveTab('metas')}
          className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
            activeTab === 'metas'
              ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Metas
        </button>
      </div>

      {activeTab === 'investimentos' ? (
        <div className="space-y-6">
          <InvestmentSimulator />
          {/* Investment List would go here */}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Goals List would go here */}
          <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm dark:bg-slate-900/50">
            <p>Em breve: Gestão de metas de economia</p>
          </div>
        </div>
      )}
    </div>
  );
}
