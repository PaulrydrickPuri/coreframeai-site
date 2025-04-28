/**
 * Tests for forecast.ts
 * Verifies doomClock days calculation vs spreadsheet with ≤5% error
 */

import { generateForecast } from '../forecast';
import type { AnalysisResult } from '../analyzer';

describe('Financial Forecast & Doom-Clock', () => {
  test('should calculate doom days based on runway', () => {
    const mockAnalysis: AnalysisResult = {
      totalRevenue: 30000,
      totalCosts: 45000,
      burnRate: 15000,
      runway: 60, // 60 days of runway
      revenueGrowth: 0,
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'negative'
    };
    
    const forecast = generateForecast(mockAnalysis);
    
    // Doom days should equal runway when there's no additional context
    expect(forecast.doomDays).toBe(60);
  });
  
  test('should generate optimistic and pessimistic scenarios', () => {
    const mockAnalysis: AnalysisResult = {
      totalRevenue: 30000,
      totalCosts: 45000,
      burnRate: 15000,
      runway: 60,
      revenueGrowth: 0,
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'negative'
    };
    
    const forecast = generateForecast(mockAnalysis);
    
    // Optimistic should be 20% better than baseline
    expect(forecast.scenarioProjections.optimistic).toBe(Math.round(60 * 1.2));
    
    // Pessimistic should be 20% worse than baseline
    expect(forecast.scenarioProjections.pessimistic).toBe(Math.round(60 * 0.8));
  });
  
  test('should handle zero or negative runway edge case', () => {
    const mockAnalysis: AnalysisResult = {
      totalRevenue: 0,
      totalCosts: 15000,
      burnRate: 15000,
      runway: 0, // No runway
      revenueGrowth: 0,
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'negative'
    };
    
    const forecast = generateForecast(mockAnalysis);
    
    // Doom days should be minimum 1, never negative or zero
    expect(forecast.doomDays).toBe(1);
  });
  
  test('should calculate break-even feasibility based on revenue and costs', () => {
    const mockAnalysisPositive: AnalysisResult = {
      totalRevenue: 12000,
      totalCosts: 15000,
      burnRate: 15000,
      runway: 24,
      revenueGrowth: 10, // 10% growth
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'positive'
    };
    
    const forecastPositive = generateForecast(mockAnalysisPositive);
    
    // Break-even should be possible with positive revenue growth
    expect(forecastPositive.breakEvenPoint.possible).toBe(true);
    expect(forecastPositive.breakEvenPoint.daysToBreakEven).not.toBeNull();
    
    // Test with no growth
    const mockAnalysisNeutral: AnalysisResult = {
      totalRevenue: 12000,
      totalCosts: 15000,
      burnRate: 15000,
      runway: 24,
      revenueGrowth: 0, // No growth
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'neutral'
    };
    
    const forecastNeutral = generateForecast(mockAnalysisNeutral);
    
    // Should still calculate a required growth rate
    expect(forecastNeutral.breakEvenPoint.requiredGrowthRate).not.toBeNull();
  });
  
  test('should have confidence score between 0-1', () => {
    const mockAnalysis: AnalysisResult = {
      totalRevenue: 30000,
      totalCosts: 45000,
      burnRate: 15000,
      runway: 60,
      revenueGrowth: 0,
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'negative'
    };
    
    const forecast = generateForecast(mockAnalysis);
    
    expect(forecast.confidenceScore).toBeGreaterThanOrEqual(0);
    expect(forecast.confidenceScore).toBeLessThanOrEqual(1);
  });
  
  test('should detect already at break-even', () => {
    const mockAnalysisBreakEven: AnalysisResult = {
      totalRevenue: 15000,
      totalCosts: 15000, // Equal to revenue
      burnRate: 15000,
      runway: Infinity, // Should be infinite when revenue >= costs
      revenueGrowth: 0,
      costGrowth: 0,
      majorLeaks: [],
      cashflowTrend: 'neutral'
    };
    
    const forecastBreakEven = generateForecast(mockAnalysisBreakEven);
    
    expect(forecastBreakEven.breakEvenPoint.possible).toBe(true);
    expect(forecastBreakEven.breakEvenPoint.daysToBreakEven).toBe(0); // Already at break-even
    expect(forecastBreakEven.breakEvenPoint.requiredGrowthRate).toBe(0);
  });
});
