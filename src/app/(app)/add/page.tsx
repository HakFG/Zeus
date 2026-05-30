'use client';

import { useState } from 'react';
import ExpenseForm from '@/components/expenses/ExpenseForm';
import IncomeForm from '@/components/income/IncomeForm';

export default function AddPage() {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  return (
    <div className="space-y-6">
      <div className="flex rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
        <button
          onClick={() => setActiveTab('expense')}
          className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
            activeTab === 'expense'
              ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Despesa
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`flex-1 rounded-md py-2 text-sm font-semibold transition-colors ${
            activeTab === 'income'
              ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Renda
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900/50">
        {activeTab === 'expense' ? <ExpenseForm /> : <IncomeForm />}
      </div>
    </div>
  );
}
