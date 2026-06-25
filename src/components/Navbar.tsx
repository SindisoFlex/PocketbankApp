import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const Navbar: React.FC = () => {
  const { currentScreen, setScreen } = useApp();

  const navItems: Array<{ screen: ScreenType; label: string; icon: string; activeIcon: string }> = [
    { screen: 'home', label: 'Home', icon: 'home', activeIcon: 'home' },
    { screen: 'accounts', label: 'Accounts', icon: 'account_balance_wallet', activeIcon: 'account_balance_wallet' },
    { screen: 'cards', label: 'Cards', icon: 'credit_card', activeIcon: 'credit_card' },
    { screen: 'support', label: 'Support', icon: 'support_agent', activeIcon: 'support_agent' },
    { screen: 'profile', label: 'More', icon: 'more_horiz', activeIcon: 'more_horiz' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-t border-slate-200 dark:border-slate-800/80 shadow-md z-40 flex justify-around items-center px-2 select-none transition-colors">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        return (
          <button
            key={item.screen}
            onClick={() => setScreen(item.screen)}
            className={`flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90 ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-bold scale-[1.05]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-semibold mt-0.5 tracking-wider uppercase">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
