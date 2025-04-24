'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SocialMediaPopover from '@shared/components/molecules/SocialMediaPopover';
import SearchBar from '@shared/components/molecules/SearchBar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? 'bg-[#121726]/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-[#00e1ff] font-mono font-bold text-xl">
          CoreframeAI
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <SearchBar />
          
          {/* FAQ Link - Positioned as a help resource */}
          <NavLink href="/faq">
            <div className="flex items-center space-x-1 text-gray-300 hover:text-[#00e1ff] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>FAQ</span>
            </div>
          </NavLink>
        </div>
        
        {/* Founder Social Media Popover */}
        <SocialMediaPopover />
      </div>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-gray-300 hover:text-[#00e1ff] transition-colors duration-300 text-sm font-medium"
    >
      {children}
    </Link>
  );
}
