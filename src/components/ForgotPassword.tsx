import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const { setScreen } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Top Navigation */}
      <header className="flex justify-between items-center w-full px-5 py-6 z-50">
        <button
          onClick={() => setScreen('login')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all active:scale-90"
        >
          <ArrowLeft size={18} className="text-slate-700 dark:text-slate-300" />
        </button>
        <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">PocketBank</div>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-5 pb-12 max-w-sm mx-auto w-full">
        {!success ? (
          <div className="w-full space-y-8 animate-fadeIn">
            {/* 3D Lock Illustration */}
            <div className="flex flex-col items-center relative">
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 blur-3xl rounded-full"></div>
              <div className="relative w-40 h-40 flex items-center justify-center animate-bounce duration-[4000ms] drop-shadow-[0_0_35px_rgba(59,130,246,0.25)]">
                <img
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  alt="Futuristic Metallic Purple Lock"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHy17oiUawNBYO6n3GcA6HMwhfyCGXBvXb7zMi-iYAERtskcXWKxlVZIKGSimBM-QeW3pbKDAjczDZhJTzWF9QrRTqAn7ru20vFzFSIUQtt5E13UA-zgCiT9zUJLY3YviBCpAAtNcU-PVoDP7Dao97QdLiSM6h4cgA98cv4bZRtqdWMCoCaNg0Lk5ol05ZGXI0dBkPiRXHHI63xKRWUupbkQte3Lvoa5BzR2lRGF1MYvTbeivMRyH0oYlucD9_Ro5XRk7TJiDVocw"
                />
              </div>
            </div>

            {/* Header copy */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Forgot Password?</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed px-4">
                Enter your email address below and we'll send you secure instructions to reset your password.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-1 block" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-sm text-slate-800 dark:text-white font-semibold rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold shadow-md shadow-blue-500/10 active:scale-95 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Check your inbox state */
          <div className="w-full text-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-7xl animate-pulse">check_circle</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Check your inbox</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                We have sent secure password reset instructions to <span className="text-blue-600 dark:text-blue-400 font-extrabold">{email}</span>. Please check your spam folder if you do not receive it shortly.
              </p>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="text-blue-600 dark:text-blue-400 text-xs font-extrabold hover:underline"
            >
              Try a different email
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Remember your password?{' '}
            <button onClick={() => setScreen('login')} className="text-blue-600 dark:text-blue-400 font-extrabold hover:underline ml-1">
              Sign In
            </button>
          </p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed px-6 uppercase tracking-wider font-bold">
            If you don't receive an email within 5 minutes, check your spam folder or contact 24/7 support.
          </p>
        </div>
      </main>
    </div>
  );
};
