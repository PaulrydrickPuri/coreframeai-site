'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Hero component with SSR disabled
const Hero = dynamic(() => import("@shared/components/organisms/Hero"), { ssr: false });

export default function ClientHero() {
  return <Hero />;
}
