'use client';
import Link from 'next/link';

const FAQ = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-cyan-400">
            FAQ — CoreframeAI™
          </h1>
          <p className="mt-4 text-zinc-400">
            Build Agents That Think in Loops
          </p>
        </header>

        {/* Question Blocks */}
        <div className="space-y-12 text-zinc-200 text-base md:text-lg leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What is CoreframeAI?</h2>
            <p className="mt-2">
              CoreframeAI™ is a cognition-first AI platform that builds modular agents using a unique iterative framework called the <strong>MENTAL Loop</strong>.
              Unlike traditional monolithic AI, CoreframeAI prioritizes agent-based development with human collaboration — but never in the way.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What does “Agents That Think in Loops” mean?</h2>
            <p className="mt-2">
              It means agents don’t just complete tasks — they reason, reflect, and improve continuously.
              Every agent follows the <span className="text-cyan-400 font-mono">Map → Encode → Navigate → Test → Amplify → Learn</span> cycle.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What is the MENTAL Loop?</h2>
            <ul className="mt-4 space-y-1 list-disc list-inside text-zinc-300">
              <li><strong>Map</strong> – Define the goal or problem</li>
              <li><strong>Encode</strong> – Turn it into structured prompts or instructions</li>
              <li><strong>Navigate</strong> – Choose the right tools or routes</li>
              <li><strong>Test</strong> – Execute and evaluate</li>
              <li><strong>Amplify</strong> – Refine or route the outputs</li>
              <li><strong>Learn</strong> – Store feedback and trace the reasoning</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What makes CoreframeAI different?</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-zinc-300">
              <div>
                <h3 className="text-cyan-400 font-mono">Feature</h3>
                <ul className="mt-1 space-y-1">
                  <li>Agent-Based</li>
                  <li>Prompt Labeling</li>
                  <li>Loop Reasoning</li>
                  <li>Human-in-the-Loop</li>
                  <li>Modular Stack</li>
                </ul>
              </div>
              <div>
                <h3 className="text-cyan-400 font-mono">CoreframeAI</h3>
                <ul className="mt-1 space-y-1">
                  <li>✅ Native</li>
                  <li>✅ Built-in</li>
                  <li>✅ MENTAL Loop</li>
                  <li>✅ Collaborative</li>
                  <li>✅ CFAI Stack</li>
                </ul>
              </div>
              <div>
                <h3 className="text-cyan-400 font-mono">Other Platforms</h3>
                <ul className="mt-1 space-y-1">
                  <li>❌ Add-on</li>
                  <li>❌ Manual</li>
                  <li>❌ Linear</li>
                  <li>❌ Bottleneck</li>
                  <li>❌ Monolithic</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What is AgentLabeless?</h2>
            <p className="mt-2">
              AgentLabeless is a vision agent that replaces click-based image labeling with fast, prompt-based annotation.
              It understands context and intent — not just boxes. Powered by CLIP and ConceptAttention.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">When did CoreframeAI launch?</h2>
            <p className="mt-2">
              We launched Phase 1 in <strong>Q2 2025</strong>. AgentLabeless is live in MVP form. More agents are entering orbit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What is the CFAI Stack?</h2>
            <ul className="mt-4 space-y-1 text-zinc-300">
              <li><strong>FocusCFAI</strong> – Motivation & effort regulation</li>
              <li><strong>PromptCFAI</strong> – Human → Machine prompt synthesis</li>
              <li><strong>ScoutCFAI</strong> – Web retrieval & CoT validation</li>
              <li><strong>CognitionCFAI</strong> – Reasoning & idea generation</li>
              <li><strong>TraceCFAI</strong> – Feedback evaluation & memory trace</li>
              <li><strong>MemoryCFAI</strong> – Prior context recall</li>
              <li><strong>ShellCFAI</strong> – Interface & command routing</li>
              <li><strong>RunCFAI</strong> – Executes API/code/inference calls</li>
              <li><strong>GateCFAI</strong> – Auth & permission control</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">Who is it for?</h2>
            <ul className="mt-2 list-disc list-inside text-zinc-300">
              <li>AI Engineers who build cognition-first agents</li>
              <li>Founders seeking fast, flexible prototypes</li>
              <li>Researchers focused on explainable systems</li>
              <li>Labeling teams who want smarter tools</li>
              <li>Creators who think in loops, not lists</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">What’s next?</h2>
            <ul className="mt-2 list-disc list-inside text-zinc-300">
              <li>🧠 Agent Orbit UI — visual cognition map</li>
              <li>🔁 Loop Simulator — trace agent thoughts</li>
              <li>📅 PostPulse — AI content planning agent</li>
              <li>🌀 FocusTuner — burnout-aware agent compass</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-cyan-300">Can I try it?</h2>
            <p className="mt-2">
              Early access is available for testers and collaborators.
              Reach out at <a href="mailto:chevngko@coreframeai.com" className="text-cyan-400 underline">chevngko@coreframeai.com</a> or visit the <Link href="/" className="text-cyan-400 underline">homepage</Link>.
            </p>
          </div>
        </div>

        <footer className="pt-12 border-t border-zinc-800 text-sm text-zinc-500 text-center">
          🧠 CoreframeAI™ · Build Agents That Think in Loops
        </footer>
      </div>
    </section>
  );
};

export default FAQ;
