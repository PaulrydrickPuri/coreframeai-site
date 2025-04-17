'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import FooterCarousel from '@/os/mentalOS/components/ui/FooterCarousel';
import { Italic } from 'lucide-react';

const Hero = () => {
  const [hovered, setHovered] = useState(false); // <- this line is crucial!
  return (
    <section
      id="hero"
      className="snap-start h-screen flex flex-col justify-between bg-black text-white px-6 relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center z-10">
        {/* Main Heading */}
        <div className="content-block">
          <h1 className="text-5xl md:text-6xl font-bold font-mono">🧠 CoreframeAI™</h1>
          <p className="mt-4 text-lg text-zinc-300">
            From research → prototype → deployment — all under one cognitive stack.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            🚀 Phase 1 Launch: Q2 2025
          </p>
        </div>

        {/* Reflection */}
        <div className="mt-6 transform scale-y-[-1] opacity-20 mask-fade">
          <h1 className="text-5xl md:text-6xl font-bold font-mono">🧠 CoreframeAI™</h1>
          <p className="mt-4 text-lg text-zinc-300">
            From research → prototype → deployment — all under one cognitive stack.
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            🚀 Phase 1 Launch: Q2 2025
          </p>
        </div>
      </div>

      {/* Bottom Fixed Section */}
      <div className="relative w-full flex flex-col justify-end">
        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-full flex justify-center text-xs md:text-sm font-mono mb-2 z-20"
        >
          <span className="text-cyan-400 bg-black/40 rounded-full px-4 py-1 backdrop-blur-sm animate-pulse">
          ↓ scroll to meet the agent -- <span className="italic">coming soon</span> 👀 ↓
          </span>
        </motion.div>

        {/* Gradient fade-out to blend to black */}
        <div className="absolute bottom-[42px] left-0 w-full h-16 bg-gradient-to-t from-black via-zinc-900/80 to-transparent pointer-events-none z-10" />

        {/* Footer Carousel */}
        <FooterCarousel />
      </div>
    </section>
  );
};

export default Hero;
