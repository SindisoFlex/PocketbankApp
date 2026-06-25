import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Send, Landmark, ArrowRight, ArrowDownLeft, ArrowUpRight, PlusCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AllAccounts: React.FC = () => {
  const { accounts, addAccount, updateAccountBalance, addTransaction } = useApp();
  const [activeModal, setActiveModal] = useState<'deposit' | 'send' | 'open_account' | null>(null);

  // Form states
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAccount, setDepositAccount] = useState('acc_current');
  const [depositSuccess, setDepositSuccess] = useState(false);

  const [sendAmount, setSendAmount] = useState('');
  const [sendAccount, setSendAccount] = useState('acc_current');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  // New account form state
  const [newAccName, setNewAccName] = useState('');
  const [newAccType, setNewAccType] = useState<'savings' | 'current' | 'crypto'>('savings');
  const [newAccBalance, setNewAccBalance] = useState('');
  const [newAccGoal, setNewAccGoal] = useState('');
  const [newAccSuccess, setNewAccSuccess] = useState(false);

  // Sync balances
  const totalBalance = accounts.reduce((total, acc) => total + acc.balance, 0);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(depositAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    updateAccountBalance(depositAccount, amountNum);
    
    const accName = accounts.find(a => a.id === depositAccount)?.name || 'Account';
    addTransaction({
      merchant: `Deposit into ${accName}`,
      category: 'Deposit',
      amount: amountNum,
      type: 'income',
      icon: 'add_circle'
    });

    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setDepositAmount('');
      setActiveModal(null);
    }, 1500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(sendAmount);
    if (isNaN(amountNum) || amountNum <= 0 || !sendRecipient) return;

    const sourceAcc = accounts.find(a => a.id === sendAccount);
    if (!sourceAcc || sourceAcc.balance < amountNum) {
      alert('Insufficient funds in the selected account!');
      return;
    }

    updateAccountBalance(sendAccount, -amountNum);

    addTransaction({
      merchant: `Sent to ${sendRecipient}`,
      category: 'Payment Transfer',
      amount: -amountNum,
      type: 'expense',
      icon: 'send'
    });

    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
      setSendAmount('');
      setSendRecipient('');
      setActiveModal(null);
    }, 1500);
  };

  const handleOpenAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(newAccBalance) || 0;
    if (!newAccName) return;

    addAccount({
      name: newAccName,
      balance: balanceNum,
      type: newAccType,
      extraInfo: newAccType === 'savings' ? '+2.4% APY' : newAccType === 'crypto' ? 'trending_up 0.5%' : 'Daily checking',
      progress: newAccType === 'savings' ? 0 : undefined,
      goalName: newAccGoal || undefined
    });

    addTransaction({
      merchant: `Opened Account: ${newAccName}`,
      category: 'Administration',
      amount: balanceNum,
      type: 'income',
      icon: 'verified_user'
    });

    setNewAccSuccess(true);
    setTimeout(() => {
      setNewAccSuccess(false);
      setNewAccName('');
      setNewAccBalance('');
      setNewAccGoal('');
      setActiveModal(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Total Balance Overview Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 blur-[60px] rounded-full"></div>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-2">Total Portfolio Balance</span>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">$</span>
          <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">.{((totalBalance % 1) * 100).toFixed(0).padStart(2, '0')}</span>
        </div>
        <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 my-4"></div>
        <div className="flex gap-4 w-full">
          {/* Action Deposit */}
          <button 
            onClick={() => setActiveModal('deposit')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10"
          >
            <Plus size={16} />
            Deposit
          </button>
          {/* Action Send */}
          <button 
            onClick={() => setActiveModal('send')}
            className="flex-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Send size={14} />
            Send
          </button>
        </div>
      </section>

      {/* Your Portfolio Accounts List */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100">Your Portfolio</h2>
        </div>

        <div className="space-y-4">
          {accounts.map((acc) => (
            <div 
              key={acc.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-4 card-hover hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all shadow-sm cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    acc.type === 'savings' ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30' : 
                    acc.type === 'crypto' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30' : 
                    'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700/30'
                  }`}>
                    <Landmark size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{acc.name}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase mt-0.5">{acc.accountNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  <p className={`text-[10px] font-semibold mt-0.5 ${acc.type === 'savings' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {acc.extraInfo}
                  </p>
                </div>
              </div>

              {/* Progress bar only for goals */}
              {acc.progress !== undefined && acc.goalName && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full" 
                      style={{ width: `${acc.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    <span>Goal: {acc.goalName}</span>
                    <span>{acc.progress}% reached</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Button to open new account */}
      <section className="pb-8">
        <button 
          onClick={() => setActiveModal('open_account')}
          className="w-full h-14 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center gap-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm active:scale-95 card-hover transition-all"
        >
          <PlusCircle size={16} />
          Open New Account
        </button>
      </section>

      {/* Action Popups Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 overflow-hidden shadow-2xl relative select-text"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Deposit Form */}
              {activeModal === 'deposit' && (
                <form onSubmit={handleDeposit} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Deposit Money</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Directly mock depositing cash funds into one of your accounts.</p>

                  {depositSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <Check className="mx-auto text-blue-600 dark:text-blue-400 w-12 h-12 stroke-[3px]" />
                      <span className="text-sm font-semibold">Deposit Successful!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Select Destination</label>
                        <select 
                          value={depositAccount} 
                          onChange={(e) => setDepositAccount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          {accounts.map(a => (
                            <option key={a.id} value={a.id}>{a.name} (${a.balance})</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Deposit Amount ($)</label>
                        <input 
                          type="number" 
                          required 
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Complete Deposit
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Send Form */}
              {activeModal === 'send' && (
                <form onSubmit={handleSend} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Send Payments</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Instantly pay anyone using secure cryptographic direct debit routing.</p>

                  {sendSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-bounce">check_circle</span>
                      <span className="text-sm font-semibold">Funds Settle Completed!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Source Account</label>
                        <select 
                          value={sendAccount} 
                          onChange={(e) => setSendAccount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          {accounts.map(a => (
                            <option key={a.id} value={a.id}>{a.name} (${a.balance})</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Recipient Email / Phone</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="john@company.com"
                          value={sendRecipient}
                          onChange={(e) => setSendRecipient(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Payment Amount ($)</label>
                        <input 
                          type="number" 
                          required 
                          placeholder="0.00"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Authorize & Send
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Open Account Form */}
              {activeModal === 'open_account' && (
                <form onSubmit={handleOpenAccount} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Create New Account</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Configure and activate a new cryptographic ledger inside your app.</p>

                  {newAccSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-bounce">verified_user</span>
                      <span className="text-sm font-semibold">Account Activated!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Account Label</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Dream Car Goal"
                          value={newAccName}
                          onChange={(e) => setNewAccName(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Ledger Scheme</label>
                        <select 
                          value={newAccType} 
                          onChange={(e) => setNewAccType(e.target.value as any)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          <option value="savings">High-interest Savings Account (Goal-driven)</option>
                          <option value="current">Daily-checking Checking Account</option>
                          <option value="crypto">Multi-asset Token Wallet</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Initial Deposit ($)</label>
                        <input 
                          type="number" 
                          placeholder="0.00"
                          value={newAccBalance}
                          onChange={(e) => setNewAccBalance(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      {newAccType === 'savings' && (
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Target Goal Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Travel Ticket"
                            value={newAccGoal}
                            onChange={(e) => setNewAccGoal(e.target.value)}
                            className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                          />
                        </div>
                      )}

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Deploy Account
                      </button>
                    </>
                  )}
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
