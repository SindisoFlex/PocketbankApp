import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Splash } from './components/Splash';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { HomeDashboard } from './components/HomeDashboard';
import { AllAccounts } from './components/AllAccounts';
import { MyCards } from './components/MyCards';
import { Support } from './components/Support';
import { ProfileMore } from './components/ProfileMore';
import { Navbar } from './components/Navbar';
import { Bell, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { currentScreen, user } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, title: 'Salary Cleared', text: 'Incoming deposit of $4,500.00 settled successfully.', type: 'success' },
    { id: 2, title: 'Secure Login Detected', text: 'Biometric authorization granted from primary device.', type: 'info' },
    { id: 3, title: 'Rewards Ready', text: 'You have 12,450 points ready to redeem for cash credits.', type: 'warning' }
  ]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <Splash />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'forgot_password':
        return <ForgotPassword />;
      case 'home':
        return <HomeDashboard />;
      case 'accounts':
        return <AllAccounts />;
      case 'cards':
        return <MyCards />;
      case 'support':
        return <Support />;
      case 'profile':
        return <ProfileMore />;
      default:
        return <HomeDashboard />;
    }
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'PocketBank';
      case 'accounts':
        return 'All Accounts';
      case 'cards':
        return 'My Cards';
      case 'support':
        return 'AI Assistant';
      case 'profile':
        return 'More Options';
      default:
        return 'PocketBank';
    }
  };

  const isAuthScreen = ['home', 'accounts', 'cards', 'support', 'profile'].includes(currentScreen);

  const clearNotifs = () => {
    setNotifs([]);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 font-sans select-none">
      {isAuthScreen ? (
        /* Authenticated Screen Layout Wrapper */
        <div className="pb-24">
          {/* Main Top App Bar */}
          <header className="fixed top-0 left-0 w-full z-30 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-850 px-5 py-3.5 flex justify-between items-center shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center gap-3">
              {/* Profile Avatar click takes them to profile */}
              <div 
                onClick={() => useApp().setScreen('profile')}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 dark:border-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 shadow-sm shadow-blue-500/10"
              >
                <img 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                  alt="User Avatar"
                  src={user.avatar}
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider leading-none mb-0.5">Welcome back,</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-none">{user.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Title */}
              <h1 className="text-xs font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase ml-2 hidden xs:block select-none">
                {getScreenTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {/* Notification Alarm action toggle */}
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95 transition-all relative"
              >
                <Bell size={18} />
                {notifs.length > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                )}
              </button>
            </div>
          </header>

          {/* Authenticated Screen Body Injection */}
          <main className="pt-20 px-5 max-w-lg mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, cubicBezier: [0.16, 1, 0.3, 1] }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Shared Navigation bottom dock */}
          <Navbar />

          {/* Notifications Side Drawer Drawer */}
          <AnimatePresence>
            {showNotifications && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowNotifications(false)}
                />
                <motion.div 
                  initial={{ translateX: '100%' }}
                  animate={{ translateX: 0 }}
                  exit={{ translateX: '100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="relative bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 w-full max-w-[280px] h-full p-5 flex flex-col justify-between shadow-2xl z-50 select-text"
                >
                  <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3.5">
                      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      >
                        <span className="material-symbols-outlined text-base">close</span>
                      </button>
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1 custom-scrollbar">
                      {notifs.length > 0 ? (
                        notifs.map(n => (
                          <div 
                            key={n.id} 
                            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900/60 p-3 rounded-xl space-y-1"
                          >
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                              {n.type === 'success' ? <CheckCircle size={12} className="text-emerald-500" /> : <Info size={12} />}
                              {n.title}
                            </div>
                            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">{n.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-3xl">notifications_off</span>
                          No active notifications
                        </div>
                      )}
                    </div>
                  </div>

                  {notifs.length > 0 && (
                    <button 
                      onClick={clearNotifs}
                      className="w-full h-11 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-xs font-semibold text-slate-600 dark:text-slate-300 rounded-xl transition-all"
                    >
                      Clear Notifications
                    </button>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Auth Screen (Splash, Login, Register, Forgot Password) direct rendering */
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
