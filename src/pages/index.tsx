import Hero from '@/os/mentalOS/components/Hero';
import AgentIntro from '@/components/agents/AgentIntro';
import FooterCarousel from '@/os/mentalOS/components/ui/FooterCarousel';

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black text-white">
      <Hero />
      <AgentIntro />
      
    </main>
  );
}
