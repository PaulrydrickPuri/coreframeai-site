'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export interface Agent {
  id: string;
  name: string;
  description: string;
  color: string;
  cta?: {
    label: string;
    href: string;
  };
}

interface Props {
  agents?: Agent[]; // Optional for SSR fallback safety
}

const EnhancedOrbitalCarousel: React.FC<Props> = ({ agents = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const radius = 280;

  const safeAgents = Array.isArray(agents) ? agents : [];

  useEffect(() => {
    if (!isRotating || isDragging || safeAgents.length === 0) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev + -0.5);
    }, 16);
    return () => clearInterval(interval);
  }, [isRotating, isDragging, safeAgents.length]);

  const getCardStyle = (index: number) => {
    const angle = ((2 * Math.PI) / safeAgents.length) * index + (rotation * Math.PI) / 180;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = 0.8 + Math.cos(angle) * 0.2;
    const opacity = 0.6 + Math.cos(angle) * 0.4;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle * (180 / Math.PI) + 180}deg) scale(${scale})`,
      zIndex: Math.round(Math.cos(angle) * 100),
      opacity,
    };
  };

  useEffect(() => {
    if (safeAgents.length === 0) return;
    const anglePer = 360 / safeAgents.length;
    const norm = ((rotation % 360) + 360) % 360;
    let index = Math.round(norm / anglePer) % safeAgents.length;
    index = (safeAgents.length - index) % safeAgents.length;
    if (index !== selectedIndex) setSelectedIndex(index);
  }, [rotation, safeAgents.length, selectedIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsRotating(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation((prev) => prev + delta * 0.3);
    setStartX(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);
  const handlePointerLeave = () => setIsDragging(false);

  return (
    <div className="relative w-full h-[500px] mb-20">
      <div
        className="relative w-full h-full"
        style={{ perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <div className="absolute top-1/2 left-1/2 w-0 h-0" style={{ transformStyle: 'preserve-3d' }}>
          {safeAgents.map((agent, index) => {
            const styles = getCardStyle(index);
            return (
              <div
                key={agent.id}
                className="absolute top-0 left-0 w-64 h-48 -ml-32 -mt-24 p-4 rounded-xl flex flex-col justify-center items-center text-white transition-all duration-300 ease-out"
                style={{
                  ...styles,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.3)',
                }}
                onClick={() => setSelectedIndex(index)}
              >
                <h3 className="text-xl font-bold mb-2 text-center">{agent.name}</h3>
                <p className="text-sm text-center">{agent.description}</p>
                {agent.cta && (
                  <Link
                    href={agent.cta.href}
                    className="mt-4 text-xs px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition font-semibold"
                  >
                    {agent.cta.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnhancedOrbitalCarousel;
