import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';
import pocketBankLogo from '../assets/images/pocketbank_logo_1782401279332.jpg';

export const Splash: React.FC = () => {
  const { setScreen } = useApp();
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number; duration: number }>>([]);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  useEffect(() => {
    // Generate floating atmospheric particles
    const list = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 10,
      duration: 5 + Math.random() * 10
    }));
    setParticles(list);

    // Auto-advance timeline:
    // After 3.5s show the success flash, and then after 800ms transition to Login screen
    const flashTimeout = setTimeout(() => {
      setShowSuccessFlash(true);
    }, 3200);

    const loginTimeout = setTimeout(() => {
      setScreen('login');
    }, 4000);

    return () => {
      clearTimeout(flashTimeout);
      clearTimeout(loginTimeout);
    };
  }, [setScreen]);

  return (
    <div className="relative w-full h-screen bg-slate-950 text-slate-100 overflow-hidden flex items-center justify-center font-sans">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#0f172a_100%)]">
        {/* Particle Canvas */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute bg-blue-500 rounded-full opacity-30 blur-[1px]"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `float ${p.duration}s linear ${p.delay}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Card */}
      <main className="relative z-10 flex flex-col items-center justify-center px-5 text-center max-w-md">
        {/* Premium App Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.5, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center drop-shadow-[0_0_35px_rgba(59,130,246,0.35)] hover:scale-105 transition-transform duration-700">
            <img
              alt="PocketBank Premium Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              src={pocketBankLogo}
            />
          </div>
        </motion.div>

        {/* Branding & Typography */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-extrabold text-3xl md:text-4xl text-white tracking-tight"
          >
            PocketBank
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase"
          >
            Project Banking
          </motion.p>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="h-1 bg-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-xs text-slate-500 italic mt-4 font-semibold"
          >
            Banking made simple for the future
          </motion.p>
        </div>

        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setScreen('login')}
          className="mt-12 px-6 py-2 rounded-full border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition-colors text-xs text-slate-300 tracking-wider font-bold active:scale-95 duration-150"
        >
          Skip Splash
        </motion.button>

        {/* Loading Indicator */}
        <div className="absolute bottom-16 flex flex-col items-center gap-2 opacity-80">
          <div className="flex gap-1.5 items-center">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.5s]"></span>
          </div>
          <span className="text-[10px] tracking-[0.15em] font-semibold text-slate-500 uppercase">
            Encrypting Connection
          </span>
        </div>
      </main>

      {/* Success Flash Overlay */}
      <div
        className={`fixed inset-0 bg-blue-500/5 backdrop-blur-3xl pointer-events-none transition-opacity duration-1000 z-50 flex items-center justify-center ${
          showSuccessFlash ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-4 text-blue-500">
          <span className="material-symbols-outlined text-6xl animate-pulse">shield_lock</span>
          <span className="text-sm font-bold tracking-widest">SECURE LINK ESTABLISHED</span>
        </div>
      </div>

      {/* Floating Particles Custom Keyframes style block */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-120px) translateX(30px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
