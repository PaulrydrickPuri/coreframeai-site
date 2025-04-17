'use client';

import { motion } from 'framer-motion';

import EnhancedOrbitalCarousel from '@/components/agents/EnhancedOrbitalCarousel';

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

      {/* Red box area for carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="w-full max-w-4xl relative"
      >
        <div className="w-full aspect-[2/1] relative">
          {/* Carousel container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <EnhancedOrbitalCarousel
              
              agents={[
                {
                  id: 'agent1',
                  name: 'MentalOS',
                  description: 'Labels like you do — with context, not coordinates.',
                  color: 'bg-pink-600',
                  cta: {
                    label: 'Explore MentalOS',
                    href: '/terminal'
                  }
                },
                {
                  id: 'agent2',
                  name: 'AgentSimulate',
                  description: 'Reasoning simulator agent for behavior testing.',
                  color: 'bg-purple-600',
                  cta: {
                    label: 'Try Simulator',
                    href: '/simulator'
                  }
                },
                {
                  id: 'agent3',
                  name: 'AgentScout',
                  description: 'Scours docs and APIs for live RAG querying.',
                  color: 'bg-indigo-600',
                  cta: {
                    label: 'View Scout',
                    href: '/scout'
                  }
                },
                {
                  id: 'agent4',
                  name: 'AgentPromptOS',
                  description: 'Encodes prompt logic with modular chain ops.',
                  color: 'bg-blue-600',
                  cta: {
                    label: 'Use PromptOS',
                    href: '/promptos'
                  }
                },
              ]}
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 flex flex-col items-center"
      >
        <p className="text-sm mb-2">↓ scroll to meet the agent ↓</p>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-white/70 rounded-full mt-1"
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AgentIntro;