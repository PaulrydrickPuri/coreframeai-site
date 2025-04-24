'use client';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

// Social media icons and links
const GITHUB_ICON = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const TWITTER_ICON = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

export default function SocialMediaPopover() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button as={Fragment}>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative p-2 text-2xl rounded-full transition-all duration-300 group focus:outline-none"
            >
              <span className="relative z-10 group-hover:animate-pulse">🧠</span>
              <div className="absolute inset-0 bg-[#00e1ff]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </Popover.Button>
          
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-3 transform">
              <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#00e1ff]/20 w-[320px]">
                <div className="relative bg-[#111827] bg-opacity-95 backdrop-blur-xl p-6 border border-white/10">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00e1ff]/5 to-[#7928ca]/5 mix-blend-overlay"></div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#00e1ff]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  
                  {/* Profile section */}
                  <div className="relative z-10 flex items-center mb-6">
                    <div className="mr-3">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Chevngko</h3>
                      <p className="text-[#00e1ff] text-sm">Founder & Explorer @ CoreframeAI</p>
                    </div>
                  </div>
                  
                  {/* Contact info */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center mb-3 text-gray-300">
                      <span className="mr-2">📧</span>
                      <a href="mailto:chevngko@coreframeai.com" className="text-sm hover:text-[#00e1ff] transition-colors">
                        chevngko@coreframeai.com
                      </a>
                    </div>
                  </div>
                  
                  {/* Social links - simplified */}
                  <div className="relative z-10 space-y-3">
                    <a 
                      href="https://linktr.ee/chevngko" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-[#00e1ff] transition-colors"
                    >
                      <span className="mr-2">🔗</span>
                      <span className="text-sm">Linktree</span>
                    </a>
                    
                    <a 
                      href="https://github.com/chevngko" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-[#00e1ff] transition-colors"
                    >
                      <span className="mr-2">{GITHUB_ICON}</span>
                      <span className="text-sm">GitHub</span>
                    </a>
                    
                    <a 
                      href="https://twitter.com/chevngko" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-[#00e1ff] transition-colors"
                    >
                      <span className="mr-2">{TWITTER_ICON}</span>
                      <span className="text-sm">X (Twitter)</span>
                    </a>
                  </div>
                  
                  {/* Dot indicator */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#00e1ff] rounded-full"></div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}