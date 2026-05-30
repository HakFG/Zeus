'use client';

import { exportUserData, updateSettings } from '@/actions/settings';
import { useState } from 'react';

export default function SettingsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'zeus-backup.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Erro ao exportar dados');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <h3 className="mb-4 text-lg font-bold text-slate-800 dark:text-slate-200">Configurações</h3>
        
        <form 
          action={async (formData) => {
            const allowance = formData.get('allowanceAmount') as string;
            const resetDay = formData.get('allowanceResetDay') as string;
            const cdi = formData.get('cdiRate') as string;
            
            await updateSettings({
              allowanceAmount: allowance || undefined,
              allowanceResetDay: resetDay ? parseInt(resetDay) : undefined,
              cdiRate: cdi ? (parseFloat(cdi) / 100).toString() : undefined,
            });
            alert('Configurações salvas!');
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Valor da Mesada (R$)</label>
            <input
              type="number"
              name="allowanceAmount"
              step="0.01"
              placeholder="500.00"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Dia de Renovação</label>
            <input
              type="number"
              name="allowanceResetDay"
              min="1"
              max="31"
              placeholder="1"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Taxa CDI Anual (%)</label>
            <input
              type="number"
              name="cdiRate"
              step="0.01"
              placeholder="10.50"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500"
          >
            Salvar Configurações
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm dark:border-red-900/30 dark:bg-red-900/10">
        <h3 className="mb-4 text-lg font-bold text-red-800 dark:text-red-400">Zona de Perigo</h3>
        <div className="space-y-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {isExporting ? 'Exportando...' : 'Exportar Dados (JSON)'}
          </button>
        </div>
      </div>
    </div>
  );
}
