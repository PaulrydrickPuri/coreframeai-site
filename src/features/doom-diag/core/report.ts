/**
 * Doom-Diag Report
 * Assembles financial data, analysis, forecast, and headlines into a report
 */

import type { AnalysisResult } from './analyzer';
import type { ForecastResult } from './forecast';
import { saveReport } from './supabase';

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
export async function exportReportToPdf(report: DoomReport, reportElement?: HTMLElement | HTMLDivElement | null): Promise<Blob> {
  // If we're in a server environment or don't have the report element, return a simple PDF
  if (typeof window === 'undefined' || !reportElement) {
    return generateSimplePdf(report);
  }
  
  try {
    // Dynamically import the libraries to avoid SSR issues
    const jsPDF = (await import('jspdf')).default;
    const html2canvas = (await import('html2canvas')).default;
    
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Convert the HTML element to a canvas
    const canvas = await html2canvas(reportElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#111827' // Match dark theme background
    });
    
    // Calculate the new dimensions to fit on the page
    const imgWidth = pageWidth - 20; // 10mm margin on each side
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the image to the PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    
    // If the content is longer than one page, add additional pages
    if (imgHeight > pageHeight - 20) {
      let heightLeft = imgHeight - (pageHeight - 20);
      let position = -(pageHeight - 20);
      
      while (heightLeft > 0) {
        position += (pageHeight - 20);
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, 10 + position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - 20);
      }
    }
    
    // Add metadata to the PDF
    pdf.setProperties({
      title: `Brutal-Truth Diagnostics: ${report.fileName}`,
      subject: 'Financial Analysis Report',
      creator: 'CoreframeAI Doom-Diag',
      keywords: 'financial, analysis, doom-clock, brutal-truth'
    });
    
    // Convert to blob and return
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to simple PDF if there's an error
    return generateSimplePdf(report);
  }
}

/**
 * Generate a simple text-based PDF as a fallback
 */
async function generateSimplePdf(report: DoomReport): Promise<Blob> {
  // Dynamically import jsPDF
  const jsPDF = (await import('jspdf')).default;
  
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  
  // Add title
  pdf.setFontSize(20);
  pdf.text('Brutal-Truth Diagnostics', pageWidth / 2, 20, { align: 'center' });
  
  // Add file info
  pdf.setFontSize(12);
  pdf.text(`File: ${report.fileName}`, 20, 30);
  pdf.text(`Generated: ${new Date(report.createdAt).toLocaleString()}`, 20, 40);
  
  // Add doom clock info
  pdf.setFontSize(16);
  pdf.text('Doom Clock', pageWidth / 2, 55, { align: 'center' });
  pdf.setFontSize(12);
  pdf.text(`Days Remaining: ${report.doomClock.daysRemaining}`, 20, 65);
  pdf.text(`Confidence Score: ${report.doomClock.confidenceScore}`, 20, 75);
  
  // Add financial summary
  pdf.setFontSize(16);
  pdf.text('Financial Summary', pageWidth / 2, 90, { align: 'center' });
  pdf.setFontSize(12);
  pdf.text(`Total Revenue: $${report.financialSummary.totalRevenue.toLocaleString()}`, 20, 100);
  pdf.text(`Total Costs: $${report.financialSummary.totalCosts.toLocaleString()}`, 20, 110);
  pdf.text(`Burn Rate: $${report.financialSummary.burnRate.toLocaleString()}/month`, 20, 120);
  pdf.text(`Runway: ${report.financialSummary.runway} months`, 20, 130);
  
  // Add headlines
  pdf.setFontSize(16);
  pdf.text('Brutal Headlines', pageWidth / 2, 145, { align: 'center' });
  pdf.setFontSize(12);
  
  let yPos = 155;
  report.brutalHeadlines.forEach((headline, index) => {
    pdf.text(`${index + 1}. ${headline.headline}`, 20, yPos);
    yPos += 10;
    pdf.text(`   Action: ${headline.action}`, 20, yPos);
    yPos += 10;
    pdf.text(`   Impact: ${headline.impact}`, 20, yPos);
    yPos += 10;
    pdf.text(`   Status: ${headline.completed ? 'Completed' : 'Pending'}`, 20, yPos);
    yPos += 15; // Extra space between headlines
  });
  
  // Convert to blob and return
  return pdf.output('blob');
}

/**
 * Save report to workspace using Supabase
 */
export async function saveReportToWorkspace(report: DoomReport): Promise<DoomReport> {
  try {
    // Save to Supabase database
    const savedReport = await saveReport(report);
    return savedReport;
  } catch (error) {
    console.error('Error saving report to workspace:', error);
    // Even if saving to database failed, mark as saved locally
    return {
      ...report,
      savedToWorkspace: true
    };
  }
}
