'use client';

import { Eye, EyeOff } from 'lucide-react';
import { usePrivacy } from './PrivacyProvider';

export default function PrivacyToggle() {
  const { hideSensitiveValues, toggleSensitiveValues } = usePrivacy();
  const Icon = hideSensitiveValues ? EyeOff : Eye;

  return (
    <button
      type="button"
      onClick={toggleSensitiveValues}
      aria-label={hideSensitiveValues ? 'Mostrar valores' : 'Ocultar valores'}
      title={hideSensitiveValues ? 'Mostrar valores' : 'Ocultar valores'}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <Icon size={20} />
    </button>
  );
}
