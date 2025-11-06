import { useEffect, useState } from 'react';

const PROVIDER = 'finnhub';

export default function TickerStrip() {
  const [tickers, setTickers] = useState([
    { symbol: 'AAPL' },
    { symbol: 'TSLA' },
    { symbol: 'NVDA' },
    { symbol: 'BTC-USD' },
    { symbol: 'NSE:TCS' },
  ]);

  useEffect(() => {
    let timer;
    const fetchAll = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const symbols = tickers.map(t => t.symbol).join(',');
        const res = await fetch(`${base}/api/tickers?symbols=${encodeURIComponent(symbols)}&provider=${PROVIDER}`);
        const json = await res.json();
        if (json?.data) {
          setTickers(json.data);
        }
      } catch (e) {
        // silent
      }
    };
    fetchAll();
    timer = setInterval(fetchAll, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-white/5">
      <div className="animate-[marquee_22s_linear_infinite] flex gap-8 py-2 text-sm text-white/80 whitespace-nowrap">
        {tickers.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="font-mono text-white">{t.symbol}</span>
            {typeof t.price !== 'undefined' ? (
              <>
                <span className="font-semibold">{Number(t.price).toFixed(2)}</span>
                <span className={`${(t.changePercent||0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{Number(t.changePercent||0).toFixed(2)}%</span>
              </>
            ) : (
              <span className="text-white/50">loading…</span>
            )}
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
