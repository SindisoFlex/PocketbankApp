import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Account, CreditCard, ScreenType } from '../types';

interface AppContextProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  user: {
    name: string;
    email: string;
    avatar: string;
    isPro: boolean;
    points: number;
  };
  setUser: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    avatar: string;
    isPro: boolean;
    points: number;
  }>>;
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id' | 'accountNumber'>) => void;
  updateAccountBalance: (accountId: string, amount: number) => void;
  cards: CreditCard[];
  toggleFreezeCard: (cardId: string) => void;
  updateCardSettings: (cardId: string, settings: Partial<CreditCard>) => void;
  addCard: (card: Omit<CreditCard, 'id'>) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  redeemPoints: (amount: number, rewardName: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Sync dark class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Global user state
  const [user, setUser] = useState({
    name: 'Cindy',
    email: 'cindy.banker@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFqr9cJLTETv7YKqYDSubg6C-jWLn_3ITX-6GDaUEyqUag6eK6m9dvUyxPNcW1kwcR_AiHiCCoz5FgQoHA-Jp3zA1WAiMD99hE1HI1Re3eunh2B_bfi5oop9Sei9isB-YKjLR0TF7binP9u4Q5WM8TyL9jlu4E7Wvsq-faH6yxl-XCIMC0JAnPQ6yvlSa21FtN0HzrxiFrsHpB43paW17BwVD3DDrVIK2BKvoXl2kU7tX6M0F7Qo683g7o3N0HBO90Yw7QOLp5VNU',
    isPro: true,
    points: 12450
  });

  // Global accounts state (syncing mockup values)
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 'acc_savings',
      name: 'Savings Account',
      accountNumber: '•••• 8290',
      balance: 8240.50,
      type: 'savings',
      extraInfo: '+2.4% APY',
      progress: 65,
      goalName: 'New Home'
    },
    {
      id: 'acc_current',
      name: 'Current Account',
      accountNumber: '•••• 1145',
      balance: 4209.50,
      type: 'current',
      extraInfo: 'Spending limit: $500/day'
    },
    {
      id: 'acc_crypto',
      name: 'Crypto Wallet',
      accountNumber: 'BTC / ETH / SOL',
      balance: 1500.00,
      type: 'crypto',
      extraInfo: 'trending_down 1.2%'
    }
  ]);

  // Global cards state
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: 'card_virtual_platinum',
      type: 'virtual',
      cardName: 'Virtual Platinum',
      number: '•••• •••• •••• 8824',
      holder: 'Cindy Smith',
      expiry: '12/28',
      cvv: '521',
      isFrozen: false,
      pin: '8824',
      onlinePayments: true,
      atmWithdrawals: true,
      contactlessPayments: true,
      brand: 'visa'
    },
    {
      id: 'card_physical_debit',
      type: 'physical',
      cardName: 'Physical Debit',
      number: '•••• •••• •••• 4412',
      holder: 'Cindy Smith',
      expiry: '04/29',
      cvv: '128',
      isFrozen: false,
      pin: '4412',
      onlinePayments: true,
      atmWithdrawals: true,
      contactlessPayments: true,
      brand: 'mastercard'
    },
    {
      id: 'card_shared_virtual',
      type: 'shared',
      cardName: 'Shared Virtual (Travel)',
      number: '•••• •••• •••• 9002',
      holder: 'Cindy & Alex',
      expiry: '08/27',
      cvv: '942',
      isFrozen: false,
      pin: '9002',
      onlinePayments: true,
      atmWithdrawals: false,
      contactlessPayments: true,
      brand: 'visa'
    }
  ]);

  // Global transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 't1',
      merchant: 'Apple Store',
      category: 'Entertainment',
      date: 'Today',
      amount: -199.00,
      type: 'expense',
      icon: 'apps'
    },
    {
      id: 't2',
      merchant: 'Starbucks',
      category: 'Food & Drinks',
      date: 'Yesterday',
      amount: -12.45,
      type: 'expense',
      icon: 'coffee'
    },
    {
      id: 't3',
      merchant: 'Salary Deposit',
      category: 'Income',
      date: '3 Days Ago',
      amount: 4500.00,
      type: 'income',
      icon: 'work'
    }
  ]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const addAccount = (newAcc: Omit<Account, 'id' | 'accountNumber'>) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const account: Account = {
      ...newAcc,
      id: `acc_${Date.now()}`,
      accountNumber: newAcc.type === 'crypto' ? 'BTC / ETH / SOL' : `•••• ${randomDigits}`
    };
    setAccounts(prev => [...prev, account]);
  };

  const updateAccountBalance = (accountId: string, amount: number) => {
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === accountId) {
          const newBalance = acc.balance + amount;
          return { ...acc, balance: Number(newBalance.toFixed(2)) };
        }
        return acc;
      })
    );
  };

  const toggleFreezeCard = (cardId: string) => {
    setCards(prev =>
      prev.map(c => (c.id === cardId ? { ...c, isFrozen: !c.isFrozen } : c))
    );
  };

  const updateCardSettings = (cardId: string, settings: Partial<CreditCard>) => {
    setCards(prev =>
      prev.map(c => (c.id === cardId ? { ...c, ...settings } : c))
    );
  };

  const addCard = (newCard: Omit<CreditCard, 'id'>) => {
    const card: CreditCard = {
      ...newCard,
      id: `card_${Date.now()}`
    };
    setCards(prev => [...prev, card]);
  };

  const addTransaction = (newTx: Omit<Transaction, 'id' | 'date'>) => {
    const tx: Transaction = {
      ...newTx,
      id: `tx_${Date.now()}`,
      date: 'Just Now'
    };
    setTransactions(prev => [tx, ...prev]);

    // Automatically update relevant account balance if possible
    let targetAccId = 'acc_current';
    if (newTx.category.toLowerCase().includes('savings') || newTx.merchant.toLowerCase().includes('savings')) {
      targetAccId = 'acc_savings';
    } else if (newTx.category.toLowerCase().includes('crypto') || newTx.merchant.toLowerCase().includes('crypto')) {
      targetAccId = 'acc_crypto';
    }

    updateAccountBalance(targetAccId, newTx.amount);

    // Give points for expenses!
    if (newTx.type === 'expense') {
      const earnedPoints = Math.floor(Math.abs(newTx.amount) * 0.1);
      if (earnedPoints > 0) {
        setUser(prev => ({ ...prev, points: prev.points + earnedPoints }));
      }
    }
  };

  const redeemPoints = (amount: number, rewardName: string): boolean => {
    if (user.points >= amount) {
      setUser(prev => ({ ...prev, points: prev.points - amount }));
      // Add a happy transaction showing redemption
      addTransaction({
        merchant: `Redeemed: ${rewardName}`,
        category: 'Rewards',
        amount: 0,
        type: 'income',
        icon: 'card_giftcard'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentScreen('login');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setScreen,
        theme,
        toggleTheme,
        user,
        setUser,
        accounts,
        addAccount,
        updateAccountBalance,
        cards,
        toggleFreezeCard,
        updateCardSettings,
        addCard,
        transactions,
        addTransaction,
        redeemPoints,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
