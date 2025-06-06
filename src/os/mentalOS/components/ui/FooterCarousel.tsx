'use client';
import React from 'react';

const phrases = [
  { text: 'chevngko@coreframeai.com', hint: 'Email' },
  { text: 'CoreframeAI™', hint: 'Trademark in progress · Class 42' },
  { text: 'Build Agents That Think in Loops', hint: 'CoreframeAI Vision' },
  { text: 'Agents > Prompts > Prototypes > Products', hint: 'System Flow' },
  { text: 'Less Labeling, More Learning', hint: 'Efficiency by Design' },
  { text: 'Human-in-the-Loop, Not Human-in-the-Way', hint: 'Assistive AI Philosophy' },
  { text: 'MENTAL Loop: Map → Encode → Navigate → Test → Amplify → Learn', hint: 'Cognitive Reasoning Framework' },
  { text: 'AgentLabeless: Label with Prompts, Not Clicks', hint: 'Vision Agent · v0 Live' },
];


const FooterCarousel = () => {
  return (
    <div className="relative border-t border-zinc-800 bg-black text-white overflow-hidden h-[42px]">
      {/* Edge bokeh / fade gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 flex justify-between">
        <div className="w-24 bg-gradient-to-r from-black via-transparent to-transparent" />
        <div className="w-24 bg-gradient-to-l from-black via-transparent to-transparent" />
      </div>
      
      {/* Marquee wrapper */}
      <div className="marquee-wrapper w-full overflow-hidden">
        <div 
          className="marquee hover:pause flex items-center"
        >
          {/* Primary content group */}
          <div className="marquee-group flex items-center whitespace-nowrap text-xs text-gray-400 gap-12 px-4 py-2 font-mono">
            {phrases.map((item, i) => (
              <span
                key={i}
                className="inline-block min-w-max hover:scale-[1.05] transition-transform blur-[0.3px] hover:blur-none"
                data-tooltip={item.hint}
              >
                {item.text}
              </span>
            ))}
          </div>
          
          {/* Duplicate groups to ensure seamless looping */}
          <div aria-hidden="true" className="marquee-group flex items-center whitespace-nowrap text-xs text-gray-400 gap-12 px-4 py-2 font-mono">
            {phrases.map((item, i) => (
              <span
                key={`clone-${i}`}
                className="inline-block min-w-max hover:scale-[1.05] transition-transform blur-[0.3px] hover:blur-none"
                data-tooltip={item.hint}
              >
                {item.text}
              </span>
            ))}
          </div>
          
          {/* Additional duplicate for longer content */}
          <div aria-hidden="true" className="marquee-group flex items-center whitespace-nowrap text-xs text-gray-400 gap-12 px-4 py-2 font-mono">
            {phrases.map((item, i) => (
              <span
                key={`clone2-${i}`}
                className="inline-block min-w-max hover:scale-[1.05] transition-transform blur-[0.3px] hover:blur-none"
                data-tooltip={item.hint}
              >
                {item.text}
              </span>
            ))}
          </div>
          
          {/* Fourth group for extra safety */}
          <div aria-hidden="true" className="marquee-group flex items-center whitespace-nowrap text-xs text-gray-400 gap-12 px-4 py-2 font-mono">
            {phrases.map((item, i) => (
              <span
                key={`clone3-${i}`}
                className="inline-block min-w-max hover:scale-[1.05] transition-transform blur-[0.3px] hover:blur-none"
                data-tooltip={item.hint}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterCarousel;