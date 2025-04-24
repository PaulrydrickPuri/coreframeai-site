'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Training() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#121726] to-[#0c101a] text-[#e2e8f0] px-6 py-24 relative">
      <motion.div 
        className="w-full max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#00e1ff] to-[#7928ca] pb-2">
          Training Module
        </h1>
        <p className="mt-6 text-xl text-[#a0aec0]">
          Coming soon...
        </p>
        <div className="mt-12">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 text-base font-semibold rounded-full bg-[#00e1ff] text-[#121726] transition-all duration-300 shadow-lg shadow-[#00e1ff]/20"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
