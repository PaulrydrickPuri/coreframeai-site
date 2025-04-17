'use client';

import Hero from '@/os/mentalOS/components/Hero';
//import AgentIntro from '@/components/agents/AgentIntro';

export default function Home() {
  // no data fetching here since your agents are hardcoded inside AgentIntro

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black text-white">
      <Hero />
       {/* This already passes agents as a constant array */}
    </main>
  );
}
