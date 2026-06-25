import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Fingerprint, Smile } from 'lucide-react';
import pocketBankLogo from '../assets/images/pocketbank_logo_1782401279332.jpg';

export const Login: React.FC = () => {
  const { setScreen, theme, toggleTheme } = useApp();
  const [email, setEmail] = useState('cindy.banker@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setAuthMsg('Verifying credentials...');

    setTimeout(() => {
      setIsLoading(false);
      setScreen('home');
    }, 1500);
  };

  const triggerBiometric = (type: 'Touch ID' | 'Face ID') => {
    setIsLoading(true);
    setAuthMsg(`Initializing ${type} sensor...`);
    
    setTimeout(() => {
      setAuthMsg('Authenticating securely...');
      setTimeout(() => {
        setIsLoading(false);
        setScreen('home');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Decorative Atmospheric Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full"></div>
      </div>

      <main className="flex-grow flex flex-col items-center justify-center px-5 py-8 max-w-md mx-auto w-full">
        {/* Header/Identity */}
        <header className="flex flex-col items-center gap-4 mb-10 text-center">
          <div className="relative group cursor-pointer" onClick={() => setScreen('splash')}>
            <img
              alt="PocketBank Logo"
              className="w-24 h-24 object-contain animate-pulse duration-[3000ms]"
              referrerPolicy="no-referrer"
              src={pocketBankLogo}
            />
            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 blur-2xl rounded-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          </div>
          <div>
            <h1 className="font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">PocketBank</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">Project Banking</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold italic mt-0.5">Banking made simple for the future</p>
          </div>
        </header>

        {/* Auth message banner */}
        {authMsg && (
          <div className="w-full mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 text-xs text-center font-bold animate-pulse shadow-sm">
            {authMsg}
          </div>
        )}

        {/* Form panel */}
        <section className="w-full space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase px-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-white rounded-xl pl-11 pr-4 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase" htmlFor="password">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setScreen('forgot_password')}
                    disabled={isLoading}
                    className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-800 dark:text-white rounded-xl pl-11 pr-11 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-semibold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign In Primary Action */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-[1px] bg-slate-100 dark:bg-slate-800"></div>
              <span className="px-4 text-[10px] text-slate-400 dark:text-slate-500 tracking-widest uppercase font-bold">
                Or Secure Login
              </span>
              <div className="flex-grow h-[1px] bg-slate-100 dark:bg-slate-800"></div>
            </div>

            {/* Biometric Credentials */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => triggerBiometric('Touch ID')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-xl py-3 active:scale-95 transition-all text-xs font-bold shadow-sm"
              >
                <Fingerprint size={16} className="text-blue-600 dark:text-blue-400" />
                Touch ID
              </button>
              <button
                type="button"
                onClick={() => triggerBiometric('Face ID')}
                disabled={isLoading}
                className="flex items-center justify-center gap-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-xl py-3 active:scale-95 transition-all text-xs font-bold shadow-sm"
              >
                <Smile size={16} className="text-blue-600 dark:text-blue-400" />
                Face ID
              </button>
            </div>
          </div>

          {/* Registration Trigger link */}
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Don't have an account?{' '}
            <button
              onClick={() => setScreen('register')}
              disabled={isLoading}
              className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline ml-1"
            >
              Register here
            </button>
          </p>
        </section>
      </main>

      {/* Theme Toggle Footer */}
      <footer className="p-5 flex justify-center items-center gap-4">
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800 shadow-inner">
          <button
            onClick={() => {
              if (theme === 'light') toggleTheme();
            }}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === 'dark' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] block">dark_mode</span>
          </button>
          <button
            onClick={() => {
              if (theme === 'dark') toggleTheme();
            }}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === 'light' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] block">light_mode</span>
          </button>
        </div>
        <p className="text-[10px] tracking-wider text-slate-400 dark:text-slate-500 uppercase font-bold">
          Secure End-To-End Encryption
        </p>
      </footer>
    </div>
  );
};
