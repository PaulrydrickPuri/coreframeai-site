'use client';
import { useScrollFade } from '@hooks/useScrollFade';
import FooterCarousel from './FooterCarousel';

interface FadingFooterCarouselProps {
  id: string;
  fadeDirection?: 'up' | 'down';
  startFade?: number;
  endFade?: number;
}

export default function FadingFooterCarousel({
  id,
  fadeDirection = 'up',
  startFade = 70,
  endFade = 100
}: FadingFooterCarouselProps) {
  const opacity = useScrollFade(id, {
    startFadePercent: startFade,
    endFadePercent: endFade,
    fadeOutDirection: fadeDirection
  });
  
  return (
    <div 
      id={id}
      className="w-full absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0c101a] to-transparent pt-8 transition-opacity duration-300"
      style={{ opacity }}
    >
      <FooterCarousel />
    </div>
  );
}
