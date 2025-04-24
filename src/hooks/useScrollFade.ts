'use client';
import { useState, useEffect } from 'react';

interface ScrollFadeOptions {
  startFadePercent?: number;
  endFadePercent?: number;
  fadeOutDirection?: 'up' | 'down';
}

export function useScrollFade(
  elementId: string, 
  options: ScrollFadeOptions = {}
) {
  const [opacity, setOpacity] = useState(1);
  
  const {
    startFadePercent = 70, // Start fading when element is 70% through viewport
    endFadePercent = 100,  // Complete fade by 100%
    fadeOutDirection = 'up'
  } = options;
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport
      let scrollPercent;
      if (fadeOutDirection === 'up') {
        // For elements fading as they scroll up and out of view
        scrollPercent = ((windowHeight - rect.top) / (rect.height + windowHeight)) * 100;
      } else {
        // For elements fading as they scroll down into view
        scrollPercent = ((rect.bottom) / (rect.height + windowHeight)) * 100;
      }
      
      // Calculate opacity based on scroll position
      if (scrollPercent < startFadePercent) {
        setOpacity(1); // Fully visible
      } else if (scrollPercent > endFadePercent) {
        setOpacity(0); // Fully transparent
      } else {
        // Fade gradually
        const fadeRange = endFadePercent - startFadePercent;
        const fadeProgress = (scrollPercent - startFadePercent) / fadeRange;
        setOpacity(1 - fadeProgress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementId, startFadePercent, endFadePercent, fadeOutDirection]);
  
  return opacity;
}
