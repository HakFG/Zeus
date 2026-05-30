import { getExpenses } from '@/actions/expenses';
import { getIncome } from '@/actions/income';
import { getSettings } from '@/actions/settings';
import BalanceCard from '@/components/dashboard/BalanceCard';
import BudgetProgress from '@/components/dashboard/BudgetProgress';
import RecentExpenses from '@/components/dashboard/RecentExpenses';
import { differenceInDays, endOfMonth, startOfMonth, parseISO, isWithinInterval } from 'date-fns';

export default async function DashboardPage() {
  const [expenses, income, settings] = await Promise.all([
    getExpenses(),
    getIncome(),
    getSettings(),
  ]);

  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const daysLeft = differenceInDays(end, today);

  const thisMonthExpenses = expenses.filter(e => isWithinInterval(parseISO(e.date), { start, end }));
  const totalSpent = thisMonthExpenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const thisMonthIncome = income.filter(i => isWithinInterval(parseISO(i.date), { start, end }));
  const totalIncome = thisMonthIncome.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const allowance = parseFloat(settings?.allowanceAmount || '0');
  const availableBalance = totalIncome + allowance - totalSpent;

  return (
    <div className="space-y-6 pb-4">
      <BalanceCard
        balance={availableBalance}
        income={totalIncome + allowance}
        spent={totalSpent}
        daysLeft={daysLeft}
      />
      
      <BudgetProgress
        spent={totalSpent}
        total={totalIncome + allowance}
      />

      <RecentExpenses expenses={thisMonthExpenses.slice(0, 5)} />
    </div>
  );
}
