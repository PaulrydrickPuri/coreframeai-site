'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative z-10 text-center py-24 px-6 bg-black text-white overflow-hidden">
      {/* 🌌 Subtle cosmic glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse opacity-10 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-transparent h-full w-full blur-3xl" />
      </div>

      {/* 🧠 MentalOS Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-4xl md:text-6xl font-bold relative z-20 font-mono"
      >
        🧠 MentalOS
      </motion.h1>

      {/* 💡 Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-4 text-lg md:text-xl text-zinc-400 max-w-xl mx-auto relative z-20"
      >
        Your cognitive operating system for building, debugging, and deploying AI agents.
      </motion.p>

      {/* 🛰️ Context Phrase */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 text-sm text-zinc-500 relative z-20"
      >
        From research to reasoning — inside one cognitive stack.
      </motion.p>

      {/* ↓ Meet the Agents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-12"
      >
        <Link
          href="#agent-intro"
          className="inline-block text-sm text-blue-300 hover:text-blue-500 transition duration-300 ease-in-out"
        >
          ↓ Meet the Agents
        </Link>
      </motion.div>
    </section>
  );
}
