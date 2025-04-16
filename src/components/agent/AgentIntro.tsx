'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const AgentIntro = () => {
  return (
    <section
      id="agentlabeless"
      className="snap-start h-screen relative z-10 py-24 px-6 text-center bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-3xl md:text-4xl font-semibold mb-4"
      >
        🛰️ Introducing Our First Orbiting Agent
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8"
      >
        <span className="font-bold text-white">AgentLabeless</span> is the first task-specific AI agent designed to
        align with CoreframeAI’s cognition-first architecture.
        <br />
        It labels like you do — with <span className="font-semibold text-white">context</span>, not{' '}
        <span className="italic text-white">coordinates</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link
          href="/terminal"
          className="bg-pink-600 hover:bg-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-md transition"
        >
          Enter the MentalOS Terminal →
        </Link>
      </motion.div>
    </section>
  );
};

export default AgentIntro;
