"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface ToolInput {
  name: string;
  type: 'string' | 'number' | 'boolean';
  label: string;
  placeholder?: string;
  required: boolean;
  defaultValue?: any;
}

export interface MCPTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  inputs: ToolInput[];
  outputType: 'numeric' | 'text' | 'decision' | 'comparison';
  endpoint: string;
}

// Sample tools for the initial implementation
export const AVAILABLE_TOOLS: MCPTool[] = [
  {
    id: 'calculate_time_value',
    name: 'Time Value Calculator',
    description: 'Compute the value of your time based on income and working hours',
    icon: '⏱️',
    inputs: [
      {
        name: 'monthly_income',
        type: 'number',
        label: 'Monthly Income (RM)',
        placeholder: 'e.g., 5000',
        required: true
      },
      {
        name: 'working_hours_per_week',
        type: 'number',
        label: 'Working Hours Per Week',
        placeholder: 'e.g., 40',
        required: true
      }
    ],
    outputType: 'numeric',
    endpoint: '/mcp/calculate_time_value'
  },
  {
    id: 'compare_time_tradeoffs',
    name: 'Time Tradeoff Analyzer',
    description: 'Compare the value of different activities based on your hourly rate',
    icon: '⚖️',
    inputs: [
      {
        name: 'hourly_rate',
        type: 'number',
        label: 'Your Hourly Rate (RM)',
        placeholder: 'e.g., 50',
        required: true
      },
      {
        name: 'activity_cost',
        type: 'number',
        label: 'Activity Cost (RM)',
        placeholder: 'e.g., 100',
        required: true
      },
      {
        name: 'activity_duration_hours',
        type: 'number',
        label: 'Activity Duration (hours)',
        placeholder: 'e.g., 2',
        required: true
      }
    ],
    outputType: 'decision',
    endpoint: '/mcp/compare_time_tradeoffs'
  },
  {
    id: 'task_outsource_advisor',
    name: 'Outsourcing Advisor',
    description: 'Get recommendations on which tasks to delegate based on your time value',
    icon: '📋',
    inputs: [
      {
        name: 'hourly_rate',
        type: 'number',
        label: 'Your Hourly Rate (RM)',
        placeholder: 'e.g., 50',
        required: true
      },
      {
        name: 'task_description',
        type: 'string',
        label: 'Task Description',
        placeholder: 'Describe the task you\'re considering outsourcing',
        required: true
      },
      {
        name: 'estimated_hours',
        type: 'number',
        label: 'Estimated Hours to Complete',
        placeholder: 'e.g., 3',
        required: true
      }
    ],
    outputType: 'text',
    endpoint: '/mcp/task_outsource_advisor'
  }
];

interface ToolSelectorProps {
  selectedToolId: string;
  onSelectTool: (toolId: string) => void;
}

export default function ToolSelector({ selectedToolId, onSelectTool }: ToolSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select a Cognition Tool</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AVAILABLE_TOOLS.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedToolId === tool.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
            }`}
            onClick={() => onSelectTool(tool.id)}
          >
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">{tool.icon}</span>
              <h3 className="font-medium">{tool.name}</h3>
            </div>
            <p className="text-sm opacity-80">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
