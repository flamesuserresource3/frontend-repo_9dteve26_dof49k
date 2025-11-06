import { useState } from 'react';
import { Send, Mic, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I am FinBot. Ask me about any stock, crypto, or macro trend.' }
  ]);
  const [input, setInput] = useState('What\'s happening with TSLA today?');

  const onSend = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: 'user', content: input }]);
    setInput('');
  };

  return (
    <section id="ai" className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 text-white/80">
          <Bot size={18} className="text-cyan-300"/>
          <span className="text-sm">FinBot • AI Market Analyst</span>
          <span className="ml-auto flex items-center gap-2 text-xs text-white/50"><Sparkles size={14}/> Live data connected</span>
        </div>
        <div className="h-64 overflow-y-auto p-4 space-y-3 text-white/90">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`${m.role === 'user' ? 'bg-white/10 ml-auto' : 'bg-cyan-500/10 border border-cyan-400/20'} max-w-[75%] rounded-xl px-3 py-2` }>
                <p className="text-sm leading-relaxed">{m.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2 p-4 border-t border-white/10">
          <button className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white" aria-label="Voice input"><Mic size={18}/></button>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask FinBot anything…" className="flex-1 rounded-md bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/40"/>
          <button onClick={onSend} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black font-medium"><Send size={16}/> Send</button>
        </div>
      </div>
    </section>
  );
}
