'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/formatters';
import SensitiveValue from '@/components/privacy/SensitiveValue';

type Expense = {
  id: string;
  amount: string;
  category: string;
  description: string;
  date: string;
  note: string | null;
};

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getExpenseDateKey(dateStr: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  return toDateKey(new Date(dateStr));
}

function formatDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-');
  return `${day}/${month}/${year}`;
}

function getCalendarDays(visibleMonth: Date) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Array<{ date: Date; inMonth: boolean; dateKey: string }> = [];

  for (let i = firstDay.getDay(); i > 0; i -= 1) {
    const date = new Date(year, month, 1 - i);
    days.push({ date, inMonth: false, dateKey: toDateKey(date) });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day);
    days.push({ date, inMonth: true, dateKey: toDateKey(date) });
  }

  const remainingDays = (7 - (days.length % 7)) % 7;
  for (let day = 1; day <= remainingDays; day += 1) {
    const date = new Date(year, month + 1, day);
    days.push({ date, inMonth: false, dateKey: toDateKey(date) });
  }

  return days;
}

export default function ExpenseCalendar({ expenses }: { expenses: Expense[] }) {
  const todayKey = toDateKey(new Date());
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const expensesByDate = useMemo(() => {
    return expenses.reduce<Record<string, Expense[]>>((acc, expense) => {
      const dateKey = getExpenseDateKey(expense.date);
      acc[dateKey] = [...(acc[dateKey] || []), expense];
      return acc;
    }, {});
  }, [expenses]);

  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const selectedExpenses = expensesByDate[selectedDate] || [];
  const selectedTotal = selectedExpenses.reduce((total, expense) => total + Number(expense.amount), 0);

  function changeMonth(offset: number) {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  return (
    <div className="space-y-6 pb-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold capitalize text-slate-800 dark:text-slate-200">
            {visibleMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Mes anterior"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Proximo mes"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase text-slate-400">
          {weekDays.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ date, inMonth, dateKey }) => {
            const dayExpenses = expensesByDate[dateKey] || [];
            const dayTotal = dayExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
            const isSelected = dateKey === selectedDate;
            const isToday = dateKey === todayKey;

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => setSelectedDate(dateKey)}
                className={`flex h-16 min-w-0 flex-col items-center justify-center rounded-md border text-xs transition-colors sm:h-20 ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50 text-teal-900 dark:border-teal-400 dark:bg-teal-900/30 dark:text-teal-100'
                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                } ${inMonth ? 'text-slate-700 dark:text-slate-200' : 'text-slate-300 dark:text-slate-600'}`}
              >
                <span className={`text-sm font-semibold ${isToday ? 'text-teal-600 dark:text-teal-300' : ''}`}>
                  {date.getDate()}
                </span>
                {dayExpenses.length > 0 && (
                  <span className="mt-1 max-w-full truncate px-1 text-[10px] font-semibold text-red-500">
                    <SensitiveValue>{formatCurrency(dayTotal)}</SensitiveValue>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{formatDateKey(selectedDate)}</h3>
            <p className="text-xs text-slate-500">{selectedExpenses.length} despesa(s) nesse dia</p>
          </div>
          <p className="text-sm font-bold text-red-500">
            <SensitiveValue>-{formatCurrency(selectedTotal)}</SensitiveValue>
          </p>
        </div>

        {selectedExpenses.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-500">Nenhum gasto registrado nessa data.</p>
        ) : (
          <div className="space-y-3">
            {selectedExpenses.map((expense) => (
              <div key={expense.id} className="flex justify-between border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0 dark:border-slate-800">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{expense.description}</p>
                  {expense.note && <p className="mt-1 text-xs text-slate-500">{expense.note}</p>}
                </div>
                <p className="font-medium text-red-500">
                  <SensitiveValue>-{formatCurrency(expense.amount)}</SensitiveValue>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
