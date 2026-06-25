import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Key, Eye, HelpCircle, FileText, Globe, Moon, Award, LogOut, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfileMore: React.FC = () => {
  const { user, theme, toggleTheme, redeemPoints, logout, setScreen } = useApp();
  const [activeModal, setActiveModal] = useState<'redeem' | 'details' | 'docs' | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [selectedReward, setSelectedReward] = useState('');
  const [pointsError, setPointsError] = useState('');

  const rewards = [
    { name: '$10 Cash Deposit', cost: 1000, desc: 'Deduct points and credit cash directly to checking.' },
    { name: 'Amazon $25 Giftcard', cost: 2500, desc: 'E-voucher code delivered instantly to registered email.' },
    { name: 'Starbucks Premium Coupon', cost: 500, desc: 'Receive code for one free premium beverage.' }
  ];

  const handleRedeem = (rewardName: string, cost: number) => {
    if (user.points < cost) {
      setPointsError('Insufficient points balance!');
      setTimeout(() => setPointsError(''), 2500);
      return;
    }

    setSelectedReward(rewardName);
    const ok = redeemPoints(cost, rewardName);
    if (ok) {
      setRedeemSuccess(true);
      setTimeout(() => {
        setRedeemSuccess(false);
        setSelectedReward('');
        setActiveModal(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Profile Section */}
      <section className="flex flex-col items-center py-4">
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-600/10 dark:bg-blue-600/20 blur-2xl rounded-full opacity-55"></div>
          <div className="relative w-28 h-28 rounded-3xl overflow-hidden border-2 border-blue-100 dark:border-blue-900/40 p-1 bg-white dark:bg-slate-900 shadow-md">
            <img 
              className="w-full h-full object-cover rounded-2xl" 
              referrerPolicy="no-referrer"
              alt="Cindy Portrait"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFqr9cJLTETv7YKqYDSubg6C-jWLn_3ITX-6GDaUEyqUag6eK6m9dvUyxPNcW1kwcR_AiHiCCoz5FgQoHA-Jp3zA1WAiMD99hE1HI1Re3eunh2B_bfi5oop9Sei9isB-YKjLR0TF7binP9u4Q5WM8TyL9jlu4E7Wvsq-faH6yxl-XCIMC0JAnPQ6yvlSa21FtN0HzrxiFrsHpB43paW17BwVD3DDrVIK2BKvoXl2kU7tX6M0F7Qo683g7o3N0HBO90Yw7QOLp5VNU"
            />
          </div>
          <div className="absolute -bottom-1 -right-2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
            <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            PRO
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h2 className="font-extrabold text-xl text-slate-800 dark:text-slate-100 tracking-tight">{user.name}</h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider mt-0.5">{user.email}</p>
        </div>
      </section>

      {/* Rewards Section */}
      <section>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <div>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-widest font-bold">PocketPoints</p>
              <p className="text-xl font-black text-slate-800 dark:text-slate-100 mt-0.5">{user.points.toLocaleString('en-US')}</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveModal('redeem')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
          >
            Redeem
          </button>
        </div>
      </section>

      {/* Menu Groups */}
      <div className="space-y-4">
        {/* Personal Details category */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 px-2 uppercase tracking-widest">Personal Info</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-850 shadow-sm">
            <button 
              onClick={() => setActiveModal('details')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <User size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold">Personal Details</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">chevron_right</span>
            </button>
            <button 
              onClick={() => setActiveModal('docs')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <FileText size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold">Banking Documents</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Privacy category */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 px-2 uppercase tracking-widest">Privacy &amp; Security</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-850 shadow-sm">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left">
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <Shield size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold">Security &amp; Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100 dark:border-emerald-950">ACTIVE</span>
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">chevron_right</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left">
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <span className="material-symbols-outlined text-xl text-slate-400 dark:text-slate-500">fingerprint</span>
                <span className="text-xs font-bold">Biometric ID</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Settings category */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 px-2 uppercase tracking-widest">App Settings</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-850 shadow-sm">
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <Globe size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold">Language</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                <span className="text-xs font-semibold">English (US)</span>
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">chevron_right</span>
              </div>
            </div>
            
            <div className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <Moon size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold">Dark Theme</span>
              </div>
              {/* Direct active switch */}
              <div 
                onClick={toggleTheme}
                className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${
                  theme === 'dark' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all shadow-md ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* Help category */}
        <div className="space-y-2">
          <h3 className="text-[9px] font-bold text-slate-400 dark:text-slate-500 px-2 uppercase tracking-widest">Support</h3>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setScreen('support')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3.5 text-slate-700 dark:text-slate-200">
                <HelpCircle size={18} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-bold">Support Center</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Logout action */}
        <div className="pt-4">
          <button 
            onClick={logout}
            className="w-full bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
          >
            <LogOut size={16} />
            Logout Account
          </button>
          <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase mt-6">
            Version 2.4.1 (Build 4452)
          </p>
        </div>
      </div>

      {/* POPUP REWARDS MODAL */}
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
                onClick={() => {
                  setActiveModal(null);
                  setRedeemSuccess(false);
                  setPointsError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {activeModal === 'redeem' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    <Award size={20} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-base tracking-tight">Redeem Rewards</h3>
                  </div>

                  {redeemSuccess ? (
                    <div className="py-8 text-center text-blue-600 dark:text-blue-400 space-y-2">
                      <span className="material-symbols-outlined text-5xl block animate-bounce">check_circle</span>
                      <span className="text-sm font-bold">Reward Claimed!</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Deducted points balance. Check activity ledger.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-1">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Available Points: <span className="text-slate-800 dark:text-white font-bold">{user.points.toLocaleString()} pts</span></p>
                      
                      {pointsError && (
                        <div className="text-xs text-rose-500 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/20 p-2 rounded-xl text-center">
                          {pointsError}
                        </div>
                      )}

                      {rewards.map((r, idx) => (
                        <div 
                          key={idx}
                          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-3 flex justify-between items-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                        >
                          <div className="space-y-0.5 max-w-[160px]">
                            <p className="text-xs font-bold text-slate-800 dark:text-white">{r.name}</p>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal font-semibold">{r.desc}</p>
                          </div>
                          <button 
                            onClick={() => handleRedeem(r.name, r.cost)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wider uppercase transition-all ${
                              user.points >= r.cost 
                                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-sm' 
                                : 'bg-slate-100 dark:bg-slate-850 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            {r.cost} Pts
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeModal === 'details' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    <User size={20} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-base tracking-tight">Personal Details</h3>
                  </div>
                  <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p><strong className="text-slate-800 dark:text-slate-100">Name:</strong> {user.name} Smith</p>
                    <p><strong className="text-slate-800 dark:text-slate-100">Registered Email:</strong> {user.email}</p>
                    <p><strong className="text-slate-800 dark:text-slate-100">Phone:</strong> +1 (555) 019-2831</p>
                    <p><strong className="text-slate-800 dark:text-slate-100">Nationality:</strong> United States</p>
                    <p><strong className="text-slate-800 dark:text-slate-100">Branch Center:</strong> Silicon Valley Tech Hub</p>
                    <p><strong className="text-slate-800 dark:text-slate-100">Verification Status:</strong> Fully KYC Verified</p>
                  </div>
                </div>
              )}

              {activeModal === 'docs' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                    <h3 className="font-extrabold text-base tracking-tight">Banking Documents</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Claim or download authentic cryptographic banking records directly:</p>
                    
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-850 text-xs text-slate-800 dark:text-slate-100 font-bold transition-all">
                      <span>June 2026 Statement</span>
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base">download</span>
                    </a>
                    <a href="#" onClick={(e) => e.preventDefault()} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-850 text-xs text-slate-800 dark:text-slate-100 font-bold transition-all">
                      <span>Tax Certification 2025</span>
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base">download</span>
                    </a>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
