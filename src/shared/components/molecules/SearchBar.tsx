'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// Mock search results - in a real app, this would come from an API
const mockSearchResults = [
  {
    type: 'research',
    title: 'Cognitive Loops in AI Systems',
    url: '/research/cognitive-loops',
    description: 'Exploring how recursive processing improves AI reasoning'
  },
  {
    type: 'module',
    title: 'AgentLabeless',
    url: '/modules/agent-labeless',
    description: 'Label with prompts, not clicks'
  },
  {
    type: 'project',
    title: 'MENTAL Framework Implementation',
    url: '/projects/mental-framework',
    description: 'Map → Encode → Navigate → Test → Amplify → Learn'
  },
  {
    type: 'research',
    title: 'Human-in-the-Loop AI Systems',
    url: '/research/human-in-loop',
    description: 'Designing AI that augments human capabilities'
  }
];

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<typeof mockSearchResults>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length > 1) {
      // Filter mock results based on query
      const filteredResults = mockSearchResults.filter(
        item => item.title.toLowerCase().includes(query.toLowerCase()) || 
               item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      {/* Search icon/button */}
      <motion.button
        onClick={() => setIsSearchOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center space-x-2 text-gray-300 hover:text-[#00e1ff] transition-colors"
        aria-label="Search"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <span className="hidden md:inline text-sm">Search</span>
      </motion.button>

      {/* Search modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-[#121726]/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
              {/* Search input */}
              <div className="p-4 border-b border-gray-800">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for research papers, modules, projects..."
                    className="w-full bg-[#1a2035] text-white px-4 py-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00e1ff]/50"
                    value={searchQuery}
                    onChange={e => handleSearch(e.target.value)}
                    autoFocus
                  />
                  <svg 
                    className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
              </div>

              {/* Search results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <a 
                        key={index} 
                        href={result.url}
                        className="block p-3 hover:bg-[#1a2035] rounded-lg transition-colors mb-1"
                      >
                        <div className="flex items-start">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#00e1ff]/10 text-[#00e1ff] mr-2">
                            {result.type}
                          </span>
                          <div>
                            <h4 className="text-white font-medium">{result.title}</h4>
                            <p className="text-gray-400 text-sm mt-0.5">{result.description}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : searchQuery.length > 1 ? (
                  <div className="p-8 text-center text-gray-400">
                    No results found for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    Type to search for research papers, modules, or projects
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-800 p-4 flex justify-between items-center text-xs text-gray-500">
                <div>Press <kbd className="px-2 py-1 bg-gray-800 rounded">ESC</kbd> to close</div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
