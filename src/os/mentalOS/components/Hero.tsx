'use client';
import { motion } from 'framer-motion';
import FooterCarousel from '@/os/mentalOS/components/ui/FooterCarousel';

const Hero = () => {
  return (
    <section
      id="hero"
      className="snap-start h-screen flex flex-col bg-black text-white px-6 relative overflow-hidden"
    >
      {/* Top content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl md:text-6xl font-bold font-mono">🧠 CoreframeAI</h1>
        <p className="mt-4 text-lg text-zinc-300">
          From research → prototype → deployment — all under one cognitive stack.
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          🚀 Phase 1 Launch: Q2 2025
        </p>
      </div>
      
      {/* Fixed bottom section - contains both scroll hint and footer */}
      <div className="relative w-full">
        {/* Scroll hint - positioned as regular element above footer */}
        <motion.div
          initial={{ opacity: 0, y:5 }}
          animate={{ opacity: 1, y:0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-full flex justify-center mb-6 text-xs md:text-sm tracking-wide text-center font-mono"
        >
          <span className="text-cyan-400 text-xs md:text-sm font-mono px-4 py-1 bg-black/40 rounded-full backdrop-blur-sm animate-pulse">
            ↓ scroll to meet the agent ↓
          </span>
        </motion.div>
        
        {/* Gradient fade-out effect */}
        <div className="absolute bottom-[42px] left-0 w-full h-16 bg-gradient-to-t from-black via-zinc-900/80 to-transparent pointer-events-none z-10" />
        
        {/* Footer carousel */}
        <FooterCarousel />
      </div>
    </section>
  );
};

export default Hero;