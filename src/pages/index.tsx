import Hero from '@/os/mentalOS/components/Hero';
import AgentIntro from '@/components/agent/AgentIntro';
export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />

      {/* Add more sections here like: */}
      {<Hero />}
      {<AgentIntro />}
      {/* <Footer /> */}
    </main>
  );
}
