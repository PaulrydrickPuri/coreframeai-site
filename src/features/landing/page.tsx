'use client';

const StaticLanding = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-black text-white text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">🧠 CoreframeAI™</h1>
      <p className="text-lg md:text-xl">
        From <span className="text-pink-500">research</span> → <span className="text-orange-400">prototype</span> → <span className="text-yellow-400">deployment</span> — all under one cognitive stack.
      </p>
      <p className="mt-4 text-sm md:text-base text-white/60">🚀 Phase 1 Launch: Q2 2025</p>

      <div className="mt-12 text-xs text-white/40 animate-pulse">
        ↓ scroll to meet the agent — <span className="italic">coming soon</span> 👀 ↓
      </div>
    </main>
  );
};

export default StaticLanding;
