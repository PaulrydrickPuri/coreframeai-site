'use client';

import Hero from '@/pages/Hero';
import AgentIntro from '@/pages/AgentIntro';

export default function Home() {
  // no data fetching here since your agents are hardcoded inside AgentIntro

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black text-white">
      <Hero />
      <AgentIntro />
       {/* This already passes agents as a constant array */}
    </main>
  );
}
