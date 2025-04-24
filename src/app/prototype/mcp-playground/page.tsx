"use client";

import React, { useState } from 'react';

interface TimeValueResult {
  hourlyRate: number;
  timeValueInsight: string;
  chainOfThought: string;
}

// MCPResultCard Component
function MCPResultCard({ result }: { result: TimeValueResult }) {
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

// PostRunActions Component
function PostRunActions({ result }: { result: TimeValueResult }) {
  const [activeTab, setActiveTab] = useState<string>('link');
  const [copied, setCopied] = useState<boolean>(false);
  const [reminderEmail, setReminderEmail] = useState<string>('');
  const [reminderTime, setReminderTime] = useState<string>('09:00');
  const [reminderSubmitted, setReminderSubmitted] = useState<boolean>(false);

  const handleCopyLink = () => {
    const shareableLink = `https://coreframeai.com/mcp/run?tool=calculate_time_value&monthly_income=${encodeURIComponent(result.hourlyRate * 40 * 4)}&working_hours=${encodeURIComponent(40)}`;
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would save to Supabase
    console.log('Saving reminder:', { email: reminderEmail, time: reminderTime, hourlyRate: result.hourlyRate });
    setReminderSubmitted(true);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold mb-6">Use This Tool in Your World</h2>
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto space-x-1 mb-6 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('link')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'link'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Share as Link
        </button>
        <button
          onClick={() => setActiveTab('browser')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'browser'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Add to Browser
        </button>
        <button
          onClick={() => setActiveTab('background')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'background'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Generate Background
        </button>
        <button
          onClick={() => setActiveTab('reminder')}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
            activeTab === 'reminder'
              ? 'text-blue-400 border-b-2 border-blue-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Set Daily Reminder
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="mt-4">
        {/* Share as Link */}
        {activeTab === 'link' && (
          <div>
            <p className="text-gray-300 mb-4">
              Share this calculation with others or bookmark it for later use.
            </p>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={`https://coreframeai.com/mcp/run?tool=calculate_time_value&monthly_income=${result.hourlyRate * 40 * 4}&working_hours=40`}
                className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
        
        {/* Add to Browser */}
        {activeTab === 'browser' && (
          <div>
            <p className="text-gray-300 mb-4">
              Add this tool to your browser for quick access anytime.
            </p>
            <div className="bg-gray-800 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Browser Extension Code</h4>
              <pre className="bg-gray-900 p-4 rounded text-xs text-gray-300 overflow-x-auto">
{`// Add to your browser extension
async function calculateTimeValue(monthlyIncome, workingHours) {
  const response = await fetch('https://api.coreframeai.com/mcp/calculate_time_value', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monthly_income: monthlyIncome, working_hours_per_week: workingHours })
  });
  return await response.json();
}

// Example usage
const result = await calculateTimeValue(${result.hourlyRate * 40 * 4}, 40);
console.log(\`Your time is worth RM\${result.hourly_rate}/hour\`);`}
              </pre>
              <div className="mt-4">
                <a 
                  href="#" 
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                >
                  View Example Extension Repo
                  <svg 
                    className="ml-1 w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Generate Background */}
        {activeTab === 'background' && (
          <div>
            <p className="text-gray-300 mb-4">
              Create a custom background image with your time value insight.
            </p>
            <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-lg text-center mb-4">
              <div className="text-3xl font-bold text-white mb-2">
                Your time is worth
              </div>
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
                RM{result.hourlyRate.toFixed(2)}/hour
              </div>
              <div className="text-lg text-gray-300">
                Focus on high-value activities
              </div>
            </div>
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Background Image
            </button>
          </div>
        )}
        
        {/* Set Daily Reminder */}
        {activeTab === 'reminder' && (
          <div>
            <p className="text-gray-300 mb-4">
              Get a daily reminder of your time value to help you make better decisions.
            </p>
            
            {!reminderSubmitted ? (
              <form onSubmit={handleReminderSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={reminderEmail}
                    onChange={(e) => setReminderEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="reminderTime" className="block text-sm font-medium text-gray-300 mb-1">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    id="reminderTime"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Set Daily Reminder
                </button>
              </form>
            ) : (
              <div className="bg-green-900/30 border border-green-800 rounded-md p-4 text-center">
                <svg 
                  className="w-12 h-12 text-green-500 mx-auto mb-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-medium text-white mb-1">Reminder Set!</h4>
                <p className="text-green-300">
                  You&apos;ll receive a daily reminder at {reminderTime} about your time value.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main MCPPlayground Page Component
export default function MCPPlaygroundPage() {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [workingHours, setWorkingHours] = useState<string>('');
  const [result, setResult] = useState<TimeValueResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an actual API endpoint
      // For now, we'll simulate the calculation and response
      const income = parseFloat(monthlyIncome);
      const hours = parseFloat(workingHours);
      
      if (isNaN(income) || isNaN(hours) || income <= 0 || hours <= 0) {
        throw new Error('Please enter valid positive numbers for income and working hours');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate hourly rate
      const hourlyRate = (income * 12) / (hours * 52);
      
      // Generate insight
      const timeValueInsight = generateInsight(hourlyRate);
      
      // Simulate chain of thought
      const chainOfThought = `
1. Received query with monthly_income=${income} and working_hours_per_week=${hours}
2. Calculated annual income: ${income} * 12 = ${income * 12}
3. Calculated annual working hours: ${hours} * 52 = ${hours * 52}
4. Computed hourly rate: ${income * 12} / ${hours * 52} = ${hourlyRate.toFixed(2)}
5. Generated insight based on hourly rate value
`;

      setResult({
        hourlyRate,
        timeValueInsight,
        chainOfThought
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const generateInsight = (hourlyRate: number): string => {
    if (hourlyRate < 20) {
      return `Your time is worth RM${hourlyRate.toFixed(2)}/hour. Consider focusing on skills that can increase your earning potential.`;
    } else if (hourlyRate < 50) {
      return `Your time is worth RM${hourlyRate.toFixed(2)}/hour. You might want to outsource tasks that cost less than your hourly rate.`;
    } else if (hourlyRate < 100) {
      return `Your time is worth RM${hourlyRate.toFixed(2)}/hour. Consider delegating tasks that don't align with your highest value activities.`;
    } else {
      return `Your time is worth RM${hourlyRate.toFixed(2)}/hour. Focus exclusively on high-leverage activities and delegate everything else.`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c101a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            MCP Playground
          </h1>
          <p className="text-xl text-gray-300">
            Run cognition tools. Deploy them into your world.
          </p>
        </div>

        {/* Tool Interaction Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-12 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Calculate Time Value</h2>
          <p className="text-gray-400 mb-6">
            Compute the value of your time based on income and working hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-300 mb-1">
                Monthly Income (RM)
              </label>
              <input
                type="number"
                id="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="e.g., 5000"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="workingHours" className="block text-sm font-medium text-gray-300 mb-1">
                Working Hours Per Week
              </label>
              <input
                type="number"
                id="workingHours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                placeholder="e.g., 40"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Calculating...' : 'Calculate Time Value'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200">
              {error}
            </div>
          )}

          {/* Result Display */}
          {result && <MCPResultCard result={result} />}
        </div>

        {/* Post-Execution Section */}
        {result && <PostRunActions result={result} />}

        {/* Optional Section: Create Your Own MCP Tool */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Create Your Own MCP Tool</h2>
          <p className="text-gray-400 mb-6">
            Have an idea for a cognitive tool? Build it and deploy it to your workflows.
          </p>
          <button className="py-3 px-8 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Build a New Tool
          </button>
        </div>
      </div>
    </div>
  );
}
