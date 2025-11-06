import { Rocket, LineChart, Brain, Globe, Settings } from "lucide-react";
import TickerStrip from './TickerStrip';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400 animate-pulse" />
            <div>
              <div className="flex items-baseline gap-2">
                <h1 className="text-white font-semibold tracking-tight">FINVERSE</h1>
                <span className="text-xs text-white/60">AstraTrade</span>
              </div>
              <p className="text-[10px] text-white/50 uppercase tracking-widest">AI Financial Intelligence</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-white/80">
            <a href="#dashboard" className="hover:text-white transition-colors flex items-center gap-2"><LineChart size={18}/> Dashboard</a>
            <a href="#globe" className="hover:text-white transition-colors flex items-center gap-2"><Globe size={18}/> Markets</a>
            <a href="#ai" className="hover:text-white transition-colors flex items-center gap-2"><Brain size={18}/> FinBot</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm transition-colors">
              <Rocket size={16}/> Launch
            </button>
            <button className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors" aria-label="Settings">
              <Settings size={18}/>
            </button>
          </div>
        </div>
      </div>
      <TickerStrip />
    </header>
  );
}
