import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUpRight, ArrowDownLeft, Eye, EyeOff, Send, HelpCircle, TrendingUp, Cpu, Smartphone, Wallet, Compass, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HomeDashboard: React.FC = () => {
  const { user, accounts, cards, transactions, addTransaction, updateAccountBalance } = useApp();
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  // Modals for actions
  const [activeModal, setActiveModal] = useState<'transfer' | 'pay' | 'request' | 'crypto' | 'transaction' | null>(null);
  const [selectedTx, setSelectedTx] = useState<any>(null);

  // Transfer Form State
  const [transferFrom, setTransferFrom] = useState('acc_current');
  const [transferTo, setTransferTo] = useState('acc_savings');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Pay Form State
  const [payService, setPayService] = useState('Electricity Bill');
  const [payAmount, setPayAmount] = useState('45.00');
  const [paySuccess, setPaySuccess] = useState(false);

  // Request Money State
  const [requestFrom, setRequestFrom] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Crypto State
  const [cryptoAsset, setCryptoAsset] = useState('Bitcoin (BTC)');
  const [cryptoAmount, setCryptoAmount] = useState('100');
  const [cryptoSuccess, setCryptoSuccess] = useState(false);

  const currentAccount = accounts.find(a => a.id === 'acc_current');
  const savingsAccount = accounts.find(a => a.id === 'acc_savings');
  const cryptoAccount = accounts.find(a => a.id === 'acc_crypto');

  const totalBalance = (savingsAccount?.balance || 0) + (currentAccount?.balance || 0);

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(transferAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const sourceAcc = accounts.find(a => a.id === transferFrom);
    if (!sourceAcc || sourceAcc.balance < amountNum) {
      alert('Insufficient funds in the source account!');
      return;
    }

    // Deduct from source and add to destination
    updateAccountBalance(transferFrom, -amountNum);
    updateAccountBalance(transferTo, amountNum);

    // Add a transaction
    const fromName = accounts.find(a => a.id === transferFrom)?.name || 'Account';
    const toName = accounts.find(a => a.id === transferTo)?.name || 'Account';
    addTransaction({
      merchant: `Transfer: ${fromName} to ${toName}`,
      category: 'Transfer',
      amount: -amountNum,
      type: 'expense',
      icon: 'sync'
    });

    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferAmount('');
      setActiveModal(null);
    }, 1500);
  };

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(payAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    if ((currentAccount?.balance || 0) < amountNum) {
      alert('Insufficient funds in your Current Account!');
      return;
    }

    addTransaction({
      merchant: payService,
      category: 'Utilities',
      amount: -amountNum,
      type: 'expense',
      icon: 'payments'
    });

    setPaySuccess(true);
    setTimeout(() => {
      setPaySuccess(false);
      setActiveModal(null);
    }, 1500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(requestAmount);
    if (isNaN(amountNum) || amountNum <= 0 || !requestFrom) return;

    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setRequestFrom('');
      setRequestAmount('');
      setActiveModal(null);
      // Create transaction for successful incoming request
      addTransaction({
        merchant: `Request from ${requestFrom}`,
        category: 'Requests',
        amount: amountNum,
        type: 'income',
        icon: 'request_quote'
      });
    }, 2000);
  };

  const handleCryptoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(cryptoAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    if ((currentAccount?.balance || 0) < amountNum) {
      alert('Insufficient funds in Current Account to purchase crypto!');
      return;
    }

    // Deduct from current, add to crypto
    updateAccountBalance('acc_current', -amountNum);
    updateAccountBalance('acc_crypto', amountNum);

    addTransaction({
      merchant: `Bought ${cryptoAsset}`,
      category: 'Crypto Investment',
      amount: -amountNum,
      type: 'expense',
      icon: 'currency_bitcoin'
    });

    setCryptoSuccess(true);
    setTimeout(() => {
      setCryptoSuccess(false);
      setCryptoAmount('100');
      setActiveModal(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Hero: Balance Card */}
      <section className="relative">
        <div 
          onClick={() => setBalanceVisible(!balanceVisible)}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/10 rounded-[24px] p-5 relative overflow-hidden h-48 flex flex-col justify-between group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
        >
          {/* Decorative Bubble */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
          
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-white/80 uppercase">Total Balance</span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                {balanceVisible ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••••'}
              </h2>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
              <TrendingUp size={14} />
              <span>2.4%</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">Pocket Savings Account</span>
              <span className="text-sm text-white font-mono">{savingsAccount?.accountNumber || '**** 8842'}</span>
            </div>
            <div className="w-12 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              {balanceVisible ? <EyeOff size={16} className="text-white/70" /> : <Eye size={16} className="text-white/70" />}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="grid grid-cols-4 gap-2">
          {/* Action Transfer */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setActiveModal('transfer')}
              className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[26px]">sync</span>
            </button>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Transfer</span>
          </div>

          {/* Action Pay */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setActiveModal('pay')}
              className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[26px]">payments</span>
            </button>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Pay Bills</span>
          </div>

          {/* Action Request */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setActiveModal('request')}
              className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-955 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[26px]">request_quote</span>
            </button>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Request</span>
          </div>

          {/* Action Crypto */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setActiveModal('crypto')}
              className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[26px]">currency_bitcoin</span>
            </button>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Crypto</span>
          </div>
        </div>
      </section>

      {/* Your Accounts Bento Cards */}
      <section className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h3 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100">Your Accounts</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Savings Portfolio card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-3 card-hover hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined text-xl">savings</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Savings</p>
              <p className="font-bold text-base text-slate-800 dark:text-slate-100 mt-0.5">
                ${(savingsAccount?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Current Portfolio card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-3 card-hover hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <span className="material-symbols-outlined text-xl">account_balance</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Current</p>
              <p className="font-bold text-base text-slate-800 dark:text-slate-100 mt-0.5">
                ${(currentAccount?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Cards Scroller */}
      <section className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h3 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100">My Cards</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar scroll-smooth">
          {/* Physical card */}
          <div className="min-w-[280px] h-44 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-5 snap-center relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-lg shadow-indigo-950/20 card-hover">
            <div className="flex justify-between items-start z-10">
              <span className="text-xs font-extrabold tracking-tight text-white italic">PocketBank</span>
              <span className="material-symbols-outlined text-white/50 text-xl">contactless</span>
            </div>
            <div className="z-10">
              <p className="text-white tracking-widest text-[15px] font-mono">**** **** **** 1234</p>
              <div className="flex justify-between items-end mt-3">
                <span className="text-white/70 text-[10px] uppercase font-semibold tracking-wider">CINDY SMITH</span>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-red-500/85"></div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500/85"></div>
                </div>
              </div>
            </div>
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          </div>

          {/* Virtual Card */}
          <div className="min-w-[280px] h-44 bg-white dark:bg-slate-900 rounded-2xl p-5 snap-center relative overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-md card-hover">
            <div className="flex justify-between items-start">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">Virtual Plus</span>
              <div className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 border border-blue-150 dark:border-blue-900">
                <span className="text-[8px] text-blue-600 dark:text-blue-400 uppercase font-bold tracking-wider">Virtual</span>
              </div>
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-200 tracking-widest text-[15px] font-mono">**** **** **** 5678</p>
              <div className="flex justify-between items-end mt-3">
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold tracking-wider">SHOPPING CARD</span>
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded bg-slate-300/30"></div>
                  <div className="w-4 h-4 rounded bg-slate-300/60"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-3 pb-8">
        <div className="flex justify-between items-end px-1">
          <h3 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-100">Activity</h3>
        </div>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              onClick={() => {
                setSelectedTx(tx);
                setActiveModal('transaction');
              }}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all duration-200 cursor-pointer shadow-sm card-hover"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-xl">{tx.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{tx.merchant}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                    {tx.category} • {tx.date}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${tx.type === 'expense' ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'}`}>
                {tx.type === 'expense' ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ALL ACTION DIALOG MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 overflow-hidden shadow-2xl relative select-text"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Transfer Modal Form */}
              {activeModal === 'transfer' && (
                <form onSubmit={handleTransferSubmit} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Transfer Funds</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Easily move balance between your PocketBank accounts instantly.</p>
                  
                  {transferSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-bounce">check_circle</span>
                      <span className="text-sm font-semibold">Transfer Successful!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">From Account</label>
                        <select 
                          value={transferFrom} 
                          onChange={(e) => setTransferFrom(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          <option value="acc_current">Current Account (${currentAccount?.balance})</option>
                          <option value="acc_savings">Savings Account (${savingsAccount?.balance})</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">To Account</label>
                        <select 
                          value={transferTo} 
                          onChange={(e) => setTransferTo(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          <option value="acc_savings">Savings Account (${savingsAccount?.balance})</option>
                          <option value="acc_current">Current Account (${currentAccount?.balance})</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Amount ($)</label>
                        <input 
                          type="number" 
                          required 
                          placeholder="0.00"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Execute Transfer
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Pay Bills Modal Form */}
              {activeModal === 'pay' && (
                <form onSubmit={handlePaySubmit} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Pay Utility Bills</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Deduct instantly from your current balance to settle bill payments.</p>
                  
                  {paySuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-bounce">verified</span>
                      <span className="text-sm font-semibold">Payment Received!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Select Provider</label>
                        <select 
                          value={payService} 
                          onChange={(e) => setPayService(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          <option value="Electricity Bill">Electricity Grid Corp ($45.00)</option>
                          <option value="Highspeed Internet">HyperOptic Fiber ($65.00)</option>
                          <option value="Water Utility">Municipal Water Board ($18.50)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Amount ($)</label>
                        <input 
                          type="number" 
                          required 
                          value={payAmount}
                          onChange={(e) => setPayAmount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Confirm Bill Payment
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Request Money Modal Form */}
              {activeModal === 'request' && (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Request Money</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Send a payment link or generate a request statement to receive funds.</p>
                  
                  {requestSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-bounce">share</span>
                      <span className="text-sm font-semibold">Link Shared Successfully!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Request From (Contact Name)</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Enter contact name"
                          value={requestFrom}
                          onChange={(e) => setRequestFrom(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Requested Amount ($)</label>
                        <input 
                          type="number" 
                          required 
                          placeholder="0.00"
                          value={requestAmount}
                          onChange={(e) => setRequestAmount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Generate Link
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Crypto Investment Modal */}
              {activeModal === 'crypto' && (
                <form onSubmit={handleCryptoSubmit} className="space-y-4">
                  <h3 className="font-extrabold text-lg text-slate-800 dark:text-white tracking-tight">Crypto Trading</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Simulate direct crypto token purchase using your checking account.</p>
                  
                  {cryptoSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-pulse">currency_bitcoin</span>
                      <span className="text-sm font-semibold">Token Acquired Successfully!</span>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Crypto Token</label>
                        <select 
                          value={cryptoAsset} 
                          onChange={(e) => setCryptoAsset(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                          <option value="Bitcoin (BTC)">Bitcoin (BTC)</option>
                          <option value="Ethereum (ETH)">Ethereum (ETH)</option>
                          <option value="Solana (SOL)">Solana (SOL)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Investment ($)</label>
                        <input 
                          type="number" 
                          required 
                          value={cryptoAmount}
                          onChange={(e) => setCryptoAmount(e.target.value)}
                          className="w-full h-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs text-slate-800 dark:text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 dark:shadow-none active:scale-95"
                      >
                        Buy Instantly
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Transaction details modal */}
              {activeModal === 'transaction' && selectedTx && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center py-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-805 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
                      <span className="material-symbols-outlined text-3xl">{selectedTx.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">{selectedTx.merchant}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">{selectedTx.category}</span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Transaction Date</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedTx.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Standard</span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">AES-256 Encrypted</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clearing Status</span>
                      <span className="text-emerald-500 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Cleared
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                      <span className="font-bold text-slate-800 dark:text-white">Amount Settle</span>
                      <span className={`font-extrabold ${selectedTx.type === 'expense' ? 'text-rose-600 dark:text-rose-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {selectedTx.type === 'expense' ? '-' : '+'}${Math.abs(selectedTx.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setActiveModal(null)}
                    className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors mt-4"
                  >
                    Done
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
