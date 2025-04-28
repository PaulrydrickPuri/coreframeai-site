/**
 * Doom-Diag Prompts
 * LLM few-shot templates for OpenAI function calls
 */

import { AnalysisResult } from './analyzer';

// Extracted data interface to match extractor.ts output
interface ExtractedData {
  revenues: Array<{amount: number; date: string; description: string}>;
  costs: Array<{amount: number; date: string; description: string}>;
  dates: string[];
  metadata?: {
    fileName: string;
    extractionTime: string;
    rowCount: number;
  };
}

// Function call schema for OpenAI
export const brutalhHeadlinesSchema = {
  name: 'generateBrutalHeadlines',
  description: 'Generate 5 brutal but truthful financial headlines with recommended actions',
  parameters: {
    type: 'object',
    properties: {
      headlines: {
        type: 'array',
        description: 'Exactly 5 headline-action pairs',
        items: {
          type: 'object',
          properties: {
            headline: {
              type: 'string',
              description: 'Brutal, concise financial headline (≤90 chars)'
            },
            action: {
              type: 'string',
              description: 'Single concrete action to fix the issue (≤140 chars)'
            },
            impact: {
              type: 'number',
              description: 'Estimated financial impact in RM or as a percentage'
            },
            confidence: {
              type: 'number',
              description: 'Confidence score between 0-1'
            }
          },
          required: ['headline', 'action', 'impact', 'confidence']
        }
      }
    },
    required: ['headlines']
  }
};

// System prompt template for generating brutal headlines
export const systemPromptTemplate = `
You are a ruthless fractional CFO. 
Input: {revenues[], costs[], dates[]}  
Return exactly 5 objects: {
  headline (<=90 chars),
  action (<=140 chars, single concrete task),
  impact (number, RM or %),
  confidence (0-1)
}
Tone: brutal, concise, professional.
`;

// Example few-shot for the LLM
export const fewShotExamples = [
  {
    input: {
      revenues: [
        { amount: 5000, date: '2025-01-15', description: 'Product A sales' },
        { amount: 4500, date: '2025-02-15', description: 'Product A sales' },
        { amount: 4000, date: '2025-03-15', description: 'Product A sales' }
      ],
      costs: [
        { amount: 8000, date: '2025-01-10', description: 'Office rent' },
        { amount: 8000, date: '2025-02-10', description: 'Office rent' },
        { amount: 8000, date: '2025-03-10', description: 'Office rent' },
        { amount: 5000, date: '2025-01-20', description: 'Salaries' },
        { amount: 5500, date: '2025-02-20', description: 'Salaries' },
        { amount: 6000, date: '2025-03-20', description: 'Salaries' }
      ],
      dates: ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01']
    },
    output: {
      headlines: [
        {
          headline: "Revenue in free-fall: 20% decline while costs surge 10%",
          action: "Conduct emergency pricing review and implement 15% increase on Product A",
          impact: 750,
          confidence: 0.9
        },
        {
          headline: "Office space bleeding you dry: 40% of total expenses for empty desks",
          action: "Downsize office space immediately or negotiate 30% rent reduction",
          impact: 2400,
          confidence: 0.85
        },
        {
          headline: "Payroll exploding while revenue shrinks: 20% staff cost increase in Q1",
          action: "Freeze hiring and restructure team to eliminate redundancies",
          impact: 1000,
          confidence: 0.8
        },
        {
          headline: "No diversification: 100% revenue from single product line",
          action: "Fast-track launch of secondary revenue stream within 90 days",
          impact: "35%",
          confidence: 0.7
        },
        {
          headline: "Current trajectory: Cash zero in 58 days",
          action: "Cut all non-essential expenses for 90 days, including office perks and travel",
          impact: 1500,
          confidence: 0.95
        }
      ]
    }
  }
];

/**
 * Generate the LLM prompt with financial data
 */
export function generatePrompt(analysisResult: AnalysisResult) {
  return {
    model: process.env.OPENAI_MODEL || "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemPromptTemplate
      },
      {
        role: "user",
        content: JSON.stringify({
          // Handle potential undefined properties properly with type checking
          revenues: ('revenues' in analysisResult) ? analysisResult.revenues : [],
          costs: ('costs' in analysisResult) ? analysisResult.costs : [],
          dates: ('dates' in analysisResult) ? analysisResult.dates : [],
          totalRevenue: analysisResult.totalRevenue,
          totalCosts: analysisResult.totalCosts,
          burnRate: analysisResult.burnRate,
          runway: analysisResult.runway
        })
      }
    ],
    functions: [brutalhHeadlinesSchema],
    function_call: { name: "generateBrutalHeadlines" }
  };
}

/**
 * Call the OpenAI API to generate brutal headlines
 */
export async function generateBrutalHeadlines(analysisResult: AnalysisResult & Partial<ExtractedData>) {
  // Check for OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY || '';
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }
  
  try {
    const promptPayload = generatePrompt(analysisResult);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(promptPayload)
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    // Parse the function call response
    if (data.choices[0]?.message?.function_call) {
      const functionCall = data.choices[0].message.function_call;
      const functionArgs = JSON.parse(functionCall.arguments);
      return functionArgs.headlines;
    }
    
    throw new Error('Failed to generate headlines from OpenAI');
  } catch (error) {
    console.error('Error generating brutal headlines:', error);
    // Fallback headlines in case of API failure
    return generateFallbackHeadlines(analysisResult);
  }
}

/**
 * Generate fallback headlines when the API call fails
 */
function generateFallbackHeadlines(analysisResult: AnalysisResult) {
  // Generate some basic headlines based on the analysis
  return [
    {
      headline: `Runway critical: Cash zero in ${analysisResult.runway} days`,
      action: "Implement immediate spending freeze on all non-essential expenses",
      impact: analysisResult.totalCosts * 0.15,
      confidence: 0.9
    },
    {
      headline: `Burn rate unsustainable: ${analysisResult.burnRate} per month exceeds revenue`,
      action: "Cut bottom 20% of underperforming cost centers within 7 days",
      impact: analysisResult.burnRate * 0.2,
      confidence: 0.85
    },
    {
      headline: "Revenue growth stalled while expenses continue to climb",
      action: "Revise pricing strategy and implement 10% increase across all services",
      impact: "10%",
      confidence: 0.7
    },
    {
      headline: "No emergency reserves: Operating at 100% cash utilization",
      action: "Secure bridge funding or negotiate extended payment terms with vendors",
      impact: analysisResult.burnRate * 0.5,
      confidence: 0.6
    },
    {
      headline: "Cost structure misaligned with revenue model",
      action: "Restructure team to match current revenue capacity, not future projections",
      impact: analysisResult.totalCosts * 0.25,
      confidence: 0.8
    }
  ];
}
