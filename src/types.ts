export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  type: 'expense' | 'income';
  icon: string;
}

export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: 'savings' | 'current' | 'crypto';
  extraInfo?: string;
  progress?: number; // For savings goals
  goalName?: string;
}

export interface CreditCard {
  id: string;
  type: 'virtual' | 'physical' | 'shared';
  cardName: string;
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  isFrozen: boolean;
  pin: string;
  onlinePayments: boolean;
  atmWithdrawals: boolean;
  contactlessPayments: boolean;
  brand: 'visa' | 'mastercard';
}

export type ScreenType = 
  | 'splash' 
  | 'login' 
  | 'register' 
  | 'forgot_password' 
  | 'home' 
  | 'accounts' 
  | 'cards' 
  | 'support' 
  | 'profile';
