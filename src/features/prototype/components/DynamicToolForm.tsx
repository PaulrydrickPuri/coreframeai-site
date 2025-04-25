"use client";

import React, { useState, useEffect } from 'react';
import { MCPTool } from './ToolSelector';

interface DynamicToolFormProps {
  tool: MCPTool;
  onSubmit: (values: Record<string, any>) => void;
  isLoading: boolean;
  savedValues?: Record<string, any>;
}

export default function DynamicToolForm({ 
  tool, 
  onSubmit, 
  isLoading,
  savedValues = {}
}: DynamicToolFormProps) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with saved values or defaults
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    
    tool.inputs.forEach(input => {
      // Use saved value if available, otherwise use default value or empty string/number
      if (savedValues && savedValues[input.name] !== undefined) {
        initialValues[input.name] = savedValues[input.name];
      } else if (input.defaultValue !== undefined) {
        initialValues[input.name] = input.defaultValue;
      } else {
        initialValues[input.name] = input.type === 'number' ? '' : '';
      }
    });
    
    setValues(initialValues);
    setErrors({});
  }, [tool.id, savedValues]);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    tool.inputs.forEach(input => {
      if (input.required) {
        if (input.type === 'number') {
          const numValue = parseFloat(values[input.name]);
          if (isNaN(numValue) || numValue <= 0) {
            newErrors[input.name] = `Please enter a valid positive number`;
            isValid = false;
          }
        } else if (!values[input.name]) {
          newErrors[input.name] = `This field is required`;
          isValid = false;
        }
      }
    });
    
    if (isValid) {
      // Convert number strings to actual numbers
      const processedValues = { ...values };
      tool.inputs.forEach(input => {
        if (input.type === 'number' && processedValues[input.name]) {
          processedValues[input.name] = parseFloat(processedValues[input.name]);
        }
      });
      
      onSubmit(processedValues);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {tool.inputs.map(input => (
        <div key={input.name}>
          <label htmlFor={input.name} className="block text-sm font-medium text-gray-300 mb-1">
            {input.label}
            {input.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {input.type === 'string' && (
            <input
              type="text"
              id={input.name}
              value={values[input.name] || ''}
              onChange={(e) => handleChange(input.name, e.target.value)}
              placeholder={input.placeholder}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={input.required}
            />
          )}
          
          {input.type === 'number' && (
            <input
              type="number"
              id={input.name}
              value={values[input.name] || ''}
              onChange={(e) => handleChange(input.name, e.target.value)}
              placeholder={input.placeholder}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={input.required}
              step="any"
            />
          )}
          
          {input.type === 'boolean' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={input.name}
                checked={values[input.name] || false}
                onChange={(e) => handleChange(input.name, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={input.name} className="ml-2 block text-sm text-gray-300">
                {input.label}
              </label>
            </div>
          )}
          
          {errors[input.name] && (
            <p className="mt-1 text-sm text-red-500">{errors[input.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
      >
        {isLoading ? `Processing...` : `Run ${tool.name}`}
      </button>
    </form>
  );
}
