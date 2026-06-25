import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, ArrowRight, Wallet, CheckCircle, MapPin, ChevronDown } from 'lucide-react';

export const Register: React.FC = () => {
  const { setScreen } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'savings' | 'current'>('savings');
  const [branch, setBranch] = useState('Silicon Valley Tech Hub');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setScreen('home');
      }, 2500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-center p-5 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full"></div>
      </div>

      {!success ? (
        <main className="w-full max-w-md z-10 relative">
          {/* Header Identity */}
          <header className="text-center mb-8">
            <div className="inline-block p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4 shadow-md">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-5xl">account_balance_wallet</span>
            </div>
            <h1 className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">Create Your Account</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Secure your financial future with PocketBank.</p>
          </header>

          {/* Register Multi-step Form Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            {/* Progress Bar Indicators */}
            <div className="flex justify-between items-center mb-6 px-1">
              <div className="flex space-x-2">
                <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                <div className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                Step {step} of 3
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Full Name
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl text-sm text-slate-800 dark:text-white font-semibold outline-none transition-all"
                        placeholder="Johnathan Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Email Address
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl text-sm text-slate-800 dark:text-white font-semibold outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <Phone size={18} />
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl text-sm text-slate-800 dark:text-white font-semibold outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full h-14 pl-12 pr-12 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl text-sm text-slate-800 dark:text-white font-semibold outline-none transition-all"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-blue-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <ShieldCheck size={18} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-xl text-sm text-slate-800 dark:text-white font-semibold outline-none transition-all"
                        placeholder="••••••••••••"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-950 flex gap-3 text-xs text-blue-600 dark:text-blue-400 leading-relaxed font-semibold">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-base">security</span>
                    <p>Your password must be at least 12 characters long and contain a mix of uppercase letters, numbers, and symbols.</p>
                  </div>
                </div>
              )}

              {/* Step 3: Account Preferences */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAccountType('savings')}
                        className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-900 group ${
                          accountType === 'savings' ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-850'
                        }`}
                      >
                        <Wallet size={20} className="text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 duration-200" />
                        <span className="font-extrabold text-xs block text-slate-800 dark:text-white">Savings</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-bold">High-interest</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAccountType('current')}
                        className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 text-left transition-all hover:bg-slate-100 dark:hover:bg-slate-900 group ${
                          accountType === 'current' ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-850'
                        }`}
                      >
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mb-2 block group-hover:scale-110 duration-200">account_balance</span>
                        <span className="font-extrabold text-xs block text-slate-800 dark:text-white">Current</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-bold">Daily use</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block">
                      Select Branch
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                        <MapPin size={18} />
                      </span>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full h-14 pl-12 pr-10 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-sm text-slate-800 dark:text-white font-bold rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none outline-none cursor-pointer"
                      >
                        <option>Silicon Valley Tech Hub</option>
                        <option>London Financial Quarter</option>
                        <option>Singapore Marina Bay</option>
                        <option>Tokyo Digital Center</option>
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none">
                        <ChevronDown size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 px-1 mt-2">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-1 bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 rounded text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed cursor-pointer select-none font-semibold">
                      I agree to the <span className="text-blue-600 dark:text-blue-400 underline font-bold">Terms of Service</span> and acknowledge the <span className="text-blue-600 dark:text-blue-400 underline font-bold">Privacy Policy</span>.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="flex-1 h-14 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-[2] h-14 bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/15 hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-2 text-sm"
                  >
                    Next Step
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!agreedTerms || isSubmitting}
                    className={`flex-[2] h-14 bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/15 hover:bg-blue-700 active:scale-95 flex items-center justify-center gap-2 text-sm ${
                      (!agreedTerms || isSubmitting) && 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Create Account
                        <span className="material-symbols-outlined text-base">rocket_launch</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Bottom links */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Already have an account?{' '}
              <button onClick={() => setScreen('login')} className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline ml-1">
                Login here
              </button>
            </p>
            <div className="mt-4 flex justify-center gap-6 text-slate-400 dark:text-slate-500">
              <span className="material-symbols-outlined hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-xl">security</span>
              <span className="material-symbols-outlined hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-xl">help</span>
              <span className="material-symbols-outlined hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer text-xl">language</span>
            </div>
          </footer>
        </main>
      ) : (
        /* Success Overlay Screen */
        <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center space-y-6 animate-fadeIn">
          <div className="p-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <CheckCircle size={72} className="text-blue-600 dark:text-blue-400 animate-bounce" />
          </div>
          <h2 className="font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">Welcome to PocketBank</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm font-semibold">
            Account created successfully! We are redirecting you to your secure premium dashboard.
          </p>
          <div className="h-1.5 w-48 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 animate-loadingWidth"></div>
          </div>
          <style>{`
            @keyframes loadingWidth {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .animate-loadingWidth {
              animation: loadingWidth 2.5s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};
