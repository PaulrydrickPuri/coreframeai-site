/**
 * Doom-Diag Report
 * Assembles financial data, analysis, forecast, and headlines into a report
 */

import type { AnalysisResult } from './analyzer';
import type { ForecastResult } from './forecast';

export interface BrutalHeadline {
  headline: string;
  action: string;
  impact: number | string;
  confidence: number;
  completed?: boolean;
}

export interface DoomReport {
  id: string;
  createdAt: string;
  fileName: string;
  fileType: string;
  financialSummary: {
    totalRevenue: number;
    totalCosts: number;
    burnRate: number;
    runway: number;
  };
  doomClock: {
    daysRemaining: number;
    confidenceScore: number;
    projections: {
      optimistic: number;
      realistic: number;
      pessimistic: number;
    };
  };
  brutalHeadlines: BrutalHeadline[];
  status: 'active' | 'archived';
  savedToWorkspace: boolean;
}

/**
 * Assemble the doom report from analysis, forecast, and headlines
 */
export function assembleReport(
  sourceFile: { name: string; type: string },
  analysis: AnalysisResult,
  forecast: ForecastResult,
  headlines: BrutalHeadline[]
): DoomReport {
  const report: DoomReport = {
    id: generateReportId(),
    createdAt: new Date().toISOString(),
    fileName: sourceFile.name,
    fileType: sourceFile.type,
    financialSummary: {
      totalRevenue: analysis.totalRevenue,
      totalCosts: analysis.totalCosts,
      burnRate: analysis.burnRate,
      runway: analysis.runway
    },
    doomClock: {
      daysRemaining: forecast.doomDays,
      confidenceScore: forecast.confidenceScore,
      projections: forecast.scenarioProjections
    },
    brutalHeadlines: headlines.map(headline => ({
      ...headline,
      completed: false
    })).slice(0, 5), // Ensure we only have 5 headlines
    status: 'active',
    savedToWorkspace: false
  };

  return report;
}

/**
 * Generate a unique report ID
 */
function generateReportId(): string {
  return `doom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Mark a headline action as completed and update the doom clock
 */
export function markActionCompleted(
  report: DoomReport,
  headlineIndex: number
): DoomReport {
  if (!report.brutalHeadlines[headlineIndex]) {
    return report;
  }

  // Create a deep copy of the report
  const updatedReport = JSON.parse(JSON.stringify(report)) as DoomReport;
  
  // Mark the action as completed
  updatedReport.brutalHeadlines[headlineIndex].completed = true;
  
  // Recalculate doom clock based on completed actions
  const completedActions = updatedReport.brutalHeadlines.filter(h => h.completed).length;
  const impactMultiplier = 1 + (completedActions * 0.15); // Each completed action extends runway by 15%
  
  updatedReport.doomClock.daysRemaining = Math.ceil(report.doomClock.daysRemaining * impactMultiplier);
  
  // Also update the projections
  updatedReport.doomClock.projections = {
    optimistic: Math.ceil(report.doomClock.projections.optimistic * impactMultiplier),
    realistic: Math.ceil(report.doomClock.projections.realistic * impactMultiplier),
    pessimistic: Math.ceil(report.doomClock.projections.pessimistic * impactMultiplier)
  };
  
  return updatedReport;
}

/**
 * Export the report to PDF
 */
export async function exportReportToPdf(report: DoomReport): Promise<Blob> {
  // This would typically use a PDF generation library
  // For MVP, creating a simple structure that could be rendered to PDF
  
  // Implementation placeholder - would typically use react-pdf or similar
  throw new Error('PDF export not yet implemented');
}

/**
 * Save report to workspace
 */
export async function saveReportToWorkspace(report: DoomReport): Promise<DoomReport> {
  try {
    // This would use Supabase or similar to save the report
    // For MVP, just marking it as saved
    return {
      ...report,
      savedToWorkspace: true
    };
  } catch (error) {
    console.error('Error saving report to workspace:', error);
    throw error;
  }
}
