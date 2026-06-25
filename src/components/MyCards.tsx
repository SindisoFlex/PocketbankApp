import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard } from '../types';
import { Shield, Eye, EyeOff, Snowflake, Key, RefreshCw, Smartphone, DollarSign, Settings, Check, CreditCard as CardIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MyCards: React.FC = () => {
  const { cards, toggleFreezeCard, updateCardSettings, addTransaction } = useApp();
  const [selectedCardId, setSelectedCardId] = useState('card_virtual_platinum');
  const [revealDetails, setRevealDetails] = useState(false);
  const [activeModal, setActiveModal] = useState<'pin' | 'replace' | 'upgrade' | null>(null);
  const [replaceSuccess, setReplaceSuccess] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const handleToggleFreeze = () => {
    toggleFreezeCard(selectedCard.id);
    addTransaction({
      merchant: `${selectedCard.isFrozen ? 'Unfroze' : 'Froze'} Card: ${selectedCard.cardName}`,
      category: 'Security',
      amount: 0,
      type: 'income',
      icon: selectedCard.isFrozen ? 'lock_open' : 'lock'
    });
  };

  const handleToggleSetting = (field: 'onlinePayments' | 'atmWithdrawals' | 'contactlessPayments') => {
    const newVal = !selectedCard[field];
    updateCardSettings(selectedCard.id, { [field]: newVal });
    addTransaction({
      merchant: `Updated ${field} on ${selectedCard.cardName}`,
      category: 'Card Config',
      amount: 0,
      type: 'income',
      icon: 'settings'
    });
  };

  const handleReplaceCard = (e: React.FormEvent) => {
    e.preventDefault();
    setReplaceSuccess(true);
    addTransaction({
      merchant: `Requested replacement for ${selectedCard.cardName}`,
      category: 'Administration',
      amount: 0,
      type: 'expense',
      icon: 'autorenew'
    });
    setTimeout(() => {
      setReplaceSuccess(false);
      setActiveModal(null);
    }, 1500);
  };

  const handleUpgrade = () => {
    setUpgradeSuccess(true);
    addTransaction({
      merchant: `Upgraded to Platinum Ultimate Tier`,
      category: 'Subscription',
      amount: -49.00,
      type: 'expense',
      icon: 'workspace_premium'
    });
    setTimeout(() => {
      setUpgradeSuccess(false);
      setActiveModal(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Primary Card View Section */}
      <section className="space-y-4">
        {/* Card Container */}
        <div className="relative group h-56 w-full rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-[1.01]">
          {/* Background visuals depending on frozen state and card selection */}
          <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 ${
            selectedCard.isFrozen ? 'from-slate-700 to-slate-900 saturate-50' :
            selectedCard.type === 'physical' ? 'from-indigo-950 to-indigo-800' :
            selectedCard.type === 'shared' ? 'from-amber-600 to-slate-900' :
            'from-blue-600 via-indigo-750 to-slate-900'
          }`}></div>
          
          <div className="absolute inset-0 bg-white/5 opacity-10 pointer-events-none"></div>

          {/* Frozen Overlay indicator */}
          {selectedCard.isFrozen && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-rose-300 gap-2">
              <span className="material-symbols-outlined text-4xl animate-pulse">lock</span>
              <span className="text-xs font-bold tracking-widest uppercase">Card Frozen</span>
            </div>
          )}

          {/* Card Content Layout */}
          <div className="relative h-full p-6 flex flex-col justify-between text-white z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                  {selectedCard.cardName}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    pentagon
                  </span>
                  <span className="font-extrabold text-base tracking-tight">PocketBank</span>
                </div>
              </div>

              {/* Hologram Card chip */}
              <div className="w-12 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <div className="w-8 h-5 bg-gradient-to-r from-yellow-500 to-yellow-200 rounded-sm opacity-85"></div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Card number */}
              <div className="flex justify-between items-center">
                <span className="font-mono text-base tracking-[0.18em]">
                  {revealDetails ? selectedCard.number.replace(/••••/g, '4802') : selectedCard.number}
                </span>
                <button 
                  onClick={() => setRevealDetails(!revealDetails)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {revealDetails ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Card info rows */}
              <div className="flex justify-between items-end">
                <div className="flex gap-8 text-[11px]">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-white/55 uppercase tracking-wider">Expiry</p>
                    <p className="font-bold">{selectedCard.expiry}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-white/55 uppercase tracking-wider">CVV</p>
                    <p className="font-bold">{revealDetails ? selectedCard.cvv : '•••'}</p>
                  </div>
                </div>

                {/* Card Scheme Brand logo */}
                <div className="text-right">
                  <span className="text-xs font-black tracking-tighter uppercase italic text-white/80">
                    {selectedCard.brand}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick controls row */}
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={handleToggleFreeze}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all active:scale-95 group bg-white dark:bg-slate-900 shadow-sm ${
              selectedCard.isFrozen ? 'border-red-200 text-red-500 dark:border-red-950 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              selectedCard.isFrozen ? 'bg-red-100 dark:bg-red-950/40' : 'bg-blue-50 dark:bg-blue-950/40 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            }`}>
              <Snowflake size={18} className={selectedCard.isFrozen ? 'animate-spin' : ''} />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase">
              {selectedCard.isFrozen ? 'Unfreeze' : 'Freeze'}
            </span>
          </button>

          <button 
            onClick={() => setActiveModal('pin')}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all active:scale-95 group"
          >
            <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-950/40 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Key size={18} />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase">View PIN</span>
          </button>

          <button 
            onClick={() => setActiveModal('replace')}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-sm transition-all active:scale-95 group"
          >
            <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-blue-950/40 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <RefreshCw size={18} />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase">Replace</span>
          </button>
        </div>
      </section>

      {/* Other Cards List selector */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-bold text-sm text-slate-800 dark:text-slate-100">Other Cards</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-1 hide-scrollbar">
          {cards.map(c => (
            <div 
              key={c.id}
              onClick={() => {
                setSelectedCardId(c.id);
                setRevealDetails(false);
              }}
              className={`min-w-[240px] h-36 rounded-2xl p-4 flex flex-col justify-between border relative overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300 ${
                selectedCardId === c.id 
                  ? 'bg-slate-50 dark:bg-slate-900 border-blue-500 dark:border-blue-400 scale-[1.01] shadow-sm' 
                  : 'bg-white dark:bg-slate-955 border-slate-200 dark:border-slate-850 opacity-70'
              }`}
            >
              <div className="flex justify-between items-start z-10">
                <div>
                  <p className="text-[9px] uppercase font-bold text-blue-600 dark:text-blue-400">{c.cardName}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold">{c.isFrozen ? 'Frozen' : 'Active'}</p>
                </div>
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-base">contactless</span>
              </div>
              <div className="flex justify-between items-end z-10">
                <p className="font-mono text-xs tracking-wider text-slate-700 dark:text-slate-200">•••• {c.number.slice(-4)}</p>
                <span className="text-[10px] font-bold uppercase italic text-slate-400 dark:text-slate-500">{c.brand}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security controls list toggles */}
      <section className="space-y-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 px-1">Security &amp; Settings</h3>
        
        <div className="space-y-1">
          {/* Option 1: Online Payments */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer" onClick={() => handleToggleSetting('onlinePayments')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Settings size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Online Payments</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Allow virtual web transactions</p>
              </div>
            </div>
            {/* Custom Toggle Switch */}
            <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
              selectedCard.onlinePayments ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-md ${
                selectedCard.onlinePayments ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </div>

          {/* Option 2: ATM Withdrawals */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer" onClick={() => handleToggleSetting('atmWithdrawals')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <Smartphone size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">ATM Withdrawals</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">Allow physical terminal cash outs</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
              selectedCard.atmWithdrawals ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-md ${
                selectedCard.atmWithdrawals ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </div>

          {/* Option 3: Contactless NFC */}
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer" onClick={() => handleToggleSetting('contactlessPayments')}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-300">
                <CardIcon size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Contactless Payments</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">NFC mobile tap and terminal pay</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
              selectedCard.contactlessPayments ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-md ${
                selectedCard.contactlessPayments ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Upgrade Banner */}
      <div className="relative rounded-3xl p-5 overflow-hidden border border-blue-100 dark:border-blue-955 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 flex items-center justify-between shadow-sm">
        <div className="space-y-1 z-10">
          <h4 className="font-extrabold text-sm text-blue-600 dark:text-blue-400">Go Platinum Pro</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[180px]">Settle with fully metallic engraved physical cards and active VIP lounge access.</p>
        </div>
        <button 
          onClick={() => setActiveModal('upgrade')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold active:scale-95 transition-all z-10 shadow-md shadow-blue-500/10"
        >
          Upgrade
        </button>
      </div>

      {/* POPUP OVERLAY DIALOG MODALS */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-sm p-6 overflow-hidden shadow-2xl relative text-center select-text"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Secure PIN Popup */}
              {activeModal === 'pin' && (
                <div className="space-y-5 py-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined text-2xl">shield_lock</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-800 dark:text-white tracking-tight">Secure PIN Code</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Here is the active 4-digit PIN for terminal purchases on this card.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 py-4 rounded-xl max-w-[160px] mx-auto text-2xl font-extrabold tracking-[0.4em] font-mono text-blue-600 dark:text-blue-400 shadow-inner">
                    {selectedCard.pin}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-wider font-bold">Do not disclose this PIN number to anyone.</p>
                </div>
              )}

              {/* Replacement Request Modal */}
              {activeModal === 'replace' && (
                <form onSubmit={handleReplaceCard} className="space-y-5 py-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined text-2xl">autorenew</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-800 dark:text-white tracking-tight">Request Card Replacement</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      This will freeze and terminate card ending in <span className="text-slate-800 dark:text-white font-bold">{selectedCard.number.slice(-4)}</span> and dispatch a new one to your registered branch.
                    </p>
                  </div>

                  {replaceSuccess ? (
                    <div className="text-blue-600 dark:text-blue-400 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                      <Check size={16} /> Dispatched Successfully!
                    </div>
                  ) : (
                    <button 
                      type="submit"
                      className="w-full h-12 bg-red-50 dark:bg-red-950/40 hover:bg-red-100/50 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-950 text-xs font-bold rounded-xl transition-all"
                    >
                      Confirm Card Re-issue
                    </button>
                  )}
                </form>
              )}

              {/* Premium Tier upgrade */}
              {activeModal === 'upgrade' && (
                <div className="space-y-5 py-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
                    <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-800 dark:text-white tracking-tight">Upgrade to PocketBank Pro</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Deduct a one-time deployment charge of <span className="text-slate-800 dark:text-white font-bold">$49.00</span> checking balance and claim priority status.
                    </p>
                  </div>

                  {upgradeSuccess ? (
                    <div className="text-emerald-500 dark:text-emerald-400 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 animate-pulse">
                      <Check size={16} className="stroke-[3px]" /> Upgraded to Pro Successfully!
                    </div>
                  ) : (
                    <button 
                      onClick={handleUpgrade}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10"
                    >
                      Authorize Payment ($49.00)
                    </button>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
