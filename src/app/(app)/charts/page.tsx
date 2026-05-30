'use client';

export default function ChartsPage() {
  return (
    <div className="space-y-6 pb-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-200">Análise de Gastos</h3>
        <div className="flex h-64 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
          <p className="text-sm text-slate-500">Gráfico de Pizza em breve (Recharts)</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-200">Gastos Diários</h3>
        <div className="flex h-64 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
          <p className="text-sm text-slate-500">Gráfico de Barras em breve (Recharts)</p>
        </div>
      </div>
    </div>
  );
}
