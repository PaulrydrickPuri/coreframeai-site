'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div 
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 h-32 w-1 bg-gray-700 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 5 ? 0.7 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-full bg-[#00e1ff] rounded-full"
        style={{ height: `${scrollProgress}%`, bottom: 0, position: 'absolute' }}
      />
    </motion.div>
  );
}
