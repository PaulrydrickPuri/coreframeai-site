"use client";

import React, { useState } from 'react';

interface TimeValueResult {
  hourlyRate: number;
  timeValueInsight: string;
  chainOfThought: string;
}

interface MCPResultCardProps {
  result: TimeValueResult;
}

export default function MCPResultCard({ result }: MCPResultCardProps) {
  const [showCoT, setShowCoT] = useState(false);
  
  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Result</h3>
        <button
          onClick={() => setShowCoT(!showCoT)}
          className="mt-2 md:mt-0 text-sm text-blue-400 hover:text-blue-300 flex items-center"
        >
          {showCoT ? 'Hide' : 'Show'} Chain of Thought
          <svg 
            className={`ml-1 w-4 h-4 transition-transform ${showCoT ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline mb-2">
          <span className="text-gray-400 text-sm mr-2">Hourly Rate:</span>
          <span className="text-2xl font-bold text-green-400">
            RM{result.hourlyRate.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-300">{result.timeValueInsight}</p>
      </div>
      
      {showCoT && (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Chain of Thought</h4>
          <pre className="bg-gray-900 p-4 rounded text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
            {result.chainOfThought}
          </pre>
        </div>
      )}
    </div>
  );
}
