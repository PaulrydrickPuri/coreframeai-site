'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative z-10 text-center py-24 px-6 bg-black text-white overflow-hidden"
    >
      {/* ✨ Comet-like glow trail background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse opacity-10 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-transparent h-full w-full blur-3xl" />
      </div>

      {/* 🧠 Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-4xl md:text-6xl font-bold relative z-20"
      >
        🧠 CoreframeAI
      </motion.h1>

      {/* 🔍 Subheadline */}
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

      {/* 🚀 Phase description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 text-sm text-gray-400 relative z-20"
      >
        🚀 Phase 1 Launch: Q2 2025 <br />
        🧠 CoreframeAI is rolling out cognition-first agents, one prototype at a time.
      </motion.p>

      {/* 🔗 CTA 1 — Scroll to Agent */}
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

      {/* 🔗 CTA 2 — Try AgentLabeless in mentalOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-6"
      >
        <Link
          href="/mentalOS"
          className="inline-block mt-4 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          🧠 Try AgentLabeless
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
