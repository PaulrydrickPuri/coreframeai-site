'use client';

import { motion } from 'framer-motion';



const AgentIntro = () => {
  return (
    <section
      id="agentlabeless"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center py-24 px-6 text-center bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white"
    >
      {/* Header with rocket icon */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 flex items-center justify-center">
          <span className="inline-block mr-3">🛰️</span> Introducing Our Agents
        </h2>
      </motion.div>

      {/* Description text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-8 max-w-2xl"
      >
        <p className="text-lg md:text-xl text-gray-300">
          <span className="font-bold text-white">Agents</span> are task-specific AI agent designed to align with 
          <span className="font-bold text-white"> CoreframeAI&apos;s cognition-first architecture</span>.
        </p>
      </motion.div>   
    </section>
  );
};

export default AgentIntro;