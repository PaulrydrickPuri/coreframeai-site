'use client';

import { useState, useEffect, useRef } from 'react';
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

export interface Props {
  agents: Agent[];
  containerClassName?: string;
}

const EnhancedOrbitalCarousel: React.FC<Props> = ({ agents, containerClassName = '' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const radius = 280;
  const autoRotateDirection = -1;

  // ✅ Prevent crash if agents not provided
  if (!agents || agents.length === 0) {
    return <div className="text-center text-white text-sm">No agents available</div>;
  }

  // Auto-rotate logic
  useEffect(() => {
    if (!isRotating || isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev + autoRotateDirection * 0.5);
    }, 16);
    return () => clearInterval(interval);
  }, [isRotating, isDragging]);

  // Calculate position per agent
  const getCardStyle = (index: number) => {
    const angle = ((2 * Math.PI) / agents.length) * index + (rotation * Math.PI) / 180;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = 0.8 + Math.cos(angle) * 0.2;
    const opacity = 0.6 + Math.cos(angle) * 0.4;
    const zIndex = z < 0 ? 2 : 0;

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle * (180 / Math.PI) + 180}deg)`,
      zIndex,
      opacity,
      scale,
    };
  };

  // Drag interaction
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

  // Determine currently focused agent
  useEffect(() => {
    const anglePer = 360 / agents.length;
    const norm = ((rotation % 360) + 360) % 360;
    let index = Math.round(norm / anglePer) % agents.length;
    index = (agents.length - index) % agents.length;
    if (index !== selectedIndex) setSelectedIndex(index);
  }, [rotation, agents.length, selectedIndex]);

  return (
    <div className={`relative w-full h-[500px] mb-20 ${containerClassName}`}>
      <div
        className="relative w-full h-full"
        style={{ perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <div
          className="absolute top-1/2 left-1/2 w-0 h-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {agents.map((agent, index) => {
            const styles = getCardStyle(index);
            return (
              <div
                key={agent.id}
                className="absolute top-0 left-0 w-64 h-48 -ml-32 -mt-24 p-4 rounded-xl flex flex-col justify-center items-center text-white transition-all duration-300 ease-out"
                style={{
                  transform: `${styles.transform} scale(${styles.scale})`,
                  zIndex: styles.zIndex,
                  opacity: styles.opacity,
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

      {/* Rotation control */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-8 flex space-x-4">
        <button
          className="text-white bg-black/30 border border-white/20 px-4 py-1 rounded-full text-xs hover:bg-white hover:text-black transition"
          onClick={() => setIsRotating(!isRotating)}
        >
          {isRotating ? 'Pause Rotation' : 'Auto Rotate'}
        </button>
      </div>
    </div>
  );
};

export default EnhancedOrbitalCarousel;
