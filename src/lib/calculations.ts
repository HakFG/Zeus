export function calculateBudgetProgress(spent: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((spent / total) * 100, 100);
}

export function getDaysLeftInMonth(): number {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDay.getDate() - today.getDate();
}
