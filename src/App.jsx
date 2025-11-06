import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Widgets from './components/Widgets';
import FinBot from './components/FinBot';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar />

      <main>
        <Hero />
        <Widgets />
        <FinBot />
      </main>

      <footer className="mt-16 py-10 text-center text-white/50">
        <p>FINVERSE • Built for the next generation of AI-driven markets</p>
      </footer>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),transparent_40%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.15),transparent_40%)]" />
    </div>
  );
}

export default App;
