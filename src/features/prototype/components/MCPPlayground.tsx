"use client";

import React, { useState } from 'react';
import MCPResultCard from './MCPResultCard';
import PostRunActions from './PostRunActions';

interface TimeValueResult {
  hourlyRate: number;
  timeValueInsight: string;
  chainOfThought: string;
}

export default function MCPPlayground() {
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
