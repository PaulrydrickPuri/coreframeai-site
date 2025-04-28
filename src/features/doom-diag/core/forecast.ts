/**
 * Doom-Diag Forecast
 * Doom-Clock model to forecast days to cash-breakeven failure
 */

import type { AnalysisResult } from './analyzer';

export interface ForecastResult {
  doomDays: number; // Days until cash runs out (the "Doom Clock")
  confidenceScore: number; // 0-1 scale
  scenarioProjections: {
    optimistic: number; // Best case scenario (days)
    realistic: number; // Most likely scenario (days)
    pessimistic: number; // Worst case scenario (days)
  };
  breakEvenPoint: {
    possible: boolean;
    daysToBreakEven: number | null;
    requiredGrowthRate: number | null;
  };
}

/**
 * Generate a forecast based on financial analysis
 * Implements the Doom-Clock model to predict days to failure
 */
export function generateForecast(analysis: AnalysisResult): ForecastResult {
  // Calculate the base case - days until cash runs out
  const doomDays = calculateDoomDays(analysis);
  
  // Generate scenario projections
  const scenarioProjections = generateScenarioProjections(analysis, doomDays);
  
  // Analyze break-even feasibility
  const breakEvenPoint = analyzeBreakEvenPotential(analysis);
  
  // Calculate confidence score based on data quality and trends
  const confidenceScore = calculateConfidenceScore(analysis);
  
  return {
    doomDays,
    confidenceScore,
    scenarioProjections,
    breakEvenPoint
  };
}

/**
 * Calculate days until cash runs out based on current burn rate
 */
function calculateDoomDays(analysis: AnalysisResult): number {
  const { totalRevenue, burnRate } = analysis;
  
  // Simple calculation: How many days until we run out of money
  // Formula: (Current Cash ÷ Daily Burn Rate)
  // For MVP, using a simplified model based on runway
  
  return Math.max(1, analysis.runway); // Minimum 1 day (no negative days)
}

/**
 * Generate optimistic, realistic, and pessimistic projections
 */
function generateScenarioProjections(analysis: AnalysisResult, baseDoomDays: number): {
  optimistic: number;
  realistic: number;
  pessimistic: number;
} {
  // Optimistic: Assume 20% better than baseline
  const optimistic = Math.round(baseDoomDays * 1.2);
  
  // Realistic: Baseline calculation
  const realistic = baseDoomDays;
  
  // Pessimistic: Assume 20% worse than baseline
  const pessimistic = Math.round(baseDoomDays * 0.8);
  
  return {
    optimistic,
    realistic,
    pessimistic
  };
}

/**
 * Analyze if and when the company could reach break-even
 */
function analyzeBreakEvenPotential(analysis: AnalysisResult): {
  possible: boolean;
  daysToBreakEven: number | null;
  requiredGrowthRate: number | null;
} {
  const { totalRevenue, totalCosts, revenueGrowth } = analysis;
  
  // If revenue already exceeds costs, we're at break-even
  if (totalRevenue >= totalCosts) {
    return {
      possible: true,
      daysToBreakEven: 0,
      requiredGrowthRate: 0
    };
  }
  
  // If revenue growth is positive, calculate time to break-even
  if (revenueGrowth > 0) {
    // Simple calculation of days to break-even based on growth rate
    // Formula: ln(costs/revenue) ÷ ln(1 + daily growth rate)
    // For MVP using a simplified estimation
    const daysEstimate = Math.round((totalCosts - totalRevenue) / (totalRevenue * (revenueGrowth / 100) / 30));
    
    return {
      possible: true,
      daysToBreakEven: Math.max(1, daysEstimate),
      requiredGrowthRate: revenueGrowth
    };
  }
  
  // If no growth or negative growth, calculate required growth rate
  const requiredMonthlyGrowthRate = ((totalCosts - totalRevenue) / totalRevenue) * 100;
  
  return {
    possible: requiredMonthlyGrowthRate < 50, // Arbitrary threshold for "possible"
    daysToBreakEven: null,
    requiredGrowthRate: requiredMonthlyGrowthRate
  };
}

/**
 * Calculate confidence score (0-1) based on data quality and consistency
 */
function calculateConfidenceScore(analysis: AnalysisResult): number {
  // Placeholder implementation
  // In a real system, would consider factors like:
  // - Data completeness
  // - Consistency of burn rate
  // - Revenue predictability
  // - Historical accuracy of projections
  
  return 0.75; // Default confidence for MVP
}
