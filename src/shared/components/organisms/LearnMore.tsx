'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FadingFooterCarousel from '@shared/components/molecules/FadingFooterCarousel';

export default function LearnMore() {
  return (
    <section
      id="learn-more"
      className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#121726] to-[#0c101a] text-[#e2e8f0] px-6 relative"
    >
      {/* Floating Elements - Visual Enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#00e1ff]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#7928ca]/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto pt-32 pb-24">
        <motion.div 
          className="flex flex-col items-center text-center space-y-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#00e1ff] to-[#7928ca] pb-2">
              Learn CoreframeAI™
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-[#a0aec0] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Think in Loops, Not Lists
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-16 space-y-10 text-[#e2e8f0] text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">Our Mindset</h2>
            <p className="mt-4">
              CoreframeAI isn&apos;t just a tech stack. It&apos;s a cognitive architecture. Instead of building AI as linear tools, we scaffold loops — systems that reflect how we learn, reason, and evolve.
            </p>
            <div className="mt-6 p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5">
              <p className="text-[#e2e8f0]">
                ✦ Agents reason using the <strong className="text-white">MENTAL Loop</strong>: Map → Encode → Navigate → Test → Amplify → Learn<br />
                ✦ Our north star isn&apos;t just low loss — it&apos;s <strong className="text-white">reasoning clarity</strong> and <strong className="text-white">cognition delta</strong><br />
                ✦ We build systems that grow in understanding over time — not just accuracy
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">The Cognitive Stack</h2>
            <p className="mt-4">
              Every module in CoreframeAI plays a role in a living cognition loop — from prompt generation to dataset mutation to trace evaluation.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5 hover:border-[#00e1ff]/20 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white">🧪 PromptCFAI</h3>
                <p className="mt-2 text-[#a0aec0]">Turns raw documents into structured training prompts with reasoning tags and CoT logic.</p>
              </div>
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5 hover:border-[#00e1ff]/20 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white">🧠 CognitionCFAI</h3>
                <p className="mt-2 text-[#a0aec0]">Fine-tunes models using Chain-of-Thought data and reasoning-first loss targets.</p>
              </div>
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5 hover:border-[#00e1ff]/20 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white">🔍 TraceCFAI</h3>
                <p className="mt-2 text-[#a0aec0]">Evaluates whether reasoning is improving, plateauing, or degrading. Built on `bge-m3` deltas.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">Try the Loop</h2>
            <p className="mt-4">
              Interact with the loop. Upload a prompt. Watch the system think.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/#workflow">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 text-sm font-semibold rounded-full bg-[#00e1ff] text-[#121726] transition-all duration-300 shadow-lg shadow-[#00e1ff]/20"
                >
                  Try Prompt ↳ CoT ↳ Verdict
                </motion.button>
              </Link>
              <Link href="/#workflow">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 text-sm font-semibold rounded-full border border-[#00e1ff] text-[#00e1ff] hover:bg-[#00e1ff]/10 transition-all duration-300"
                >
                  Explore Visual Trainer
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">Cognitive Insights</h2>
            <p className="mt-4">
              See how our agents think, learn, and evolve through multiple cognitive loops.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5">
                <h3 className="text-lg font-semibold text-white">🧠 Trace Log Sample</h3>
                <pre className="mt-2 text-[#a0aec0] whitespace-pre-wrap text-sm">
{`Step 72 → CoT mutation increased symbolic coverage by 11%
Step 73 → TraceCFAI signal: plateau nearing (∆ < 0.02)`}
                </pre>
              </div>
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5">
                <h3 className="text-lg font-semibold text-white">🧬 CoT Comparison</h3>
                <p className="mt-2 text-[#a0aec0] text-sm">
                  <strong>Task:</strong> A buys 12 apples at RM3 each. How much?<br />
                  M₄: &quot;12 × 3 = 36&quot; → RM36<br />
                  M₅: &quot;A buys 12 apples, each costs RM3. 12×3 = 36&quot; → RM36<br />
                  <em className="text-[#00e1ff]">🧠 Reasoning Depth: +21%</em>
                </p>
              </div>
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5">
                <h3 className="text-lg font-semibold text-white">🤖 Meet the Agents</h3>
                <ul className="mt-2 text-[#a0aec0] list-disc list-inside text-sm">
                  <li><strong>ShellCFAI</strong> — Commander (brain)</li>
                  <li><strong>RunCFAI</strong> — Executor (engine)</li>
                  <li><strong>TraceCFAI</strong> — Evaluator (critic)</li>
                </ul>
              </div>
              <div className="p-4 bg-[#121726]/50 rounded-lg border border-[#00e1ff]/5">
                <h3 className="text-lg font-semibold text-white">📊 Cognitive Metrics</h3>
                <p className="mt-2 text-[#a0aec0] text-sm">
                  ✓ Merged Models: 3<br />
                  ✓ Avg Reasoning Delta: +12.3%<br />
                  ✓ Loops Completed: 5<br />
                  ✓ Verdict Accuracy (TaxSnapAI): 92.1%
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <blockquote className="text-xl italic text-[#a0aec0] text-center py-4">
              &quot;Loss is not cognition. We don&apos;t just minimize — we mutate meaning.&quot;<br />
              <span className="text-sm block mt-2">— Chevngko, Architect of CoreframeAI</span>
            </blockquote>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link href="/#workflow">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 text-base font-semibold rounded-full bg-[#00e1ff] text-[#121726] transition-all duration-300 shadow-lg shadow-[#00e1ff]/20"
            >
              Join Waitlist
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 text-base font-semibold rounded-full border border-[#00e1ff] text-[#00e1ff] hover:bg-[#00e1ff]/10 transition-all duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer Carousel */}
      <div className="w-full absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0c101a] to-transparent pt-8">
        <FadingFooterCarousel 
          id="learn-more-footer" 
          fadeDirection="up" 
          startFade={50} 
          endFade={80} 
        />
      </div>
    </section>
  );
}
