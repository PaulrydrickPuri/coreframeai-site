'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-10 text-center py-24 px-6 bg-black text-white overflow-hidden"
    >
      {/* Optional Comet Trail or Glow Layer (placeholder for now) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse opacity-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent h-full w-full blur-3xl" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-4xl md:text-6xl font-bold relative z-20"
      >
        🧠 CoreframeAI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto relative z-20"
      >
        A modular system for building task-specific AI agents.
        <br />
        From research → to prototype → to deployment — all under one cognitive stack.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 text-sm text-gray-400 relative z-20"
      >
        🚀 Phase 1 Launch: Q2 2025 <br />
        🧠 CoreframeAI is rolling out cognition-first agents, one prototype at a time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-12"
      >
        <Link
          href="#agentlabeless"
          className="inline-block text-sm text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out"
        >
          ↓ Meet the Agent
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
