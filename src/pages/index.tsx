import Hero from '@/os/mentalOS/components/Hero';
import AgentIntro from '@/components/agent/AgentIntro';

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black text-white">
      <Hero />
      <AgentIntro />
    </main>
  );
}
