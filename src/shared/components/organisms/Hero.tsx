'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FadingFooterCarousel from '@shared/components/molecules/FadingFooterCarousel';

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-24 min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#121726] to-[#0c101a] text-[#e2e8f0] px-6 relative"
    >
      {/* Centered Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <motion.div 
          className="flex flex-col items-center text-center space-y-6 z-20 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold font-mono bg-clip-text text-opacity-10 bg-gradient-to-r from-[#00e1ff] to-[#7928ca] pb-2 z-10">
              🧠 CoreframeAI™
            </h1>
            {/* Reflection */}
            <div className="absolute left-0 right-0 top-full flex flex-col items-center">
              <h1 className="text-6xl md:text-7xl font-bold font-mono transform scale-y-[-1] opacity-20 bg-clip-text text-white blur-[0.5px] pb-2">🧠 CoreframeAI™</h1>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="text-xl md:text-2xl text-[#a0aec0] font-light mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            From research → prototype → deployment — all under one cognitive stack.
          </motion.p>
          
          <motion.p 
            className="text-sm md:text-base text-[#718096] font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            🚀 Phase 1 Launch: Q2 2025
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="#workflow">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 text-base font-semibold rounded-full bg-[#00e1ff] text-[#121726] transition-all duration-300 shadow-lg shadow-[#00e1ff]/20"
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/learn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 text-base font-semibold rounded-full border border-[#00e1ff] text-[#00e1ff] hover:bg-[#00e1ff]/10 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8 text-sm font-mono"
          >
            <span className="text-[#00e1ff] bg-[#121726]/60 rounded-full px-4 py-1 backdrop-blur-sm animate-pulse">
              ↓ <span className="italic">Scroll to explore</span> ↓
            </span>
          </motion.div>
        </motion.div>

        {/* Floating Elements - Visual Enhancement */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00e1ff]/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#7928ca]/5 rounded-full filter blur-3xl"></div>
        </div>

      </div>
      
      {/* Footer Carousel - Fades out when scrolling */}
      <FadingFooterCarousel 
        id="hero-footer" 
        fadeDirection="up" 
        startFade={50} 
        endFade={80} 
      />
    </section>
  );
}
