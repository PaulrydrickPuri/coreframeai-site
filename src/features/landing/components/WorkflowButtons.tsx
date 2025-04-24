'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FadingFooterCarousel from '@shared/components/molecules/FadingFooterCarousel';

const workflowSteps = [
  {
    id: 'research',
    title: 'Research',
    description: 'Explore AI concepts and gather insights',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-400',
    href: '/research'
  },
  {
    id: 'prototype',
    title: 'Prototype',
    description: 'Build and iterate on your AI solutions',
    icon: '⚙️',
    color: 'from-purple-500 to-pink-400',
    href: '/prototype'
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Scale and ship your AI to production',
    icon: '🚀',
    color: 'from-green-500 to-emerald-400',
    href: '/deploy'
  }
];

export default function WorkflowButtons() {
  return (
    <section id="workflow" className="min-h-screen flex flex-col justify-between py-24 bg-[#0c101a] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-mono">
          From Concept to Deployment
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((step) => (
            <Link href={step.href} key={step.id}>
              <motion.div
                id={step.id}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-xl p-8 h-full bg-gradient-to-br ${step.color} cursor-pointer`}
              >
                <div className="absolute top-0 right-0 p-4 text-4xl">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
                <div className="mt-6 flex items-center text-sm font-semibold">
                  <span>Learn more</span>
                  <svg 
                    className="ml-2 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Footer Carousel - Fades in when scrolling to this section */}
      <FadingFooterCarousel 
        id="workflow-footer" 
        fadeDirection="down" 
        startFade={20} 
        endFade={0} 
      />
    </section>
  );
}
