/**
 * HeadlineCard component
 * Display a single brutal headline with severity coloring and action button
 */

import React from 'react';
import type { BrutalHeadline } from '../core/report';

interface HeadlineCardProps {
  headline: BrutalHeadline;
  index: number;
  onMarkDone: () => void;
}

export default function HeadlineCard({ headline, index, onMarkDone }: HeadlineCardProps) {
  // Determine severity color based on index (per UI requirement)
  // Red > Orange > Yellow > Teal > Blue
  const getSeverityColor = () => {
    const colors = [
      { bg: 'bg-red-900/40', text: 'text-red-300', border: 'border-red-700' },
      { bg: 'bg-orange-900/40', text: 'text-orange-300', border: 'border-orange-700' },
      { bg: 'bg-yellow-900/40', text: 'text-yellow-300', border: 'border-yellow-700' },
      { bg: 'bg-teal-900/40', text: 'text-teal-300', border: 'border-teal-700' },
      { bg: 'bg-blue-900/40', text: 'text-blue-300', border: 'border-blue-700' }
    ];
    return colors[index % colors.length];
  };

  // Format impact value for display
  const formatImpact = (impact: number | string) => {
    if (typeof impact === 'number') {
      return new Intl.NumberFormat('en-MY', { 
        style: 'currency', 
        currency: 'MYR',
        maximumFractionDigits: 0
      }).format(impact);
    }
    return impact;
  };

  const colorStyle = getSeverityColor();
  
  return (
    <div className={`rounded-lg border ${colorStyle.border} ${colorStyle.bg} p-4 mb-4 transition-all`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-xl font-bold ${colorStyle.text}`}>
          {headline.headline}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
            Confidence: {Math.round(headline.confidence * 100)}%
          </span>
          <span className={`text-sm font-medium ${colorStyle.text} bg-gray-800 px-2 py-1 rounded-full`}>
            Impact: {formatImpact(headline.impact)}
          </span>
        </div>
      </div>
      
      <div className="text-gray-300 mb-4">
        <div className="flex items-start">
          <div className="text-xl mr-2">🔧</div>
          <p>{headline.action}</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        {headline.completed ? (
          <div className="px-4 py-2 bg-green-800/50 text-green-300 rounded-md flex items-center">
            <span className="mr-2">✓</span> Completed
          </div>
        ) : (
          <button
            onClick={onMarkDone}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md"
          >
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
}
