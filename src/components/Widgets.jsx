import { TrendingUp, TrendingDown, Activity, Gauge } from "lucide-react";
import { useEffect, useState } from 'react';

const provider = 'finnhub';

const Stat = ({ label, value, trend = "up" }) => {
  const Up = trend === "up";
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white/90">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-white/60">{label}</p>
        {Up ? <TrendingUp size={18} className="text-emerald-400"/> : <TrendingDown size={18} className="text-rose-400"/>}
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${Up ? 'bg-emerald-400' : 'bg-rose-400'}`} style={{ width: Up ? '68%' : '42%' }} />
      </div>
    </div>
  );
};

export default function Widgets() {
  const [pnl, setPnl] = useState(0);
  const [sentiment, setSentiment] = useState({ label: 'Neutral', confidence: 50 });

  useEffect(() => {
    let timer;
    const pull = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${base}/api/tickers?symbols=AAPL,TSLA,NVDA&provider=${provider}`);
        const json = await res.json();
        const data = json.data || [];
        const change = data.reduce((acc, q) => acc + (q.changePercent || 0), 0) / (data.length || 1);
        setPnl(change);
        setSentiment({ label: change >= 0 ? 'Bullish' : 'Bearish', confidence: Math.min(95, Math.max(5, Math.abs(change) * 2)) });
      } catch (e) {
        // silent
      }
    };
    pull();
    timer = setInterval(pull, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="dashboard" className="relative z-10 -mt-12">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Portfolio Value" value="$128,450" trend={pnl >= 0 ? 'up' : 'down'} />
        <Stat label="P&L (24h)" value={`${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}%`} trend={pnl >= 0 ? 'up' : 'down'} />
        <Stat label="Volatility Pulse" value={Math.abs(pnl) > 1.2 ? 'High' : 'Moderate'} trend={Math.abs(pnl) > 1.2 ? 'down' : 'up'} />
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-white/90">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-widest text-white/60">Sentiment</p>
            <Activity size={18} className="text-cyan-300"/>
          </div>
          <p className="mt-2 text-2xl font-semibold">{sentiment.label}</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
            <Gauge size={14}/> AI Confidence: {Math.round(sentiment.confidence)}%
          </div>
        </div>
      </div>
    </section>
  );
}
