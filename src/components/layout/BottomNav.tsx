'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, PlusCircle, PieChart, TrendingUp, Settings } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Início', icon: Home },
    { href: '/calendar', label: 'Calendário', icon: Calendar },
    { href: '/add', label: 'Lançar', icon: PlusCircle, special: true },
    { href: '/charts', label: 'Gráficos', icon: PieChart },
    { href: '/invest', label: 'Investir', icon: TrendingUp },
    { href: '/settings', label: 'Config', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-mobile bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.special) {
            return (
              <Link key={item.href} href={item.href} className="group flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition-transform group-hover:scale-105 active:scale-95">
                  <Icon size={24} />
                </div>
                <span className="mt-1 text-[10px] font-medium text-teal-600">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="group flex flex-col items-center">
              <Icon
                size={22}
                className={`transition-colors ${
                  isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`}
              />
              <span
                className={`mt-1 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
