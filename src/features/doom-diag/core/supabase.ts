/**
 * Doom-Diag Supabase Integration
 * Handles database operations for reports
 */

import { supabase } from '@/lib/supabaseClient';
import type { DoomReport } from './report';

// Table name in Supabase
const REPORTS_TABLE = 'doom_diag_reports';

/**
 * Save a report to Supabase
 */
export async function saveReport(report: DoomReport): Promise<DoomReport> {
  try {
    // Check if report already exists
    const { data: existingReport } = await supabase
      .from(REPORTS_TABLE)
      .select('id')
      .eq('id', report.id)
      .single();
    
    if (existingReport) {
      // Update existing report
      const { error } = await supabase
        .from(REPORTS_TABLE)
        .update({
          financial_summary: report.financialSummary,
          doom_clock: report.doomClock,
          brutal_headlines: report.brutalHeadlines,
          status: report.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', report.id);
      
      if (error) throw error;
    } else {
      // Insert new report
      const { error } = await supabase
        .from(REPORTS_TABLE)
        .insert({
          id: report.id,
          created_at: report.createdAt,
          file_name: report.fileName,
          file_type: report.fileType,
          financial_summary: report.financialSummary,
          doom_clock: report.doomClock,
          brutal_headlines: report.brutalHeadlines,
          status: report.status,
          created_at_timestamp: new Date().toISOString()
        });
      
      if (error) throw error;
    }
    
    return {
      ...report,
      savedToWorkspace: true
    };
  } catch (error) {
    console.error('Error saving report to Supabase:', error);
    throw error;
  }
}

/**
 * Get all saved reports
 */
export async function getReports(): Promise<DoomReport[]> {
  try {
    const { data, error } = await supabase
      .from(REPORTS_TABLE)
      .select('*')
      .order('created_at_timestamp', { ascending: false });
    
    if (error) throw error;
    
    return (data || []).map(item => ({
      id: item.id,
      createdAt: item.created_at,
      fileName: item.file_name,
      fileType: item.file_type,
      financialSummary: item.financial_summary,
      doomClock: item.doom_clock,
      brutalHeadlines: item.brutal_headlines,
      status: item.status,
      savedToWorkspace: true
    }));
  } catch (error) {
    console.error('Error getting reports from Supabase:', error);
    return [];
  }
}

/**
 * Get a specific report by ID
 */
export async function getReportById(id: string): Promise<DoomReport | null> {
  try {
    const { data, error } = await supabase
      .from(REPORTS_TABLE)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      id: data.id,
      createdAt: data.created_at,
      fileName: data.file_name,
      fileType: data.file_type,
      financialSummary: data.financial_summary,
      doomClock: data.doom_clock,
      brutalHeadlines: data.brutal_headlines,
      status: data.status,
      savedToWorkspace: true
    };
  } catch (error) {
    console.error('Error getting report from Supabase:', error);
    return null;
  }
}
