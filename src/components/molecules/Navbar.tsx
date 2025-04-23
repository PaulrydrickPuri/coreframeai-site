'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Research Papers', href: '/research' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-zinc-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-mono font-bold text-cyan-400">
          🧠 CoreframeAI
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-sm">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <Link href={href}>
                <span
                  className={`relative pb-1 hover:text-cyan-400 transition-all duration-200 ${
                    pathname === href ? 'text-cyan-400 font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-cyan-400' : 'text-zinc-300'
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/start" className="hidden md:inline-block ml-4 px-4 py-2 text-sm font-semibold rounded-full border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all">
          Get Started
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-cyan-300 hover:text-white"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-3 text-sm">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} onClick={() => setMobileOpen(false)}>
                  <span className={`block py-1 ${pathname === href ? 'text-cyan-400 font-semibold' : 'text-zinc-300'} hover:text-cyan-400 transition-colors`}>
                    {label}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/start" onClick={() => setMobileOpen(false)}>
                <span className="block py-2 px-4 border border-cyan-400 rounded-full text-cyan-300 hover:bg-cyan-400 hover:text-black text-center">
                  Get Started
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
