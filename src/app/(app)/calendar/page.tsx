import { getExpenses } from '@/actions/expenses';
import ExpenseCalendar from '@/components/calendar/ExpenseCalendar';

export default async function CalendarPage() {
  const expenses = await getExpenses();

  return <ExpenseCalendar expenses={expenses} />;
}
