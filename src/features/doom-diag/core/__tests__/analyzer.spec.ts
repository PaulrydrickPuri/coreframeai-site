/**
 * Tests for analyzer.ts
 * Verifies financial data analysis functionality
 */

import { analyzeFinancialData } from '../analyzer';

// Add Jest types for testing
import { expect, describe, test } from '@jest/globals';

describe('Financial Data Analyzer', () => {
  test('should correctly calculate totals and burn rate', async () => {
    const mockFinancialData = {
      revenues: [
        { amount: 10000, date: '2025-01-01', description: 'Product A' },
        { amount: 12000, date: '2025-02-01', description: 'Product A' },
        { amount: 11000, date: '2025-03-01', description: 'Product A' }
      ],
      costs: [
        { amount: 8000, date: '2025-01-01', description: 'Office Rent' },
        { amount: 8000, date: '2025-02-01', description: 'Office Rent' },
        { amount: 8000, date: '2025-03-01', description: 'Office Rent' },
        { amount: 5000, date: '2025-01-01', description: 'Salaries' },
        { amount: 5000, date: '2025-02-01', description: 'Salaries' },
        { amount: 5000, date: '2025-03-01', description: 'Salaries' }
      ],
      dates: ['2025-01-01', '2025-02-01', '2025-03-01']
    };
    
    const result = await analyzeFinancialData(mockFinancialData);
    
    expect(result.totalRevenue).toBe(33000);
    expect(result.totalCosts).toBe(39000);
    expect(result.burnRate).toBe(13000); // 39000 / 3 months
  });
  
  test('should identify cost leaks and calculate runway', async () => {
    const mockFinancialData = {
      revenues: [
        { amount: 30000, date: '2025-01-01', description: 'Product A' }
      ],
      costs: [
        { amount: 8000, date: '2025-01-01', description: 'Office Rent' },
        { amount: 15000, date: '2025-01-01', description: 'Salaries' },
        { amount: 6000, date: '2025-01-01', description: 'Marketing & Software' }
      ],
      dates: ['2025-01-01']
    };
    
    const result = await analyzeFinancialData(mockFinancialData);
    
    // Verify major leaks are identified
    expect(result.majorLeaks.length).toBeGreaterThan(0);
    
    // Verify runway calculation
    // With 30000 revenue and 29000 costs
    const expectedRunway = Math.floor((30000 / 29000) * 30); // Convert to days
    expect(result.runway).toBe(expectedRunway);
  });
  
  test('should determine cashflow trend based on revenue and costs', async () => {
    // Test negative cashflow
    const negativeFlowData = {
      revenues: [{ amount: 10000, date: '2025-01-01', description: 'Product A' }],
      costs: [{ amount: 15000, date: '2025-01-01', description: 'Total Costs' }],
      dates: ['2025-01-01']
    };
    
    const negativeResult = await analyzeFinancialData(negativeFlowData);
    expect(negativeResult.cashflowTrend).toBe('negative');
    
    // Test neutral cashflow (current implementation with 0 growth rates)
    const neutralFlowData = {
      revenues: [{ amount: 20000, date: '2025-01-01', description: 'Product A' }],
      costs: [{ amount: 15000, date: '2025-01-01', description: 'Total Costs' }],
      dates: ['2025-01-01']
    };
    
    const neutralResult = await analyzeFinancialData(neutralFlowData);
    expect(neutralResult.cashflowTrend).toBe('neutral');
  });
});
