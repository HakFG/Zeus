'use client';

import { formatCurrency } from '@/lib/formatters';

interface BalanceCardProps {
  balance: number;
  income: number;
  spent: number;
  daysLeft: number;
}

export default function BalanceCard({ balance, income, spent, daysLeft }: BalanceCardProps) {
  return (
    <div className="rounded-2xl bg-teal-900 p-6 text-white shadow-lg">
      <p className="text-sm font-medium text-teal-100/80">Saldo disponível — este mês</p>
      <h2 className="mt-1 text-4xl font-bold tracking-tight">{formatCurrency(balance)}</h2>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-[10px] font-medium text-teal-100/70 uppercase tracking-wider">Renda</p>
          <p className="mt-0.5 text-sm font-semibold">{formatCurrency(income).replace('R$', '').trim()}</p>
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-[10px] font-medium text-teal-100/70 uppercase tracking-wider">Gasto</p>
          <p className="mt-0.5 text-sm font-semibold">{formatCurrency(spent).replace('R$', '').trim()}</p>
        </div>
        <div className="rounded-xl bg-white/10 p-3">
          <p className="text-[10px] font-medium text-teal-100/70 uppercase tracking-wider">Restam</p>
          <p className="mt-0.5 text-sm font-semibold">{daysLeft} dias</p>
        </div>
      </div>
    </div>
  );
}
