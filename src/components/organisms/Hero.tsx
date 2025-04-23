'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FooterCarousel from '@/components/molecules/FooterCarousel';

export default function Hero() {
  return (
    <section
      id="hero"
      className="snap-start flex h-screen flex-col items-center bg-texture bg-[#121726] text-[#e2e8f0] px-6 relative"
    >
      {/* Centered Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-4 z-20">
          <h1 className="text-5xl md:text-6xl font-bold font-mono">🧠 CoreframeAI™</h1>
          <p className="text-lg text-[#a0aec0]">
            From research → prototype → deployment — all under one cognitive stack.
          </p>
          <p className="text-sm text-[#718096]">🚀 Phase 1 Launch: Q2 2025</p>
          <Link href="/faq">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 text-sm md:text-base font-semibold rounded-full border border-[#00e1ff] text-[#00e1ff] hover:bg-[#00e1ff] hover:text-[#121726] transition-all duration-300"
            >
              Learn More
            </motion.button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-4 text-xs font-mono"
          >
            <span className="text-[#00e1ff] bg-[#121726]/60 rounded-full px-4 py-1 backdrop-blur-sm animate-pulse">
              ↓ <span className="italic">coming soon</span> 👀 ↓
            </span>
          </motion.div>
        </div>

        {/* Reflection */}
        <div className="absolute inset-x-0 bottom-48 flex flex-col items-center space-y-4 transform scale-y-[-1] opacity-10 mask-fade pointer-events-none z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-mono">🧠 CoreframeAI™</h1>
          <p className="text-lg text-[#a0aec0]">
            From research → prototype → deployment — all under one cognitive stack.
          </p>
          <p className="text-sm text-[#718096]">🚀 Phase 1 Launch: Q2 2025</p>
        </div>
      </div>

      

      {/* Carousel */}
      <div className="w-full pb-8 z-20">
        <FooterCarousel />
      </div>
    </section>
  );
}
