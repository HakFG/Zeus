import { differenceInMonths, parseISO } from 'date-fns';

export function annualToMonthlyRate(annualRate: number, cdiPercent = 1.0): number {
  return Math.pow(1 + annualRate * cdiPercent, 1 / 12) - 1;
}

export function calcCurrentValue(principal: number, depositDateISO: string, annualCDI: number): number {
  const months = differenceInMonths(new Date(), parseISO(depositDateISO));
  if (months <= 0) return principal;
  const r = annualToMonthlyRate(annualCDI);
  return principal * Math.pow(1 + r, months);
}

export function simulateGrowth(
  principal: number,
  monthlyDeposit: number,
  months: number,
  annualCDI: number,
  cdiPercent: number
): Array<{ month: number; balance: number; invested: number; earnings: number }> {
  const r = annualToMonthlyRate(annualCDI, cdiPercent);
  const points = [];
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + r) + monthlyDeposit;
    const invested = principal + monthlyDeposit * m;
    points.push({ month: m, balance, invested, earnings: balance - invested });
  }
  return points;
}
