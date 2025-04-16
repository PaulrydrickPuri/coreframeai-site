'use client';

import Head from 'next/head';
import { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const togglePause = () => footer.classList.toggle('paused');

    footer.addEventListener('mouseenter', () => footer.classList.add('paused'));
    footer.addEventListener('mouseleave', () => footer.classList.remove('paused'));
    footer.addEventListener('touchstart', togglePause);

    return () => {
      footer.removeEventListener('mouseenter', () => footer.classList.add('paused'));
      footer.removeEventListener('mouseleave', () => footer.classList.remove('paused'));
      footer.removeEventListener('touchstart', togglePause);
    };
  }, []);

  return (
    <>
      <Head>
        <title>CoreframeAI – Prompt-Powered Agents for the Cognitive Era</title>
        <meta
          name="description"
          content="CoreframeAI is a platform for building cognition-first AI agents like AgentLabeless. From research to deployment – faster than ever."
        />
        <meta
          name="keywords"
          content="CoreframeAI, AgentLabeless, prompt-based labeling, AI agents, labeling tools, computer vision AI, human-in-the-loop, context-aware AI"
        />
        <meta name="author" content="Chevngko - CoreframeAI" />
        <meta property="og:title" content="CoreframeAI – Agents with Context, Not Coordinates" />
        <meta
          property="og:description"
          content="Meet AgentLabeless – a vision agent that labels like you do. CoreframeAI is bringing a new era of prompt-powered cognition-first tools."
        />
        <meta property="og:image" content="https://coreframeai.com/images/agentlabeless-mvp.png" />
        <meta property="og:url" content="https://coreframeai.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CoreframeAI is Live – Prompt-Powered AI Agents Are Here" />
        <meta
          name="twitter:description"
          content="From CLIP-powered vision to concept-based labeling – CoreframeAI is launching a new kind of agent."
        />
        <meta name="twitter:image" content="https://coreframeai.com/images/agentlabeless-mvp.png" />
        <link rel="canonical" href="https://coreframeai.com/" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="snap-start h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold font-mono">🧠 CoreframeAI</h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-300">
            A modular system for building task-specific AI agents.
            <br />
            From research → to prototype → to deployment — all under one cognitive stack.
          </p>
          <p className="mt-6 text-sm text-zinc-500">
            🚀 Phase 1 Launch: Q2 2025 <br />
            🧠 CoreframeAI is rolling out cognition-first agents, one prototype at a time.
          </p>
        </div>

        {/* Footer Carousel */}
        <div
          id="footer"
          className="footer-carousel absolute bottom-0 w-full whitespace-nowrap overflow-hidden text-sm text-gray-400 py-4 border-t border-zinc-800 animate-marquee"
        >
          <div className="inline-block px-4">
            chevngko@coreframeai.com · MentalOS-driven · Architecting the future · Agents &gt; Prompts &gt;
            Prototypes &gt; Products · Less Labeling, More Learning · Compose Cognitive Pipelines · Human-in-the-Loop,
            Not Human-in-the-Way · AgentLabeless: Label with Prompts, Not Clicks ·
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
