/**
 * Tests for forecast.ts
 * Verifies doomClock days calculation and scenarios
 */

import { generateForecast } from '../forecast';
import type { AnalysisResult } from '../analyzer';

// Add Jest types for testing
import { expect, describe, test } from '@jest/globals';

describe('Financial Forecast & Doom-Clock', () => {
  // Create a reusable mock analysis fixture
  const createMockAnalysis = (overrides = {}): AnalysisResult => ({
    totalRevenue: 30000,
    totalCosts: 45000,
    burnRate: 15000,
    runway: 60,
    revenueGrowth: 0,
    costGrowth: 0,
    majorLeaks: [],
    cashflowTrend: 'negative',
    ...overrides
  });

  test('should calculate doom days and generate scenarios', () => {
    const mockAnalysis = createMockAnalysis();
    const forecast = generateForecast(mockAnalysis);
    
    // Base doom days should equal runway when there's no additional context
    expect(forecast.doomDays).toBe(60);
    
    // Verify scenario projections
    expect(forecast.scenarioProjections.optimistic).toBe(Math.round(60 * 1.2)); // 20% better
    expect(forecast.scenarioProjections.pessimistic).toBe(Math.round(60 * 0.8)); // 20% worse
    
    // Verify confidence score is between 0-1
    expect(forecast.confidenceScore).toBeGreaterThanOrEqual(0);
    expect(forecast.confidenceScore).toBeLessThanOrEqual(1);
  });
  
  test('should handle edge cases', () => {
    // Zero runway case
    const zeroRunwayAnalysis = createMockAnalysis({ totalRevenue: 0, runway: 0 });
    const zeroRunwayForecast = generateForecast(zeroRunwayAnalysis);
    
    // Doom days should be minimum 1, never negative or zero
    expect(zeroRunwayForecast.doomDays).toBe(1);
    
    // Break-even case
    const breakEvenAnalysis = createMockAnalysis({
      totalRevenue: 15000,
      totalCosts: 15000,
      runway: Infinity,
      cashflowTrend: 'neutral'
    });
    
    const breakEvenForecast = generateForecast(breakEvenAnalysis);
    expect(breakEvenForecast.breakEvenPoint.possible).toBe(true);
    expect(breakEvenForecast.breakEvenPoint.daysToBreakEven).toBe(0);
  });
  
  test('should calculate break-even feasibility', () => {
    // Positive growth case - should be able to break even
    const positiveGrowthAnalysis = createMockAnalysis({
      totalRevenue: 12000,
      totalCosts: 15000,
      revenueGrowth: 10,
      runway: 24,
      cashflowTrend: 'positive'
    });
    
    const positiveGrowthForecast = generateForecast(positiveGrowthAnalysis);
    expect(positiveGrowthForecast.breakEvenPoint.possible).toBe(true);
    expect(positiveGrowthForecast.breakEvenPoint.daysToBreakEven).not.toBeNull();
    
    // No growth case - should still calculate required growth
    const noGrowthAnalysis = createMockAnalysis({
      totalRevenue: 12000,
      totalCosts: 15000,
      revenueGrowth: 0,
      runway: 24,
      cashflowTrend: 'neutral'
    });
    
    const noGrowthForecast = generateForecast(noGrowthAnalysis);
    expect(noGrowthForecast.breakEvenPoint.requiredGrowthRate).not.toBeNull();
  });
});
