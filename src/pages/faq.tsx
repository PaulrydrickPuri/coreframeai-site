'use client';
import Link from 'next/link';
import Head from 'next/head';

const FAQ = () => {
  return (
    <>
      <Head>
        <title>FAQ — CoreframeAI™ · Build Agents That Think in Loops</title>
        <meta name="description" content="CoreframeAI™ helps you build modular agents using the MENTAL Loop. Explore prompt-based labeling, agent orbit UI, and cognition-first AI tools." />
        <meta property="og:title" content="FAQ — CoreframeAI™" />
        <meta property="og:description" content="Explore how CoreframeAI™ builds agents that think in loops. Learn about the MENTAL Loop, AgentLabeless, and cognitive agent architecture." />
        <meta property="og:url" content="https://coreframeai.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CoreframeAI" />
        <meta property="og:image" content="https://coreframeai.com/og/coreframe-faq-preview.png" />
      </Head>

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

          <div className="space-y-12 text-zinc-200 text-base md:text-lg leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-cyan-300">Who created CoreframeAI?</h2>
              <p className="mt-2">
                CoreframeAI™ was created by <strong>Chevngko</strong>, a systems architect and agent builder. He designed CoreframeAI to help humans build intelligent systems that reason iteratively — not just react. Follow his journey on <a href="https://x.com/chevngko_dev" className="text-cyan-400 underline">@chevngko_dev</a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is CoreframeAI?</h2>
              <p className="mt-2">
                CoreframeAI™ is a cognition-first AI platform that builds modular agents using a unique iterative framework called the <strong>MENTAL Loop</strong>. Unlike traditional monolithic AI, CoreframeAI prioritizes agent-based development with human collaboration — but never in the way.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is the MENTAL Loop?</h2>
              <ul className="mt-4 space-y-1 list-disc list-inside text-zinc-300">
                <li><strong>Map</strong> – Define the problem</li>
                <li><strong>Encode</strong> – Structure the goal into prompts</li>
                <li><strong>Navigate</strong> – Choose tools or paths</li>
                <li><strong>Test</strong> – Execute and evaluate</li>
                <li><strong>Amplify</strong> – Enhance or escalate outputs</li>
                <li><strong>Learn</strong> – Store feedback + trace insights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is AgentLabeless?</h2>
              <p className="mt-2">
                AgentLabeless is a visual agent that replaces click-based image labeling with prompt-based annotation. It uses technologies like CLIP and ConceptAttention to understand concepts contextually — allowing teams to label like humans think, not like machines click.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is the CFAI Stack?</h2>
              <ul className="mt-4 space-y-1 text-zinc-300">
                <li><strong>FocusCFAI</strong> – Motivation & cognitive regulation</li>
                <li><strong>PromptCFAI</strong> – Prompt translation layer</li>
                <li><strong>ScoutCFAI</strong> – Retrieval & source validation</li>
                <li><strong>CognitionCFAI</strong> – Logical generator</li>
                <li><strong>TraceCFAI</strong> – Feedback evaluator</li>
                <li><strong>MemoryCFAI</strong> – Context summarizer</li>
                <li><strong>ShellCFAI</strong> – Command interface</li>
                <li><strong>RunCFAI</strong> – API/code executor</li>
                <li><strong>GateCFAI</strong> – Auth & control manager</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is Agent Orbit UI?</h2>
              <p className="mt-2">
                A scroll-reactive interface to visualize how agents orbit the mental nucleus (FocusCFAI). Each agent appears as a module in motion, letting users see how cognition flows across prompts, reasoning, and memory.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is Loop Simulator?</h2>
              <p className="mt-2">
                A tool to trace agent thoughts in real time — each step of the MENTAL Loop is visualized, allowing developers to debug, test, and observe agent cognition as it unfolds.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is PostPulse?</h2>
              <p className="mt-2">
                PostPulse is an AI content planning agent. It generates daily content ideas across platforms like X, Instagram, and LinkedIn — and syncs them into a calendar-based action plan with GPT support.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">What is FocusTuner?</h2>
              <p className="mt-2">
                FocusTuner is a cognitive compass — an agent designed to motivate when you're burned out, and regulate when you're pushing too hard. It balances energy with intention.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">Who is CoreframeAI for?</h2>
              <ul className="mt-2 list-disc list-inside text-zinc-300">
                <li>AI Engineers building reasoning-first agents</li>
                <li>Founders prototyping intelligent tools</li>
                <li>Researchers studying modular cognition</li>
                <li>Labelers tired of bounding boxes</li>
                <li>Creators who want to scale meaning, not chaos</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-cyan-300">How can I try it?</h2>
              <p className="mt-2">
                We’re onboarding early collaborators. Email us at <a href="mailto:chevngko@coreframeai.com" className="text-cyan-400 underline">chevngko@coreframeai.com</a> or visit <Link href="/">coreframeai.com</Link> to learn more.
              </p>
            </div>
          </div>

          <footer className="pt-12 border-t border-zinc-800 text-sm text-zinc-500 text-center">
            🧠 CoreframeAI™ · Build Agents That Think in Loops
          </footer>
        </div>
      </section>
    </>
  );
};

export default FAQ;
