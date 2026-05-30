'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type PrivacyContextValue = {
  hideSensitiveValues: boolean;
  toggleSensitiveValues: () => void;
};

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [hideSensitiveValues, setHideSensitiveValues] = useState(false);

  useEffect(() => {
    setHideSensitiveValues(localStorage.getItem('zeus-hide-sensitive-values') === 'true');
  }, []);

  const value = useMemo<PrivacyContextValue>(() => ({
    hideSensitiveValues,
    toggleSensitiveValues: () => {
      setHideSensitiveValues((current) => {
        const next = !current;
        localStorage.setItem('zeus-hide-sensitive-values', String(next));
        return next;
      });
    },
  }), [hideSensitiveValues]);

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);

  if (!context) {
    throw new Error('usePrivacy must be used inside PrivacyProvider');
  }

  return context;
}
