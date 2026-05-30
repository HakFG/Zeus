'use client';

import { usePrivacy } from './PrivacyProvider';

type SensitiveValueProps = {
  children: React.ReactNode;
  hiddenLabel?: string;
};

export default function SensitiveValue({ children, hiddenLabel = '••••••' }: SensitiveValueProps) {
  const { hideSensitiveValues } = usePrivacy();

  if (hideSensitiveValues) {
    return <span aria-label="Valor oculto">{hiddenLabel}</span>;
  }

  return <>{children}</>;
}
