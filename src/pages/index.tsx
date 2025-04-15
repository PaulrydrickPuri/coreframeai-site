import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white px-4">
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Meet AgentLabeless
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          A prompt-powered vision agent that labels like you do — with context, not coordinates.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/terminal" passHref legacyBehavior>
            <a className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-zinc-200 transition">
              Try AgentLabeless
            </a>
          </Link>

          <Link href="#mvp-story" passHref legacyBehavior>
            <a className="border border-white px-5 py-2 rounded font-semibold hover:bg-white hover:text-black transition">
              Read Full Journey ↓
            </a>
          </Link>
        </div>
        <p className="text-sm text-gray-600 mt-12">© 2025 CoreframeAI</p>
      </section>
    </main>
  );
}
