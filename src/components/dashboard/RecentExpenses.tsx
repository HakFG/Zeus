'use client';

import { formatCurrency } from '@/lib/formatters';
import SensitiveValue from '@/components/privacy/SensitiveValue';
import { ShoppingCart, Utensils, Car, Film, Stethoscope, Book, MoreHorizontal } from 'lucide-react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Expense {
  id: string;
  amount: string;
  category: string;
  description: string;
  date: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  food: Utensils,
  transport: Car,
  entertainment: Film,
  shopping: ShoppingCart,
  health: Stethoscope,
  education: Book,
  other: MoreHorizontal,
};

function formatExpenseDate(dateStr: string) {
  const date = parseISO(dateStr);
  if (isToday(date)) return `Hoje, ${format(date, 'HH:mm', { locale: ptBR })}`;
  if (isYesterday(date)) return `Ontem, ${format(date, 'HH:mm', { locale: ptBR })}`;
  return format(date, "dd 'de' MMM", { locale: ptBR });
}

export default function RecentExpenses({ expenses }: { expenses: Expense[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Últimos Gastos</h3>
      
      {expenses.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500">Nenhum gasto recente.</p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => {
            const Icon = categoryIcons[expense.category] || categoryIcons.other;
            return (
              <div key={expense.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{expense.description}</p>
                    <p className="text-xs text-slate-500">{formatExpenseDate(expense.date)}</p>
                  </div>
                </div>
                <div className="font-semibold text-red-500">
                  <SensitiveValue>-{formatCurrency(expense.amount)}</SensitiveValue>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
