/**
 * Doom-Diag Analyzer
 * Analyze financial data for revenue/cost deltas and identify issues
 */

interface FinancialData {
  revenues: Array<{amount: number; date: string; description: string}>;
  costs: Array<{amount: number; date: string; description: string}>;
  dates: string[];
}

export interface AnalysisResult {
  totalRevenue: number;
  totalCosts: number;
  burnRate: number;
  runway: number; // in days
  revenueGrowth: number; // percentage
  costGrowth: number; // percentage
  majorLeaks: Array<{
    category: string;
    amount: number;
    percentage: number; // of total costs
    trend: 'increasing' | 'decreasing' | 'stable';
  }>;
  cashflowTrend: 'positive' | 'negative' | 'neutral';
}

/**
 * Analyze financial data to identify key metrics and issues
 */
export async function analyzeFinancialData(data: FinancialData): Promise<AnalysisResult> {
  // Calculate basic metrics
  const totalRevenue = calculateTotalRevenue(data.revenues);
  const totalCosts = calculateTotalCosts(data.costs);
  const burnRate = calculateBurnRate(data.costs);
  const runway = calculateRunway(totalRevenue, burnRate);
  
  // Calculate growth rates
  const revenueGrowth = calculateGrowthRate(data.revenues);
  const costGrowth = calculateGrowthRate(data.costs);
  
  // Identify major cost leaks
  const majorLeaks = identifyMajorCostLeaks(data.costs);
  
  // Determine overall cashflow trend
  const cashflowTrend = determineCashflowTrend(revenueGrowth, costGrowth);
  
  return {
    totalRevenue,
    totalCosts,
    burnRate,
    runway,
    revenueGrowth,
    costGrowth,
    majorLeaks,
    cashflowTrend
  };
}

/**
 * Calculate total revenue from all revenue entries
 */
function calculateTotalRevenue(revenues: Array<{amount: number}>): number {
  return revenues.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * Calculate total costs from all cost entries
 */
function calculateTotalCosts(costs: Array<{amount: number}>): number {
  return costs.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * Calculate monthly burn rate from cost data
 */
function calculateBurnRate(costs: Array<{amount: number; date: string}>): number {
  // Group costs by month and calculate average monthly burn
  // Simplified implementation for MVP
  return calculateTotalCosts(costs) / 3; // Assuming 3 months of data
}

/**
 * Calculate runway in days based on current burn rate and revenue
 */
function calculateRunway(totalRevenue: number, burnRate: number): number {
  if (burnRate <= 0) return Infinity;
  return Math.floor((totalRevenue / burnRate) * 30); // Convert months to days
}

/**
 * Calculate growth rate as a percentage
 */
function calculateGrowthRate(items: Array<{amount: number; date: string}>): number {
  // Simplified growth calculation for MVP
  // In a real implementation, would group by time periods and calculate period-over-period growth
  return 0; // Placeholder
}

/**
 * Identify major cost leaks by category
 */
function identifyMajorCostLeaks(costs: Array<{amount: number; description: string}>): Array<{
  category: string;
  amount: number;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}> {
  // Group costs by category and identify the highest ones
  // For MVP, use a simple categorization based on description keywords
  
  // Placeholder implementation
  return [{
    category: 'Unknown',
    amount: calculateTotalCosts(costs),
    percentage: 100,
    trend: 'stable' as const
  }];
}

/**
 * Determine overall cashflow trend
 */
function determineCashflowTrend(revenueGrowth: number, costGrowth: number): 'positive' | 'negative' | 'neutral' {
  if (revenueGrowth > costGrowth) return 'positive';
  if (revenueGrowth < costGrowth) return 'negative';
  return 'neutral';
}
