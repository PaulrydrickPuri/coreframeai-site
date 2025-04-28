/**
 * ActionCard component
 * Displays a single action item with impact estimation
 */

import React from 'react';
import { BrutalHeadline } from '../core/report';

interface ActionCardProps {
  action: BrutalHeadline;
  onComplete: () => void;
}

export default function ActionCard({ action, onComplete }: ActionCardProps) {
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

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-all">
      <div className="flex items-start mb-3">
        <div className="text-xl mr-2 mt-1">🔧</div>
        <div>
          <h4 className="font-medium text-white text-lg">{action.action}</h4>
          <p className="text-sm text-gray-400">
            From: <span className="text-red-400">{action.headline}</span>
          </p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm bg-gray-900 px-2 py-1 rounded-full text-green-400">
            Est. Impact: {formatImpact(action.impact)}
          </span>
        </div>
        
        {action.completed ? (
          <div className="px-3 py-1 bg-green-800/30 text-green-300 rounded-md flex items-center text-sm">
            <span className="mr-1">✓</span> Completed
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}
