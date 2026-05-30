'use client';

import { useState, useEffect } from 'react';
import { simulateGrowth } from '@/lib/investmentCalc';
import { formatCurrency } from '@/lib/formatters';
import SensitiveValue from '@/components/privacy/SensitiveValue';

export default function InvestmentSimulator() {
  const [principal, setPrincipal] = useState(500);
  const [monthly, setMonthly] = useState(100);
  const [months, setMonths] = useState(12);
  const [cdi] = useState(0.1375); // 13.75% a.a.
  const [percentCdi, setPercentCdi] = useState(1.0); // 100% CDI
  const [result, setResult] = useState({ balance: 0, invested: 0, earnings: 0 });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const growth = simulateGrowth(principal, monthly, months, cdi, percentCdi);
      if (growth.length > 0) {
        setResult(growth[growth.length - 1]);
      } else {
        setResult({ balance: principal, invested: principal, earnings: 0 });
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(timeoutId);
  }, [principal, monthly, months, cdi, percentCdi]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Simulador CDI (ex: Nubank)</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Valor inicial</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 sm:text-sm">R$</span>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Aporte Mensal</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 sm:text-sm">R$</span>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Meses</label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">% do CDI</label>
          <div className="relative mt-1">
            <input
              type="number"
              value={percentCdi * 100}
              onChange={(e) => setPercentCdi(Number(e.target.value) / 100)}
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 sm:text-sm">%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-xl bg-teal-50 p-4 dark:bg-teal-900/20">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Total Investido</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            <SensitiveValue>{formatCurrency(result.invested)}</SensitiveValue>
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Rendimento Bruto</span>
          <span className="font-semibold text-teal-600 dark:text-teal-400">
            <SensitiveValue>+{formatCurrency(result.earnings)}</SensitiveValue>
          </span>
        </div>
        <div className="flex justify-between border-t border-teal-100 pt-3 dark:border-teal-900/50">
          <span className="font-semibold text-slate-900 dark:text-slate-100">Total Estimado</span>
          <span className="font-bold text-teal-600 dark:text-teal-400">
            <SensitiveValue>{formatCurrency(result.balance)}</SensitiveValue>
          </span>
        </div>
      </div>
    </div>
  );
}
