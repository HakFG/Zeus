'use client';

import { useState } from 'react';
import { addIncome } from '@/actions/income';
import { useRouter } from 'next/navigation';

export default function IncomeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await addIncome({
        amount: formData.get('amount') as string,
        type: formData.get('type') as string,
        description: formData.get('description') as string,
        date: new Date().toISOString(), // In a real app, use a date picker
        recurring: formData.get('recurring') === 'on',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Valor</label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 sm:text-sm">R$</span>
          </div>
          <input
            type="number"
            step="0.01"
            name="amount"
            required
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-10 pr-3 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="0,00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</label>
        <input
          type="text"
          name="description"
          required
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Ex: Mesada Junho"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo de Renda</label>
        <select
          name="type"
          required
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="allowance">Mesada</option>
          <option value="internship">Estágio</option>
          <option value="freelance">Freelance</option>
          <option value="gift">Presente</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          id="recurring"
          name="recurring"
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800"
        />
        <label htmlFor="recurring" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
          Esta é uma renda recorrente (mensal)
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-md bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Salvando...' : 'Adicionar Renda'}
      </button>
    </form>
  );
}
