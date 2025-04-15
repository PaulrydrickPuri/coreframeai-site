// /app/page.tsx
export default function Home() {
    return (
      <main className="min-h-screen bg-[#0e0e0e] text-white px-4 py-10 flex flex-col items-center justify-start gap-8 text-center font-sans">
        {/* 💡 Hero Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-neon">
          <span role="img" aria-label="brain">🧠</span> CoreframeAI
        </h1>
  
        {/* 🧠 Subheading */}
        <p className="text-gray-300 text-lg max-w-xl">
          A modular system for building task-specific AI agents.
        </p>
        <p className="text-sm text-gray-400">
          From research → to prototype → to deployment — all under one cognitive stack.
        </p>
  
        {/* 🚀 Launch Info */}
        <div className="text-sm text-gray-400">
          <p className="mb-1">🚀 Phase 1 Launch: Q2 2025</p>
          <p>🧠 CoreframeAI is rolling out cognition-first agents, one prototype at a time.</p>
        </div>
  
        {/* 🧪 AgentCard for AgentLabeless */}
        <div className="border border-[#222] bg-[#111] p-6 mt-6 rounded-xl max-w-xl w-full shadow-[0_0_30px_rgba(0,255,255,0.08)]">
          <h2 className="text-xl md:text-2xl font-bold mb-1">
            🎯 AgentLabeless
            <span className="ml-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">NEW</span>
          </h2>
          <p className="text-gray-300 mt-2">
            A prompt-powered vision agent that labels like you do — with <span className="font-semibold">context</span>, not <span className="font-semibold">coordinates</span>.
          </p>
  
          {/* CTA */}
          <a
            href="/agentlabeless"
            className="inline-block mt-4 px-4 py-2 bg-black border border-[#00ffee] text-[#00ffee] rounded hover:shadow-lg hover:scale-[1.03] transition-all"
          >
            📓 Read the MVP Story
          </a>
        </div>
      </main>
    );
  }
  