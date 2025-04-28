/**
 * DoomClock component
 * Visual countdown showing days until cash-breakeven failure
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DoomClockProps {
  daysRemaining: number;
  confidenceScore: number;
  optimisticDays?: number;
  pessimisticDays?: number;
}

export default function DoomClock({
  daysRemaining,
  confidenceScore,
  optimisticDays,
  pessimisticDays
}: DoomClockProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animation trigger
  useEffect(() => {
    setIsAnimating(true);
    // Reset animation state after animation completes
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [daysRemaining]);

  // Calculate the percentage of danger - used for gradient
  const dangerPercentage = Math.max(0, Math.min(100, 100 - ((daysRemaining / 180) * 100)));
  
  // Calculate gradient colors based on days remaining
  const getGradientColors = () => {
    if (daysRemaining <= 30) {
      return 'from-red-900 via-red-700 to-red-600'; // Critical
    } else if (daysRemaining <= 60) {
      return 'from-red-800 via-orange-700 to-orange-600'; // Danger
    } else if (daysRemaining <= 90) {
      return 'from-orange-800 via-yellow-700 to-yellow-600'; // Warning
    } else if (daysRemaining <= 120) {
      return 'from-yellow-800 via-emerald-700 to-emerald-600'; // Caution
    } else {
      return 'from-emerald-800 via-blue-700 to-blue-600'; // Safe
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-2">Doom Clock</h2>
      
      <div className={`
        relative w-60 h-60 rounded-full 
        bg-gradient-to-br ${getGradientColors()}
        flex items-center justify-center
        border-4 border-gray-800
        shadow-lg shadow-black/50
      `}>
        <div className="absolute inset-0 rounded-full shadow-inner"></div>
        
        {/* Clock face */}
        <div className="bg-gray-900 w-48 h-48 rounded-full flex flex-col items-center justify-center p-4">
          {/* Days counter */}
          <motion.div
            key={daysRemaining}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isAnimating ? [0.8, 1.1, 1] : 1, 
              opacity: isAnimating ? [0, 1, 1] : 1 
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl font-bold text-white"
          >
            {daysRemaining}
          </motion.div>
          
          <div className="text-gray-400 text-sm">days remaining</div>
          
          {/* Confidence score */}
          <div className="mt-2 text-xs text-gray-500">
            Confidence: {Math.round(confidenceScore * 100)}%
          </div>
          
          {/* Scenarios */}
          {(optimisticDays || pessimisticDays) && (
            <div className="mt-2 flex justify-between w-full text-xs">
              <span className="text-blue-400">
                Best: {optimisticDays}
              </span>
              <span className="text-red-400">
                Worst: {pessimisticDays}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional context labels */}
      <div className="mt-4 text-center">
        <div className={`
          text-sm font-medium py-1 px-3 rounded-full
          ${daysRemaining <= 30 ? 'bg-red-900/40 text-red-300' :
            daysRemaining <= 60 ? 'bg-orange-900/40 text-orange-300' :
            daysRemaining <= 90 ? 'bg-yellow-900/40 text-yellow-300' :
            daysRemaining <= 120 ? 'bg-emerald-900/40 text-emerald-300' :
            'bg-blue-900/40 text-blue-300'}
        `}>
          {daysRemaining <= 30 ? 'Critical' :
            daysRemaining <= 60 ? 'Danger' :
            daysRemaining <= 90 ? 'Warning' :
            daysRemaining <= 120 ? 'Caution' : 
            'Sustainable'}
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          Complete headline actions to extend your runway
        </div>
      </div>
    </div>
  );
}
