import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full" aria-label="Cinematic hero">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-cyan-300 text-xs uppercase tracking-[0.3em] mb-3">
              Welcome to AstraTrade
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-white drop-shadow-[0_4px_30px_rgba(0,255,255,0.35)]">
              Where AI Meets Financial Intelligence
            </h2>
            <p className="mt-4 text-white/80 max-w-xl">
              FINVERSE blends real-time market data, deep analytics, and an AI analyst that speaks, reasons, and guides your next move.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition">Enter Dashboard</button>
              <button className="px-5 py-3 rounded-md bg-cyan-500/90 hover:bg-cyan-400 text-black font-medium transition">Try FinBot</button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
    </section>
  );
}
