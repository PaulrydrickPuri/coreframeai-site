/**
 * Doom-Diag Reports Hooks
 * React hooks for accessing Doom-Diag reports
 */

import { useState, useEffect, useCallback } from 'react';
import { DoomReport } from '../core/report';
import { getReports, getReportById, saveReport } from '../core/supabase';

/**
 * Hook to access saved Doom-Diag reports
 */
export function useReports() {
  const [reports, setReports] = useState<DoomReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all reports
  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save a report
  const saveReportToWorkspace = useCallback(async (report: DoomReport) => {
    setIsLoading(true);
    setError(null);
    try {
      const savedReport = await saveReport(report);
      setReports(prev => {
        const exists = prev.some(r => r.id === savedReport.id);
        if (exists) {
          return prev.map(r => r.id === savedReport.id ? savedReport : r);
        } else {
          return [savedReport, ...prev];
        }
      });
      return savedReport;
    } catch (err) {
      console.error('Error saving report:', err);
      setError('Failed to save report');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch a single report by ID
  const fetchReportById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const report = await getReportById(id);
      return report;
    } catch (err) {
      console.error(`Error fetching report ${id}:`, err);
      setError('Failed to load report');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load reports on initial mount
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
    isLoading,
    error,
    fetchReports,
    saveReportToWorkspace,
    fetchReportById
  };
}
