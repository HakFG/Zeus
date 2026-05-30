'use client';

import { calculateBudgetProgress } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';
import SensitiveValue from '@/components/privacy/SensitiveValue';

interface BudgetProgressProps {
  spent: number;
  total: number;
}

export default function BudgetProgress({ spent, total }: BudgetProgressProps) {
  const progress = calculateBudgetProgress(spent, total);
  
  let progressColor = 'bg-teal-500';
  if (progress > 80) progressColor = 'bg-red-500';
  else if (progress > 50) progressColor = 'bg-amber-500';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200">Orçamento do mês</h3>
        <span className="text-sm font-medium text-slate-500">
          <SensitiveValue>{Math.round(progress)}%</SensitiveValue>
        </span>
      </div>
      
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mt-3 flex justify-between text-[11px] text-slate-500">
        <span><SensitiveValue>{formatCurrency(spent)}</SensitiveValue> gastos</span>
        <span><SensitiveValue>{formatCurrency(total)}</SensitiveValue> total</span>
      </div>
    </div>
  );
}
