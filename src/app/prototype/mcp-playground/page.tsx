"use client";

import React, { useState, useEffect } from 'react';
import ToolSelector, { AVAILABLE_TOOLS, MCPTool } from '@features/prototype/components/ToolSelector';
import DynamicToolForm from '@features/prototype/components/DynamicToolForm';
import { useOptimizedMemory } from '@/features/prototype/components/OptimizedMemoryManager';

interface ToolResult {
  // Generic result interface that can handle different tool outputs
  [key: string]: any;
  chainOfThought?: string;
}

// MCPResultCard Component
function MCPResultCard({ result, toolId }: { result: ToolResult; toolId: string }) {
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
            {toolId === 'calculate_time_value' && `RM${result.hourlyRate?.toFixed(2)}`}
            {toolId === 'compare_time_tradeoffs' && `${result.worthwhile ? 'Worthwhile ✓' : 'Not Worthwhile ✗'}`}
            {toolId === 'task_outsource_advisor' && `RM${result.taskValue?.toFixed(2)}`}
          </span>
        </div>
        
        <p className="text-gray-300">
          {toolId === 'calculate_time_value' && result.timeValueInsight}
          {toolId === 'compare_time_tradeoffs' && result.recommendation}
          {toolId === 'task_outsource_advisor' && result.recommendation}
        </p>
        
        {/* Additional info for specific tools */}
        {toolId === 'task_outsource_advisor' && result.outsourcingPlatforms && (
          <div className="mt-2">
            <p className="text-sm text-gray-400">Recommended platforms:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {result.outsourcingPlatforms.map((platform: string) => (
                <span key={platform} className="px-2 py-1 bg-gray-700 rounded-md text-xs">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}
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
function PostRunActions({ result, toolId }: { result: ToolResult; toolId: string }) {
  const [activeTab, setActiveTab] = useState<string>('link');
  const [copied, setCopied] = useState<boolean>(false);
  const [reminderEmail, setReminderEmail] = useState<string>('');
  const [reminderTime, setReminderTime] = useState<string>('09:00');
  const [reminderSubmitted, setReminderSubmitted] = useState<boolean>(false);

  // Generate shareable link based on tool type
  const getShareableLink = () => {
    switch (toolId) {
      case 'calculate_time_value':
        return `https://coreframeai.com/mcp/run?tool=calculate_time_value&monthly_income=${encodeURIComponent(result.hourlyRate * 40 * 4)}&working_hours=${encodeURIComponent(40)}`;
      case 'compare_time_tradeoffs':
        return `https://coreframeai.com/mcp/run?tool=compare_time_tradeoffs&hourly_rate=${encodeURIComponent(result.hourlyRate)}&activity_cost=${encodeURIComponent(result.activityCost)}&activity_duration=${encodeURIComponent(result.activityDurationHours)}`;
      case 'task_outsource_advisor':
        return `https://coreframeai.com/mcp/run?tool=task_outsource_advisor&hourly_rate=${encodeURIComponent(result.hourlyRate)}&task=${encodeURIComponent(result.taskDescription)}&hours=${encodeURIComponent(result.estimatedHours)}`;
      default:
        return `https://coreframeai.com/mcp/run?tool=${encodeURIComponent(toolId)}`;
    }
  };
  
  const handleCopyLink = () => {
    const shareableLink = getShareableLink();
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
                value={getShareableLink()}
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
// Dynamic example based on tool type
${toolId === 'calculate_time_value' ? 
`const result = await calculateTimeValue(${result.hourlyRate * 40 * 4}, 40);` : 
toolId === 'compare_time_tradeoffs' ? 
`const result = await compareTimeTradeoffs(${result.hourlyRate}, ${result.activityCost}, ${result.activityDurationHours});` : 
`const result = await taskOutsourceAdvisor(${result.hourlyRate}, "${result.taskDescription.replace(/"/g, '\"')}", ${result.estimatedHours});`}
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
                {toolId === 'calculate_time_value' && `RM${result.hourlyRate.toFixed(2)}/hour`}
                {toolId === 'compare_time_tradeoffs' && `${result.worthwhile ? 'Worth your time!' : 'Not worth your time!'}`}
                {toolId === 'task_outsource_advisor' && `RM${result.taskValue.toFixed(2)} task value`}
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
                  You&apos;ll receive a daily reminder at {reminderTime} about your {toolId === 'calculate_time_value' ? 'time value' : toolId === 'compare_time_tradeoffs' ? 'time tradeoffs' : 'outsourcing opportunities'}.
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
  // Get the user memory manager
  const { 
    userId, 
    userMemory, 
    updatePreferences, 
    saveToolUsage, 
    getLastToolValues,
    isLoading: memoryLoading
  } = useOptimizedMemory();

  // State for the selected tool and results
  const [selectedToolId, setSelectedToolId] = useState<string>('calculate_time_value');
  const [result, setResult] = useState<ToolResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the selected tool object
  const selectedTool = AVAILABLE_TOOLS.find(tool => tool.id === selectedToolId) || AVAILABLE_TOOLS[0];
  
  // Load last used tool from user memory
  useEffect(() => {
    if (userMemory?.preferences?.last_tool_id) {
      const toolExists = AVAILABLE_TOOLS.some(tool => tool.id === userMemory.preferences.last_tool_id);
      if (toolExists) {
        setSelectedToolId(userMemory.preferences.last_tool_id);
      }
    }
  }, [userMemory]);

  // Handle tool selection
  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setResult(null);
    setError(null);
    
    // Save preference to user memory
    if (userId) {
      updatePreferences({ last_tool_id: toolId });
    }
  };

  // Handle form submission for any tool
  const handleToolSubmit = async (values: Record<string, any>) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call the actual API endpoint for the selected tool
      // For now, we'll simulate the response based on the tool type
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let toolResult: ToolResult;
      
      // Handle different tools
      switch (selectedTool.id) {
        case 'calculate_time_value':
          toolResult = simulateTimeValueCalculation(values.monthly_income, values.working_hours_per_week);
          break;
          
        case 'compare_time_tradeoffs':
          toolResult = simulateTimeTradeoffAnalysis(values.hourly_rate, values.activity_cost, values.activity_duration_hours);
          break;
          
        case 'task_outsource_advisor':
          toolResult = simulateOutsourcingAdvice(values.hourly_rate, values.task_description, values.estimated_hours);
          break;
          
        default:
          throw new Error('Unknown tool selected');
      }
      
      setResult(toolResult);
      
      // Save tool usage to user memory
      if (userId) {
        saveToolUsage(selectedTool.id, values, toolResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Simulation functions for different tools
  const simulateTimeValueCalculation = (monthlyIncome: number, workingHoursPerWeek: number): ToolResult => {
    if (isNaN(monthlyIncome) || isNaN(workingHoursPerWeek) || monthlyIncome <= 0 || workingHoursPerWeek <= 0) {
      throw new Error('Please enter valid positive numbers for income and working hours');
    }
    
    // Calculate hourly rate
    const hourlyRate = (monthlyIncome * 12) / (workingHoursPerWeek * 52);
    
    // Generate insight
    const timeValueInsight = generateInsight(hourlyRate);
    
    // Simulate chain of thought
    const chainOfThought = `
1. Received query with monthly_income=${monthlyIncome} and working_hours_per_week=${workingHoursPerWeek}
2. Calculated annual income: ${monthlyIncome} * 12 = ${monthlyIncome * 12}
3. Calculated annual working hours: ${workingHoursPerWeek} * 52 = ${workingHoursPerWeek * 52}
4. Computed hourly rate: ${monthlyIncome * 12} / ${workingHoursPerWeek * 52} = ${hourlyRate.toFixed(2)}
5. Generated insight based on hourly rate value
`;

    return {
      hourlyRate,
      timeValueInsight,
      chainOfThought
    };
  };
  
  const simulateTimeTradeoffAnalysis = (hourlyRate: number, activityCost: number, activityDurationHours: number): ToolResult => {
    if (isNaN(hourlyRate) || isNaN(activityCost) || isNaN(activityDurationHours) || 
        hourlyRate <= 0 || activityCost < 0 || activityDurationHours <= 0) {
      throw new Error('Please enter valid positive numbers');
    }
    
    // Calculate time value of the activity
    const timeValue = hourlyRate * activityDurationHours;
    const netValue = timeValue - activityCost;
    const worthwhile = netValue > 0;
    
    // Generate recommendation
    const recommendation = worthwhile
      ? `This activity is worth your time. You'll gain a net value of RM${netValue.toFixed(2)}.`
      : `This activity may not be worth your time. You'll lose a net value of RM${Math.abs(netValue).toFixed(2)}.`;
    
    // Simulate chain of thought
    const chainOfThought = `
1. Received query with hourly_rate=${hourlyRate}, activity_cost=${activityCost}, and activity_duration_hours=${activityDurationHours}
2. Calculated time value: ${hourlyRate} * ${activityDurationHours} = ${timeValue.toFixed(2)}
3. Calculated net value: ${timeValue.toFixed(2)} - ${activityCost} = ${netValue.toFixed(2)}
4. Determined if activity is worthwhile: ${worthwhile ? 'Yes' : 'No'}
5. Generated recommendation based on net value
`;

    return {
      hourlyRate,
      activityCost,
      activityDurationHours,
      timeValue,
      netValue,
      worthwhile,
      recommendation,
      chainOfThought
    };
  };
  
  const simulateOutsourcingAdvice = (hourlyRate: number, taskDescription: string, estimatedHours: number): ToolResult => {
    if (isNaN(hourlyRate) || isNaN(estimatedHours) || hourlyRate <= 0 || estimatedHours <= 0) {
      throw new Error('Please enter valid positive numbers');
    }
    
    if (!taskDescription.trim()) {
      throw new Error('Please provide a task description');
    }
    
    // Calculate task value
    const taskValue = hourlyRate * estimatedHours;
    
    // Generate outsourcing thresholds
    const lowThreshold = hourlyRate * 0.3;
    const highThreshold = hourlyRate * 0.7;
    
    // Generate recommendation based on task complexity and value
    let recommendation = '';
    let outsourcingPlatforms = [];
    
    const taskWords = taskDescription.toLowerCase().split(' ');
    const isCreative = taskWords.some(word => ['design', 'write', 'create', 'develop', 'creative'].includes(word));
    const isTechnical = taskWords.some(word => ['code', 'program', 'technical', 'data', 'analysis'].includes(word));
    const isAdmin = taskWords.some(word => ['organize', 'schedule', 'email', 'research', 'admin'].includes(word));
    
    if (isCreative) {
      recommendation = `This creative task is worth RM${taskValue.toFixed(2)} of your time. `;
      if (taskValue > 500) {
        recommendation += 'Consider hiring a specialized professional for high-quality results.';
        outsourcingPlatforms = ['Upwork (Premium)', 'Fiverr Pro', 'Toptal'];
      } else {
        recommendation += 'You can outsource this to a freelancer at a competitive rate.';
        outsourcingPlatforms = ['Fiverr', 'Upwork', '99designs'];
      }
    } else if (isTechnical) {
      recommendation = `This technical task is worth RM${taskValue.toFixed(2)} of your time. `;
      if (taskValue > 1000) {
        recommendation += 'For complex technical work, consider a specialized agency or experienced contractor.';
        outsourcingPlatforms = ['Toptal', 'GitHub Jobs', 'Stack Overflow Jobs'];
      } else {
        recommendation += 'You can find qualified technical freelancers online.';
        outsourcingPlatforms = ['Upwork', 'Fiverr', 'Freelancer'];
      }
    } else if (isAdmin) {
      recommendation = `This administrative task is worth RM${taskValue.toFixed(2)} of your time. `;
      recommendation += 'This is ideal for delegation to a virtual assistant.';
      outsourcingPlatforms = ['Upwork', 'Fiverr', 'Virtual Staff Finder'];
    } else {
      recommendation = `This task is worth RM${taskValue.toFixed(2)} of your time. `;
      if (taskValue > 200) {
        recommendation += 'Consider outsourcing to free up your time for higher-value activities.';
      } else {
        recommendation += 'For small tasks, weigh the coordination cost against the time saved.';
      }
      outsourcingPlatforms = ['Upwork', 'Fiverr', 'TaskRabbit'];
    }
    
    // Simulate chain of thought
    const chainOfThought = `
1. Received query with hourly_rate=${hourlyRate}, task_description="${taskDescription}", and estimated_hours=${estimatedHours}
2. Calculated task value: ${hourlyRate} * ${estimatedHours} = ${taskValue.toFixed(2)}
3. Analyzed task description for type: ${isCreative ? 'Creative' : isTechnical ? 'Technical' : isAdmin ? 'Administrative' : 'General'}
4. Determined outsourcing thresholds: Low=${lowThreshold.toFixed(2)}, High=${highThreshold.toFixed(2)}
5. Generated recommendation and suggested platforms based on task type and value
`;

    return {
      hourlyRate,
      taskDescription,
      estimatedHours,
      taskValue,
      taskType: isCreative ? 'Creative' : isTechnical ? 'Technical' : isAdmin ? 'Administrative' : 'General',
      recommendation,
      outsourcingPlatforms,
      chainOfThought
    };
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

        {/* User greeting if authenticated */}
        {userId && !userId.startsWith('anon_') && userMemory && (
          <div className="mb-8 text-right">
            <p className="text-sm text-gray-400">
              Welcome back! Your preferences and tool history are saved.
            </p>
          </div>
        )}

        {/* Tool Selector */}
        <ToolSelector 
          selectedToolId={selectedToolId} 
          onSelectTool={handleSelectTool} 
        />

        {/* Tool Interaction Section */}
        <div className="bg-gray-900 rounded-xl p-6 mb-12 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">{selectedTool.name}</h2>
          <p className="text-gray-400 mb-6">
            {selectedTool.description}
          </p>

          {/* Dynamic Form based on selected tool */}
          <DynamicToolForm
            tool={selectedTool}
            onSubmit={handleToolSubmit}
            isLoading={isLoading}
            savedValues={getLastToolValues(selectedTool.id)}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-md text-red-200">
              {error}
            </div>
          )}

          {/* Result Display */}
          {result && <MCPResultCard result={result} toolId={selectedToolId} />}
        </div>

        {/* Post-Execution Section */}
        {result && <PostRunActions result={result} toolId={selectedToolId} />}

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
