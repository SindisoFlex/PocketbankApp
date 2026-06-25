import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Sparkles, MessageCircle, Info, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const Support: React.FC = () => {
  const { user, accounts, cards } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello Cindy! I am your PocketBank AI Assistant. You are connected to a secure end-to-end encrypted connection. How can I assist you with your premium portfolio or account operations today?`,
      time: 'Just Now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Check my balance',
    'How do I freeze my card?',
    'Open a crypto wallet',
    'Transfer $100 to savings'
  ];

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text,
      time: 'Just Now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart AI response
    setTimeout(() => {
      let aiResponseText = '';
      const query = text.toLowerCase();

      if (query.includes('balance') || query.includes('how much money')) {
        const checking = accounts.find(a => a.id === 'acc_current')?.balance || 0;
        const savings = accounts.find(a => a.id === 'acc_savings')?.balance || 0;
        aiResponseText = `Your current checking account balance is **$${checking.toLocaleString()}** and your high-yield savings balance is **$${savings.toLocaleString()}**, for a combined total portfolio value of **$${(checking + savings).toLocaleString()}**.`;
      } else if (query.includes('freeze') || query.includes('lost my card')) {
        aiResponseText = `To instantly freeze your Virtual Platinum or Physical Debit card:\n\n1. Go to the **Cards** tab.\n2. Tap the card you wish to freeze.\n3. Click the **Freeze** button. \n\nThis will temporarily disable online payments, ATM withdrawals, and contactless payments immediately.`;
      } else if (query.includes('crypto') || query.includes('bitcoin') || query.includes('solana')) {
        const cryptoVal = accounts.find(a => a.id === 'acc_crypto')?.balance || 0;
        aiResponseText = `You currently have **$${cryptoVal.toLocaleString()}** worth of digital assets inside your Multi-Asset Crypto Wallet. You can trade Bitcoin (BTC), Ethereum (ETH), or Solana (SOL) instantly inside the **Accounts** tab under "Open New Account" or direct Crypto Trading modal.`;
      } else if (query.includes('transfer') || query.includes('send money')) {
        aiResponseText = `To transfer money instantly:\n\n- Tap the **Transfer** icon in your **Home** dashboard.\n- Choose your source and destination ledgers.\n- Enter the amount and tap "Execute Transfer".\n\nFunds will settle securely with zero clearing lag.`;
      } else {
        aiResponseText = `I understand you have a request regarding "${text}". As your premium bank assistant, I can confirm that your security parameters are nominal. Please feel free to navigate our secure app tabs to adjust settings, request card re-issues, or redeem your 12,450 PocketPoints for physical cash credits.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: aiResponseText,
        time: 'Just Now'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  const parseBoldText = (text: string) => {
    return text.split('**').map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4 font-sans max-w-lg mx-auto relative">
      {/* Top info badge */}
      <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-950/80 p-3 rounded-xl flex items-center gap-2.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
        <Sparkles size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
        <p>You are talking to the **PocketBank Chatbot** supported by Google Gemini. Settle balance inquiries or request help instantly.</p>
      </div>

      {/* Messages Canvas */}
      <div className="flex-grow overflow-y-auto pr-1 space-y-4 custom-scrollbar select-text">
        {messages.map((m) => (
          <div 
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                m.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200 rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-line">
                {parseBoldText(m.text)}
              </div>
              <p className={`text-[9px] font-semibold mt-2 text-right ${
                m.sender === 'user' ? 'text-white/70' : 'text-slate-400 dark:text-slate-500'
              }`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 max-w-[85%] rounded-2xl rounded-bl-none p-4 text-xs flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts lists */}
      {messages.length === 1 && (
        <div className="space-y-1.5 px-1 pb-1">
          <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Suggested Topics</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((qp, idx) => (
              <button 
                key={idx}
                onClick={() => handleSendMessage(qp)}
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] text-blue-600 dark:text-blue-400 px-3.5 py-2 rounded-xl transition-colors font-bold active:scale-95 duration-150 shadow-sm"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input row */}
      <div className="relative flex items-center">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage(inputText);
          }}
          placeholder="Ask anything or request support..."
          className="w-full h-14 pl-4 pr-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all shadow-sm"
        />
        <button 
          onClick={() => handleSendMessage(inputText)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white flex items-center justify-center shadow-md shadow-blue-500/10"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
