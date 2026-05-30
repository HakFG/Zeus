import { getExpenses } from '@/actions/expenses';
import { formatCurrency } from '@/lib/formatters';

export default async function CalendarPage() {
  const expenses = await getExpenses();

  return (
    <div className="space-y-6 pb-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-200">Calendário de Gastos</h3>
        
        <p className="text-sm text-slate-500">
          Você tem {expenses.length} despesas registradas. A visualização de calendário detalhada será implementada em breve!
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">Todas as Despesas</h3>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex justify-between border-b pb-2 text-sm dark:border-slate-800">
              <div>
                <p className="font-semibold">{expense.description}</p>
                <p className="text-xs text-slate-500">{new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <p className="font-medium text-red-500">-{formatCurrency(expense.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
