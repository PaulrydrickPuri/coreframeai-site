'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FooterCarousel from '@shared/components/molecules/FooterCarousel';

const FAQ = () => {
  return (

    <section 
      id="faq"
      className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#121726] to-[#0c101a] text-[#e2e8f0] px-6 relative"
    >
      {/* Floating Elements - Visual Enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#00e1ff]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#7928ca]/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto pt-32 pb-24">
        <motion.div 
          className="flex flex-col items-center text-center space-y-6 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#00e1ff] to-[#7928ca] pb-2">
              FAQ — CoreframeAI™
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-[#a0aec0] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Build Agents That Think in Loops
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-16 space-y-10 text-[#e2e8f0] text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">Who created CoreframeAI?</h2>
            <p className="mt-4">
              CoreframeAI™ was created by <strong className="text-white">Chevngko</strong>, a systems architect and agent builder. He designed CoreframeAI to help humans build intelligent systems that reason iteratively — not just react. Follow his journey on <a href="https://x.com/chevngko" target="_blank" rel="noopener noreferrer" className="text-[#00e1ff] hover:text-white transition-colors">@chevngko</a>.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">What is CoreframeAI?</h2>
            <p className="mt-4">
              CoreframeAI™ is a cognition-first AI platform that builds modular agents using a unique iterative framework called the <strong className="text-white">MENTAL Loop</strong>. Unlike traditional monolithic AI, CoreframeAI prioritizes agent-based development with human collaboration — but never in the way.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">What is the MENTAL Loop?</h2>
            <p className="mt-4">
              The <strong className="text-white">MENTAL Loop</strong> is CoreframeAI&apos;s cognitive framework for building agents that think iteratively. It stands for:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li><strong className="text-white">M</strong>ap — Create a mental model of the problem space</li>
              <li><strong className="text-white">E</strong>ncode — Transform information into structured representations</li>
              <li><strong className="text-white">N</strong>avigate — Explore possible solution paths</li>
              <li><strong className="text-white">T</strong>est — Validate hypotheses against constraints</li>
              <li><strong className="text-white">A</strong>mplify — Enhance successful approaches</li>
              <li><strong className="text-white">L</strong>earn — Update the cognitive model based on outcomes</li>
            </ul>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">When will CoreframeAI launch?</h2>
            <p className="mt-4">
              CoreframeAI™ is scheduled for Phase 1 launch in Q2 2025. Early access will be available to select partners and researchers. Join our waitlist to be notified when access becomes available.
            </p>
            <div className="mt-6">
              <Link href="/#workflow">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 text-sm font-semibold rounded-full bg-[#00e1ff] text-[#121726] transition-all duration-300 shadow-lg shadow-[#00e1ff]/20"
                >
                  Join Waitlist
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="p-6 rounded-xl bg-[#1a2035]/50 backdrop-blur-sm border border-[#00e1ff]/10 hover:border-[#00e1ff]/30 transition-all duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#00e1ff] font-mono">How is CoreframeAI different?</h2>
            <p className="mt-4">
              Unlike traditional AI platforms that focus on single-pass inference, CoreframeAI is built around iterative cognition. Our agents don&apos;t just predict — they reason, reflect, and refine their understanding through multiple cognitive loops. This enables more robust problem-solving and genuine reasoning capabilities.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 text-base font-semibold rounded-full border border-[#00e1ff] text-[#00e1ff] hover:bg-[#00e1ff]/10 transition-all duration-300"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer Carousel */}
      <div className="w-full absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0c101a] to-transparent pt-8">
        <FooterCarousel />
      </div>
    </section>
  );
};

export default FAQ;
